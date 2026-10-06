"use strict";

const crypto = require("crypto");

const DEFAULT_SESSION_TTL =
    6 * 60 * 60;

const SESSION_TTL_SECONDS =
    Number(
        process.env.AAMIR_AGENT_SESSION_TTL_SECONDS ||
        DEFAULT_SESSION_TTL
    );

function base64UrlEncode(value) {
    return Buffer
        .from(value)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

function base64UrlDecode(value) {
    const normalized =
        String(value || "")
            .replace(/-/g, "+")
            .replace(/_/g, "/");

    const padded =
        normalized +
        "=".repeat(
            (4 - (normalized.length % 4)) % 4
        );

    return Buffer
        .from(padded, "base64")
        .toString("utf8");
}

function sign(value) {
    return crypto
        .createHmac(
            "sha256",
            process.env.AAMIR_AGENT_SESSION_SECRET || ""
       )
        .update(value)
        .digest("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

function accessDigest(
    accessId,
    accessKey
) {
    return crypto
        .createHash("sha256")
        .update(
            `${accessId}\n${accessKey}`,
            "utf8"
        )
        .digest("hex");
}

function accessDigest(
    accessId,
    accessKey
) {
    return crypto
        .createHash("sha256")
        .update(
            `${accessId}:${accessKey}`,
            "utf8"
        )
        .digest("hex");
}
function safeEqualHex(
    left,
    right
) {
    if (
        typeof left !== "string" ||
        typeof right !== "string" ||
        left.length !== right.length
    ) {
        return false;
    }

    const a = Buffer.from(left, "utf8");
    const b = Buffer.from(right, "utf8");

    return crypto.timingSafeEqual(a, b);
}

function accessRecords() {
    const raw =
        process.env.AAMIR_AGENT_ACCESS_CODES || "";

    if (!raw) {
        return [];
    }

    try {
        const parsed =
            JSON.parse(raw);

        if (!Array.isArray(parsed)) {



            return [];
        }

        return parsed.filter(
            item =>
                item &&
                typeof item.id === "string" &&
                typeof item.secretHash === "string" &&
                typeof item.role === "string"
        );
    } catch {
        return [];
    }
}

function findAccessRecord(
    accessId
) {
    const normalized =
        String(accessId || "")
            .trim();

    return (
        accessRecords()
            .find(
                item =>
                    item.id ===
                    normalized
            ) || null
    );
}

function isExpired(
    record
) {
    if (!record?.expiresAt) {
        return false;
    }

    const time =
        Date.parse(
            record.expiresAt
        );

    if (Number.isNaN(time)) {
        return true;
    }

    return (
        Date.now() >= time
    );
}

function authenticate(
    accessId,
    accessKey
) {
    const id =
        String(accessId || "")
            .trim();

    const key =
        String(accessKey || "");

    if (
        !id ||
        !key ||
        id.length > 100 ||
        key.length > 300
    ) {
        return null;
    }

    const record =
        findAccessRecord(id);

    if (!record || isExpired(record)) {
        return null;
    }

    const suppliedHash =
        accessDigest(
            id,
            key
        );

    if (
        !safeEqualHex(
            suppliedHash,
            record.secretHash
        )
    ) {
        return null;
    }

    const now =
        Math.floor(
            Date.now() / 1000
        );

    const exp =
        now +
        SESSION_TTL_SECONDS;

    const payload =
        base64UrlEncode(
            JSON.stringify({
                sub: record.id,
                role: record.role,
                iat: now,
                exp
            })
        );

    const signature =
        sign(payload);

    return {
        sessionToken:
            `${payload}.${signature}`,

        profile: {
            id: record.id,
            role: record.role,
            expiresAt:
                new Date(
                    exp * 1000
                ).toISOString()
        }
    };
}

function verifySession(
    token
) {
    try {
        const parts =
            String(token || "")
                .split(".");

        if (parts.length !== 2) {
            return null;
        }

        const [
            payloadPart,
            signature
        ] = parts;

        const expected =
            sign(payloadPart);

        if (
            !safeEqualHex(
                Buffer
                    .from(signature)
                    .toString("hex"),
                Buffer
                    .from(expected)
                    .toString("hex")
            )
        ) {
            return null;
        }

        const payload =
            JSON.parse(
                base64UrlDecode(
                    payloadPart
                )
            );

        if (
            !payload ||
            typeof payload.sub !== "string" ||
            typeof payload.role !== "string" ||
            typeof payload.exp !== "number"
        ) {
            return null;
        }

        const now =
            Math.floor(
                Date.now() / 1000
            );

        if (
            now >= payload.exp
        ) {
            return null;
        }

        return {
            id: payload.sub,
            role: payload.role,
            expiresAt:
                new Date(
                    payload.exp * 1000
                ).toISOString()
        };

    } catch {
        return null;
    }
}

function extractBearerToken(
    event
) {
    const authorization =
        String(
            event?.headers?.authorization ||
            event?.headers?.Authorization ||
            ""
        );

    if (
        !authorization
            .toLowerCase()
            .startsWith("bearer ")
    ) {
        return "";
    }

    return authorization
        .slice(7)
        .trim();
}

module.exports = {
    authenticate,
    verifySession,
    extractBearerToken
};
