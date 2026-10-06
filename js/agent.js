(() => {
    "use strict";

    const root =
        document.getElementById(
            "ar-agent"
        );

    if (!root) {
        return;
    }

    const launcher =
        document.getElementById(
            "ar-agent-launcher"
        );

    const panel =
        document.getElementById(
            "ar-agent-panel"
        );

    const closeButton =
        document.getElementById(
            "ar-agent-close"
        );

    const messages =
        document.getElementById(
            "ar-agent-messages"
        );

    const form =
        document.getElementById(
            "ar-agent-form"
        );

    const input =
        document.getElementById(
            "ar-agent-input"
        );

    const sendButton =
        document.getElementById(
            "ar-agent-send"
        );

    const suggestions =
        document.querySelector(
            ".ar-agent-suggestions"
        );

    const accessForm =
        document.getElementById(
            "ar-agent-access-form"
        );

    const accessIdInput =
        document.getElementById(
            "ar-agent-access-id"
        );

    const accessKeyInput =
        document.getElementById(
            "ar-agent-access-key"
        );

    const unlockButton =
        document.getElementById(
            "ar-agent-unlock"
        );

    const accessStatus =
        document.getElementById(
            "ar-agent-access-status"
        );

    const logoutButton =
        document.getElementById(
            "ar-agent-logout"
        );

    const modeLabel =
        document.getElementById(
            "ar-agent-mode"
        );

    const stateTitle =
        document.getElementById(
            "ar-agent-state-title"
        );

    const stateDescription =
        document.getElementById(
            "ar-agent-state-description"
        );

    const footerLeft =
        document.getElementById(
            "ar-agent-footer-left"
        );

    const launcherStatus =
        document.querySelector(
            ".ar-agent-launcher-status"
        );

    const TOKEN_KEY =
        "aamir_portfolio_private_agent_session";

    const PROFILE_KEY =
        "aamir_portfolio_private_agent_profile";

    const MAX_MESSAGE =
        650;

    const routes = {
        ABOUT: [
            "About",
            "#about"
        ],

        EXPERIENCE: [
            "Experience",
            "#experience"
        ],

        PROJECTS: [
            "Projects",
            "#projects"
        ],

        ROBOT: [
            "Voice-Controlled Mobile Robot",
            "index.html?project=robot#projects"
        ],

        SUMMA: [
            "Summa Bot",
            "index.html?project=summa#projects"
        ],

        CONVEYOR: [
            "Conveyor Automation",
            "index.html?project=conveyor#projects"
        ],

        LED: [
            "LED Matrix & PCB",
            "index.html?project=led#projects"
        ],

        FPGA: [
            "FPGA Security System",
            "index.html?project=fpga#projects"
        ],

        GESTURE: [
            "Gesture-Controlled Robot",
            "index.html?project=gesture#projects"
        ],

        EDUCATION: [
            "Education",
            "#education"
        ],

        PUBLICATION: [
            "Publication",
            "index.html?open=publication#publication"
        ],

        DOCUMENTS: [
            "Documents",
            "#documents"
        ],

        CV: [
            "Open CV",
            "index.html?open=cv#documents"
        ],

        SERVICES: [
            "Services",
            "services.html"
        ],

        CONTACT: [
            "Contact",
            "#contact"
        ],

        EMAIL: [
            "Email Aamir",
            "mailto:aamir.prof.edu@gmail.com"
        ],

        LINKEDIN: [
            "LinkedIn",
            "https://www.linkedin.com/in/aamir-rajper-020b13223/"
        ]
    };

    const isServices =
        window.location.pathname
            .toLowerCase()
            .endsWith(
                "services.html"
            );

    let sessionToken =
        loadSession();

    let profile =
        loadProfile();

    let history = [];

    function loadSession() {
        try {
            return (
                sessionStorage.getItem(
                    TOKEN_KEY
                ) || ""
            );
        } catch {
            return "";
        }
    }

    function loadProfile() {
        try {
            const raw =
                sessionStorage.getItem(
                    PROFILE_KEY
                );

            return raw
                ? JSON.parse(raw)
                : null;

        } catch {
            return null;
        }
    }

    function saveSession(
        token,
        nextProfile
    ) {
        sessionToken =
            token || "";

        profile =
            nextProfile || null;

        try {
            if (sessionToken) {
                sessionStorage.setItem(
                    TOKEN_KEY,
                    sessionToken
                );
            }

            if (profile) {
                sessionStorage.setItem(
                    PROFILE_KEY,
                    JSON.stringify(profile)
                );
            }

        } catch {}

        updateAuthUI();
    }

    function clearSession() {
        sessionToken = "";
        profile = null;
        history = [];

        try {
            sessionStorage.removeItem(
                TOKEN_KEY
            );

            sessionStorage.removeItem(
                PROFILE_KEY
            );

        } catch {}

        updateAuthUI();
    }

    function authenticated() {
        return Boolean(
            sessionToken &&
            profile
        );
    }

    function updateAuthUI() {
        const privateMode =
            authenticated();

        root.classList.toggle(
            "is-authenticated",
            privateMode
        );

        if (privateMode) {

            modeLabel.textContent =
                "PRIVATE AI";

            launcherStatus.textContent =
                "PRIVATE";

            stateTitle.textContent =
                "Private portfolio intelligence";

            stateDescription.textContent =
                `Authorized mode · ${profile.role || "general"} profile`;

            footerLeft.textContent =
                "PRIVATE AI · GEMINI → GROQ FALLBACK";

            logoutButton.hidden =
                false;

            input.placeholder =
                "Ask about Aamir's portfolio...";

            accessStatus.textContent =
                `Authorized as ${profile.id}`;

            accessStatus.className =
                "ar-agent-access-status success";

        } else {

            modeLabel.textContent =
                "PUBLIC MODE";

            launcherStatus.textContent =
                "AI";

            stateTitle.textContent =
                "Portfolio navigation";

            stateDescription.textContent =
                "Search or jump directly to a part of Aamir's portfolio. Private AI responses require authorized access.";

            footerLeft.textContent =
                "PUBLIC NAVIGATION · ZERO LLM";

            logoutButton.hidden =
                true;

            input.placeholder =
                "Search portfolio or unlock private AI...";

            accessStatus.textContent =
                "";

            accessStatus.className =
                "ar-agent-access-status";
        }
    }

    function openAgent() {
        root.classList.add(
            "is-open"
        );

        launcher?.setAttribute(
            "aria-expanded",
            "true"
        );

        panel?.setAttribute(
            "aria-hidden",
            "false"
        );

        window.setTimeout(
            () => input?.focus(),
            100
        );
    }

    function closeAgent() {
        root.classList.remove(
            "is-open"
        );

        launcher?.setAttribute(
            "aria-expanded",
            "false"
        );

        panel?.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    launcher?.addEventListener(
        "click",
        () => {
            if (
                root.classList.contains(
                    "is-open"
                )
            ) {
                closeAgent();
            } else {
                openAgent();
            }
        }
    );

    closeButton?.addEventListener(
        "click",
        closeAgent
    );

    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key === "Escape" &&
                root.classList.contains(
                    "is-open"
                )
            ) {
                closeAgent();
            }
        }
    );

    function plain(
        container,
        text
    ) {
        if (!text) {
            return;
        }

        const parts =
            text.split("\n");

        parts.forEach(
            (part, index) => {

                container.appendChild(
                    document.createTextNode(
                        part
                    )
                );

                if (
                    index <
                    parts.length - 1
                ) {
                    container.appendChild(
                        document.createElement(
                            "br"
                        )
                    );
                }
            }
        );
    }

    function rich(
        container,
        text
    ) {
        const pattern =
            /\[\[([A-Z0-9_-]+)\]\]/g;

        let cursor =
            0;

        String(text || "")
            .replace(
                pattern,
                (
                    whole,
                    marker,
                    offset
                ) => {

                    plain(
                        container,
                        text.slice(
                            cursor,
                            offset
                        )
                    );

                    const target =
                        resolveRoute(
                            marker
                        );

                    const link =
                        document.createElement(
                            "a"
                        );

                    link.className =
                        "ar-agent-route";

                    link.href =
                        target;

                    link.textContent =
                        routes[marker]?.[0] ||
                        marker;

                    if (
                        /^https?:\/\//i.test(
                            target
                        )
                    ) {
                        link.target =
                            "_blank";

                        link.rel =
                            "noopener noreferrer";
                    }

                    link.addEventListener(
                        "click",
                        () => {
                            closeAgent();
                        }
                    );

                    container.appendChild(
                        link
                    );

                    cursor =
                        offset +
                        whole.length;

                    return whole;
                }
            );

        plain(
            container,
            text.slice(
                cursor
            )
        );
    }

    function resolveRoute(
        marker
    ) {
        if (!isServices) {
            return (
                routes[marker]?.[1] ||
                "#"
            );
        }

        const crossPage = {
            ABOUT:
                "index.html#about",

            EXPERIENCE:
                "index.html#experience",

            PROJECTS:
                "index.html#projects",

            ROBOT:
                "index.html?project=robot#projects",

            SUMMA:
                "index.html?project=summa#projects",

            CONVEYOR:
                "index.html?project=conveyor#projects",

            LED:
                "index.html?project=led#projects",

            FPGA:
                "index.html?project=fpga#projects",

            GESTURE:
                "index.html?project=gesture#projects",

            EDUCATION:
                "index.html#education",

            PUBLICATION:
                "index.html?open=publication#publication",

            DOCUMENTS:
                "index.html#documents",

            CV:
                "index.html?open=cv#documents",

            SERVICES:
                "services.html",

            CONTACT:
                "index.html#contact",

            EMAIL:
                "mailto:aamir.prof.edu@gmail.com",

            LINKEDIN:
                "https://www.linkedin.com/in/aamir-rajper-020b13223/"
        };

        return (
            crossPage[marker] ||
            "index.html"
        );
    }

    function message(
        role,
        text
    ) {
        const item =
            document.createElement(
                "div"
            );

        item.className =
            `ar-agent-message ${role}`;

        const avatar =
            document.createElement(
                "span"
            );

        avatar.className =
            "ar-agent-avatar";

        avatar.textContent =
            role === "user"
                ? "YOU"
                : "AR";

        const body =
            document.createElement(
                "div"
            );

        body.className =
            "ar-agent-message-body";

        rich(
            body,
            text
        );

        item.append(
            avatar,
            body
        );

        messages.appendChild(
            item
        );

        messages.scrollTop =
            messages.scrollHeight;
    }

    function addHistory(
        role,
        content
    ) {
        history.push({
            role,
            content
        });

        history =
            history.slice(
                -8
            );
    }

    function typing() {
        const item =
            document.createElement(
                "div"
            );

        item.id =
            "ar-agent-typing";

        item.className =
            "ar-agent-message bot ar-agent-typing";

        item.innerHTML = `
            <span class="ar-agent-avatar">
                AR
            </span>

            <div class="ar-agent-message-body">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        messages.appendChild(
            item
        );

        messages.scrollTop =
            messages.scrollHeight;
    }

    function stopTyping() {
        document
            .getElementById(
                "ar-agent-typing"
            )
            ?.remove();
    }

    function normalize(
        value
    ) {
        return String(
            value || ""
        )
            .toLowerCase()
            .replace(
                /[^a-z0-9\s]/g,
                " "
            )
            .replace(
                /\s+/g,
                " "
            )
            .trim();
    }

    function navigateCommand(
        raw
    ) {
        const query =
            normalize(raw);

        if (!query) {
            return false;
        }

        if (
            /\b(cv|resume|curriculum)\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute("CV");

            return true;
        }

        if (
            /\bpublication\b|\bresearch\b|\bpaper\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute(
                    "PUBLICATION"
                );

            return true;
        }

        if (
            /\brobot\b|\brobots\b|\bvoice\b|\bcnn\b|\bstft\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute("ROBOT");

            return true;
        }

        if (
            /\bsumma\b|\bsummariz/
                .test(query)
        ) {
            window.location.href =
                resolveRoute("SUMMA");

            return true;
        }

        if (
            /\bconveyor\b|\brelay\b|\bautomation\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute(
                    "CONVEYOR"
                );

            return true;
        }

        if (
            /\bled matrix\b|\bpcb\b|\bembedded\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute("LED");

            return true;
        }

        if (
            /\bfpga\b|\bverilog\b|\bsecurity system\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute("FPGA");

            return true;
        }

        if (
            /\bgesture\b|\besp32\b|\bmpu6050\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute("GESTURE");

            return true;
        }

        if (
            /\bexperience\b|\bjob\b|\bwork\b|\bcareer\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute(
                    "EXPERIENCE"
                );

            return true;
        }

        if (
            /\beducation\b|\bdegree\b|\buniversity\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute(
                    "EDUCATION"
                );

            return true;
        }

        if (
            /\bservice\b|\bservices\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute(
                    "SERVICES"
                );

            return true;
        }

        if (
            /\bcontact\b|\bemail\b|\blinkedin\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute(
                    "CONTACT"
                );

            return true;
        }

        if (
            /\babout\b|\baamir\b/
                .test(query)
        ) {
            window.location.href =
                resolveRoute(
                    "ABOUT"
                );

            return true;
        }

        return false;
    }

    async function authenticateUser(
        event
    ) {
        event.preventDefault();

        const accessId =
            accessIdInput.value.trim();

        const accessKey =
            accessKeyInput.value;

        if (
            !accessId ||
            !accessKey
        ) {
            accessStatus.textContent =
                "Enter both Access ID and Access key.";

            accessStatus.className =
                "ar-agent-access-status error";

            return;
        }

        unlockButton.disabled =
            true;

        accessStatus.textContent =
            "Verifying private access...";

        accessStatus.className =
            "ar-agent-access-status";

        try {
            const response =
                await fetch(
                    "/.netlify/functions/agent",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "X-AR-Agent":
                                "1"
                        },

                        body:
                            JSON.stringify({
                                action:
                                    "authenticate",

                                accessId,

                                accessKey
                            })
                    }
                );

            const data =
                await response
                    .json()
                    .catch(
                        () => ({})
                    );

            if (
                response.ok &&
                data.ok &&
                data.sessionToken
            ) {
                saveSession(
                    data.sessionToken,
                    data.profile
                );

                accessKeyInput.value =
                    "";

                message(
                    "bot",
                    "Private agent access verified. You can now ask deeper questions about Aamir's portfolio."
                );

                addHistory(
                    "assistant",
                    "Private agent access verified."
                );

            } else {

                accessStatus.textContent =
                    data?.error ||
                    "Access could not be verified.";

                accessStatus.className =
                    "ar-agent-access-status error";
            }

        } catch {

            accessStatus.textContent =
                "Could not reach the private access service.";

            accessStatus.className =
                "ar-agent-access-status error";

        } finally {
            unlockButton.disabled =
                false;
        }
    }

    accessForm?.addEventListener(
        "submit",
        authenticateUser
    );

    logoutButton?.addEventListener(
        "click",
        () => {
            clearSession();

            message(
                "bot",
                "Private session ended. Public portfolio navigation remains available."
            );
        }
    );

    async function askPrivateAgent(
        question
    ) {
        if (!authenticated()) {
            return;
        }

        message(
            "user",
            question
        );

        addHistory(
            "user",
            question
        );

        typing();

        input.disabled =
            true;

        sendButton.disabled =
            true;

        try {

            const response =
                await fetch(
                    "/.netlify/functions/agent",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "X-AR-Agent":
                                "1",

                            "Authorization":
                                `Bearer ${sessionToken}`
                        },

                        body:
                            JSON.stringify({
                                message:
                                    question,

                                history
                            })
                    }
                );

            const data =
                await response
                    .json()
                    .catch(
                        () => ({})
                    );

            stopTyping();

            if (
                response.status ===
                401
            ) {
                clearSession();

                message(
                    "bot",
                    "Your private session has expired. Please unlock the private agent again."
                );

                return;
            }

            if (
                response.ok &&
                data.ok &&
                data.answer
            ) {
                message(
                    "bot",
                    data.answer
                );

                addHistory(
                    "assistant",
                    data.answer
                );

                return;
            }

            message(
                "bot",
                "The private agent is temporarily unavailable. You can still use the portfolio navigation."
            );

        } catch {

            stopTyping();

            message(
                "bot",
                "I couldn't reach the private agent service right now."
            );

        } finally {

            input.disabled =
                false;

            sendButton.disabled =
                false;

            input.focus();
        }
    }

    function submitPublicCommand(
        question
    ) {
        if (
            navigateCommand(
                question
            )
        ) {
            return;
        }

        message(
            "bot",
            "Public mode does not use the AI model. Try a portfolio command such as CV, robot, publication, experience, services or contact — or unlock Private AI below."
        );
    }

    form?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const question =
                input.value.trim();

            if (!question) {
                return;
            }

            if (
                question.length >
                MAX_MESSAGE
            ) {
                message(
                    "bot",
                    "Please keep the query under 650 characters."
                );

                return;
            }

            input.value =
                "";

            if (
                authenticated()
            ) {
                askPrivateAgent(
                    question
                );
            } else {
                submitPublicCommand(
                    question
                );
            }
        }
    );

    suggestions?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button"
                );

            if (!button) {
                return;
            }

            const publicCommand =
                button.dataset.command ||
                "";

            const privateQuestion =
                button.dataset.agentQuestion ||
                "";

            if (
                authenticated()
            ) {
                if (privateQuestion) {
                    askPrivateAgent(
                        privateQuestion
                    );
                }

                return;
            }

            if (
                publicCommand
            ) {
                submitPublicCommand(
                    publicCommand
                );
            }
        }
    );

    updateAuthUI();

})();