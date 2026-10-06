"use strict";

const {
    authenticate,
    verifySession,
    extractBearerToken
} = require("../lib/auth");

const {
    getAgentContext
} = require("../lib/agent-context");

const GEMINI_MODEL =
    process.env.GEMINI_MODEL ||
    "gemini-3.1-flash-lite";

const GROQ_MODEL =
    process.env.GROQ_MODEL ||
    "openai/gpt-oss-120b";

const MAX_MESSAGE = 650;
const MAX_HISTORY = 6;

const REQUEST_WINDOW_MS =
    10 * 60 * 1000;

const MAX_QUESTIONS_PER_IP =
    8;

const AUTH_WINDOW_MS =
    15 * 60 * 1000;

const MAX_AUTH_ATTEMPTS_PER_IP =
    10;

const MAX_DAILY_QUESTIONS_PER_ACCESS =
    25;

const TIMEOUT_MS = 8000;

const requestBuckets =
    globalThis.__AAMIR_AGENT_REQUEST_BUCKETS ||
    (globalThis.__AAMIR_AGENT_REQUEST_BUCKETS =
        new Map());

const authBuckets =
    globalThis.__AAMIR_AGENT_AUTH_BUCKETS ||
    (globalThis.__AAMIR_AGENT_AUTH_BUCKETS =
        new Map());

const dailyBuckets =
    globalThis.__AAMIR_AGENT_DAILY_BUCKETS ||
    (globalThis.__AAMIR_AGENT_DAILY_BUCKETS =
        new Map());

const VALID_MARKERS =
    new Set([
        "ABOUT",
        "EXPERIENCE",
        "PROJECTS",
        "ROBOT",
        "SUMMA",
        "CONVEYOR",
        "LED",
        "FPGA",
        "GESTURE",
        "EDUCATION",
        "PUBLICATION",
        "DOCUMENTS",
        "CV",
        "SERVICES",
        "CONTACT",
        "EMAIL",
        "LINKEDIN"
    ]);

function headers(event) {
    return event.headers || {};
}

function header(
    event,
    name
) {
    const target =
        name.toLowerCase();

    for (
        const [
            key,
            value
        ] of Object.entries(
            headers(event)
        )
    ) {
        if (
            key.toLowerCase() ===
            target
        ) {
            return value || "";
        }
    }

    return "";
}

function response(
    status,
    body
) {
    return {
        statusCode: status,

        headers: {
            "Content-Type":
                "application/json; charset=utf-8",

            "Cache-Control":
                "no-store",

            "X-Content-Type-Options":
                "nosniff"
        },

        body:
            JSON.stringify(body)
    };
}

function cleanupBucket(
    bucket,
    windowMs
) {
    const now =
        Date.now();

    return bucket.filter(
        timestamp =>
            now - timestamp <
            windowMs
    );
}

function rateLimit(
    map,
    key,
    maxRequests,
    windowMs
) {
    const current =
        map.get(key) || [];

    const recent =
        cleanupBucket(
            current,
            windowMs
        );

    if (
        recent.length >=
        maxRequests
    ) {
        map.set(
            key,
            recent
        );

        return false;
    }

    recent.push(
        Date.now()
    );

    map.set(
        key,
        recent
    );

    return true;
}

function dailyLimit(
    id
) {
    const day =
        new Date()
            .toISOString()
            .slice(0, 10);

    const key =
        `${id}:${day}`;

    const current =
        dailyBuckets.get(key) || 0;

    if (
        current >=
        MAX_DAILY_QUESTIONS_PER_ACCESS
    ) {
        return false;
    }

    dailyBuckets.set(
        key,
        current + 1
    );

    return true;
}

function cleanMarkers(
    text
) {
    return String(text || "")
        .replace(
            /```/g,
            ""
        )
        .replace(
            /\[\[([A-Z0-9_-]+)\]\]/g,
            (
                whole,
                marker
            ) =>
                VALID_MARKERS.has(marker)
                    ? whole
                    : ""
        )
        .trim();
}

function safeHistory(
    history
) {
    if (!Array.isArray(history)) {
        return [];
    }

    return history
        .slice(-MAX_HISTORY)
        .filter(
            item =>
                item &&
                (
                    item.role === "user" ||
                    item.role === "assistant"
                ) &&
                typeof item.content ===
                    "string"
        )
        .map(
            item => ({
                role:
                    item.role,
                content:
                    item.content.slice(
                        0,
                        500
                    )
            })
        );
}

async function gemini(
    question,
    history,
    systemPrompt
) {
    const key =
        process.env.GEMINI_API_KEY;

    if (!key) {
        return null;
    }

    const controller =
        new AbortController();

    const timeout =
        setTimeout(
            () =>
                controller.abort(),
            TIMEOUT_MS
        );

    try {
        const contents =
            safeHistory(history)
                .map(
                    item => ({
                        role:
                            item.role ===
                            "assistant"
                                ? "model"
                                : "user",

                        parts: [
                            {
                                text:
                                    item.content
                            }
                        ]
                    })
                );

        contents.push({
            role: "user",
            parts: [
                {
                    text:
                        question
                }
            ]
        });

        const endpoint =
            "https://generativelanguage.googleapis.com/v1beta/models/" +
            encodeURIComponent(
                GEMINI_MODEL
            ) +
            ":generateContent";

        const result =
            await fetch(
                endpoint,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "x-goog-api-key":
                            key
                    },

                    body:
                        JSON.stringify({
                            systemInstruction: {
                                parts: [
                                    {
                                        text:
                                            systemPrompt
                                    }
                                ]
                            },

                            contents,

                            generationConfig: {
                                temperature:
                                    0.2,

                                maxOutputTokens:
                                    300
                            }
                        }),

                    signal:
                        controller.signal
                }
            );

        if (!result.ok) {
            return null;
        }

        const data =
            await result.json();

        const text =
            (
                data?.candidates?.[0]
                    ?.content?.parts ||
                []
            )
                .map(
                    part =>
                        part?.text || ""
                )
                .join("");

        return {
            provider:
                "gemini",

            answer:
                cleanMarkers(
                    text
                )
        };

    } catch {
        return null;
    } finally {
        clearTimeout(
            timeout
        );
    }
}

async function groq(
    question,
    history,
    systemPrompt
) {
    const key =
        process.env.GROQ_API_KEY;

    if (!key) {
        return null;
    }

    const controller =
        new AbortController();

    const timeout =
        setTimeout(
            () =>
                controller.abort(),
            TIMEOUT_MS
        );

    try {
        const messages = [
            {
                role:
                    "system",

                content:
                    systemPrompt
            },

            ...safeHistory(
                history
            ),

            {
                role:
                    "user",

                content:
                    question
            }
        ];

        const result =
            await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${key}`
                    },

                    body:
                        JSON.stringify({
                            model:
                                GROQ_MODEL,

                            messages,

                            temperature:
                                0.2,

                            max_completion_tokens:
                                300
                        }),

                    signal:
                        controller.signal
                }
            );

        if (!result.ok) {
            return null;
        }

        const data =
            await result.json();

        return {
            provider:
                "groq",

            answer:
                cleanMarkers(
                    data?.choices?.[0]
                        ?.message?.content ||
                    ""
                )
        };

    } catch {
        return null;
    } finally {
        clearTimeout(
            timeout
        );
    }
}

exports.handler =
    async event => {

        if (
            event.httpMethod ===
            "OPTIONS"
        ) {
            return {
                statusCode: 204,

                headers: {
                    "Access-Control-Allow-Origin":
                        header(
                            event,
                            "origin"
                        ) || "*",

                    "Access-Control-Allow-Methods":
                        "POST, OPTIONS",

                    "Access-Control-Allow-Headers":
                        "Content-Type, X-AR-Agent, Authorization",

                    "Access-Control-Max-Age":
                        "86400"
                },

                body: ""
            };
        }

        if (
            event.httpMethod !==
            "POST"
        ) {
            return response(
                405,
                {
                    ok: false,
                    error:
                        "Method not allowed."
                }
            );
        }

        if (
            header(
                event,
                "x-ar-agent"
            ) !== "1"
        ) {
            return response(
                403,
                {
                    ok: false,
                    error:
                        "Rejected."
                }
            );
        }

        const ip =
            header(
                event,
                "x-nf-client-connection-ip"
            ) ||
            header(
                event,
                "client-ip"
            ) ||
            "unknown";

        if (
            !event.body ||
            event.body.length >
                12000
        ) {
            return response(
                413,
                {
                    ok: false,
                    error:
                        "Request too large."
                }
            );
        }

        let payload;

        try {
            payload =
                JSON.parse(
                    event.body
                );
        } catch {
            return response(
                400,
                {
                    ok: false,
                    error:
                        "Invalid request."
                }
            );
        }

        /*
         * ========================================================
         * AUTHENTICATION
         * ========================================================
         */

        if (
            payload?.action ===
            "authenticate"
        ) {
            if (
                !rateLimit(
                    authBuckets,
                    ip,
                    MAX_AUTH_ATTEMPTS_PER_IP,
                    AUTH_WINDOW_MS
                )
            ) {
                return response(
                    429,
                    {
                        ok: false,
                        error:
                            "Too many access attempts. Please try again later."
                    }
                );
            }

            const accessId =
                typeof payload?.accessId ===
                "string"
                    ? payload.accessId.trim()
                    : "";

            const accessKey =
                typeof payload?.accessKey ===
                "string"
                    ? payload.accessKey
                    : "";

            const result =
                authenticate(
                    accessId,
                    accessKey
                );

            if (!result) {
                return response(
                    401,
                    {
                        ok: false,
                        error:
                            "Invalid access credentials."
                    }
                );
            }

            return response(
                200,
                {
                    ok: true,
                    sessionToken:
                        result.sessionToken,
                    profile:
                        result.profile
                }
            );
        }

        /*
         * ========================================================
         * ALL LLM REQUESTS REQUIRE A VALID SESSION
         * ========================================================
         */

        const token =
            extractBearerToken(
                event
            );

        const session =
            verifySession(
                token
            );

        if (!session) {
            return response(
                401,
                {
                    ok: false,
                    error:
                        "Private agent access is required."
                }
            );
        }

        if (
            !rateLimit(
                requestBuckets,
                ip,
                MAX_QUESTIONS_PER_IP,
                REQUEST_WINDOW_MS
            )
        ) {
            return response(
                429,
                {
                    ok: false,
                    error:
                        "Too many requests. Please try again later."
                }
            );
        }

        if (
            !dailyLimit(
                session.id
            )
        ) {
            return response(
                429,
                {
                    ok: false,
                    error:
                        "This private access has reached its daily question allowance."
                }
            );
        }

        const question =
            typeof payload?.message ===
            "string"
                ? payload.message.trim()
                : "";

        if (
            !question ||
            question.length >
                MAX_MESSAGE
        ) {
            return response(
                400,
                {
                    ok: false,
                    error:
                        `Question must be 1-${MAX_MESSAGE} characters.`
                }
            );
        }

        const history =
            safeHistory(
                payload?.history
            );

        const systemPrompt =
            getAgentContext(
                session.role
            );

        /*
         * Gemini first.
         */
        const primary =
            await gemini(
                question,
                history,
                systemPrompt
            );

        if (
            primary?.answer
        ) {
            return response(
                200,
                {
                    ok: true,
                    provider:
                        primary.provider,
                    answer:
                        primary.answer
                }
            );
        }

        /*
         * Groq fallback.
         */
        const secondary =
            await groq(
                question,
                history,
                systemPrompt
            );

        if (
            secondary?.answer
        ) {
            return response(
                200,
                {
                    ok: true,
                    provider:
                        secondary.provider,
                    answer:
                        secondary.answer
                }
            );
        }

        return response(
            503,
            {
                ok: false,
                error:
                    "Portfolio agent temporarily unavailable."
            }
        );
    };