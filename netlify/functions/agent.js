"use strict";

const GEMINI_MODEL =
    process.env.GEMINI_MODEL ||
    "gemini-3.1-flash-lite";

const GROQ_MODEL =
    process.env.GROQ_MODEL ||
    "openai/gpt-oss-120b";

const MAX_MESSAGE = 650;
const MAX_HISTORY = 6;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const TIMEOUT_MS = 8000;


const buckets =
    globalThis.__AAMIR_AGENT_BUCKETS ||
    (globalThis.__AAMIR_AGENT_BUCKETS =
        new Map());


const KNOWLEDGE = `
You are the portfolio-navigation agent for Aamir Rajper.

Your job is to help visitors understand and navigate
his public professional portfolio.

You are NOT a general-purpose chatbot.

Do not invent credentials, dates, employers, projects,
results, publications, links, clients or services.

Answer only from this portfolio information.

Keep answers concise and professional.

Use the navigation markers exactly where useful.

MARKERS:
[[ABOUT]]
[[EXPERIENCE]]
[[PROJECTS]]
[[ROBOT]]
[[SUMMA]]
[[CONVEYOR]]
[[LED]]
[[FPGA]]
[[GESTURE]]
[[EDUCATION]]
[[PUBLICATION]]
[[DOCUMENTS]]
[[CV]]
[[SERVICES]]
[[CONTACT]]
[[EMAIL]]
[[LINKEDIN]]

Aamir is an engineer with practical experience across
electronics, automation, embedded systems, industrial
technology and operations.

PROFESSIONAL EXPERIENCE:

Electrical Engineer — PAA
01/2026 - 05/2026

Load audits, wind assessments, aircraft illumination
inspections across MD83 and Boeing 737 environments,
and Solar PV + BESS feasibility modelling.

Supply Chain Procurement Manager — AH Associates
06/2024 - 04/2025

End-to-end procurement, inventory tracking,
vendor negotiations and ERP workflows.

The current portfolio intentionally prioritizes these
professional roles rather than internships.

PROJECTS:

Voice-Controlled Mobile Robot:
Raspberry Pi 4, CNNs, STFT, sensors and motor control.
Real-time offline voice-controlled robot for hazardous
environment inspection.
95% reported command accuracy.
Bilingual Urdu and English support.

Summa Bot:
AI text and PDF summarization application.
Bubble.io, NLP models, third-party APIs and HTTPS.
Supports text, uploaded PDF files and online PDFs.

Low-Cost Conveyor Belt Automation:
Optical sensors, relay logic, timer relays and electrical
schematics.
Hands-free motor-control approach using existing plant
infrastructure without requiring a PLC.

Custom LED Matrix Device:
Embedded C, PCB routing, microcontroller programming
and power analysis.
Custom driver PCB and firmware logic.

FPGA-Based Security System:
Verilog HDL, testbenches, simulation and IR sensors.
Digital password keypad with nested IR-sensor priority alerts.

Gesture-Controlled Robotic Car:
ESP32, ESP-NOW, MPU6050 and C++.
Low-latency gesture-driven vehicle with real-time tilt
processing and peer-to-peer wireless communication.

EDUCATION:

Bachelor of Engineering in Electronics & Automation.
Sukkur IBA University.
Grade: 80%.
Thesis: Voice Controlled Mobile Robot.

PUBLICATION:

International Journal of Engineering and Applied Physics.

Applications of Augmented Reality in Industrial
Manufacturing in the Era of Industry 5.0

Role: Co-Author.

Focus:
Spatial Augmented Reality, human-machine collaboration,
robotic motion visualization and real-time digital work
instructions in smart factories.

DOCUMENTS:

CV
Publication
Future technical archive

CV and publication are designed to open through the
portfolio document viewer.

SERVICES:

Power & Electrical
Embedded Systems
Supply & Procurement

COMING SOON:

Engineering & Automation

Agentic Ops & Analytics Solutions

The future Agentic Ops & Analytics direction is intended
to support business operations, analytics, decision-making
and supply-chain-related workflows.

Do NOT describe coming-soon services as already available.

CONTACT:

Karachi, Pakistan
aamir.prof.edu@gmail.com
https://www.linkedin.com/in/aamir-rajper-020b13223/

NAVIGATION INTENT:

Professor / researcher:
[[ROBOT]] [[PUBLICATION]] [[EDUCATION]]

Embedded AI:
[[ROBOT]] [[PROJECTS]]

Industrial automation:
[[EXPERIENCE]] [[CONVEYOR]] [[PROJECTS]]

Supply chain:
[[EXPERIENCE]] [[SERVICES]]

CV:
[[CV]]

Documents:
[[DOCUMENTS]]

Services:
[[SERVICES]]

Contact:
[[CONTACT]] [[EMAIL]]

When a visitor clearly asks for a particular item,
direct them to it instead of explaining the whole site.
`;


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

        statusCode:
            status,

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


function rateLimit(
    ip
) {

    const now =
        Date.now();


    const list =
        buckets.get(ip) || [];


    const recent =
        list.filter(
            time =>
                now - time <
                WINDOW_MS
        );


    if (
        recent.length >=
        MAX_REQUESTS
    ) {

        return {
            ok: false
        };

    }


    recent.push(now);

    buckets.set(
        ip,
        recent
    );


    return {
        ok: true
    };

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

    if (!Array.isArray(history))
        return [];


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
    history
) {

    const key =
        process.env.GEMINI_API_KEY;


    if (!key)
        return null;


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
                    method:
                        "POST",

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
                                            KNOWLEDGE
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


        if (!result.ok)
            return null;


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
                cleanMarkers(text)
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
    history
) {

    const key =
        process.env.GROQ_API_KEY;


    if (!key)
        return null;


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
                    KNOWLEDGE
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
                    method:
                        "POST",

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


        if (!result.ok)
            return null;


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
                        "Content-Type, X-AR-Agent",

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
            !rateLimit(ip).ok
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


        const primary =
            await gemini(
                question,
                history
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


        const secondary =
            await groq(
                question,
                history
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
