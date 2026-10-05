(() => {
    "use strict";

    const root =
        document.getElementById("ar-agent");

    if (!root) return;


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


    const MAX_DAILY =
        5;

    const STORAGE_KEY =
        "aamir_portfolio_agent_daily";


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


    function resolveRoute(
        marker
    ) {

        if (!isServices)
            return routes[marker]?.[1] || "#";


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


    function usage() {

        const date =
            new Date()
                .toISOString()
                .slice(0, 10);


        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        STORAGE_KEY
                    ) || "{}"
                );


            if (
                saved.date !== date
            ) {

                return {
                    date,
                    count: 0
                };

            }


            return {
                date,
                count:
                    Number(
                        saved.count
                    ) || 0
            };

        } catch {

            return {
                date,
                count: 0
            };

        }

    }


    function increment() {

        const state =
            usage();

        state.count += 1;


        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

        } catch {}

    }


    function allowed() {

        return (
            usage().count <
            MAX_DAILY
        );

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


    function plain(
        container,
        text
    ) {

        if (!text)
            return;


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

        const markerPattern =
            /\[\[([A-Z0-9_-]+)\]\]/g;


        let cursor = 0;


        text.replace(
            markerPattern,
            (
                whole,
                marker,
                index
            ) => {

                plain(
                    container,
                    text.slice(
                        cursor,
                        index
                    )
                );


                const route =
                    routes[marker];


                if (route) {

                    const link =
                        document.createElement(
                            "a"
                        );


                    link.className =
                        "ar-agent-route";


                    link.href =
                        resolveRoute(
                            marker
                        );


                    link.textContent =
                        route[0];


                    link.addEventListener(
                        "click",
                        () =>
                            closeAgent()
                    );


                    container.appendChild(
                        link
                    );

                }


                cursor =
                    index +
                    whole.length;


                return whole;

            }
        );


        plain(
            container,
            text.slice(cursor)
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


    async function ask(
        question
    ) {

        if (!allowed()) {

            message(
                "bot",
                "The courtesy limit of 5 questions for this browser today has been reached. You can continue with [[PROJECTS]], [[DOCUMENTS]], [[SERVICES]], or [[CONTACT]]."
            );

            return;

        }


        const history =
            [
                ...messages.querySelectorAll(
                    ".ar-agent-message"
                )
            ]
                .slice(-8)
                .map(
                    item => ({

                        role:
                            item.classList.contains(
                                "user"
                            )
                                ? "user"
                                : "assistant",

                        content:
                            (
                                item.querySelector(
                                    ".ar-agent-message-body"
                                )?.innerText ||
                                ""
                            ).slice(0, 500)

                    })
                );


        message(
            "user",
            question
        );


        increment();

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
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "X-AR-Agent":
                                "1"
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
                response.ok &&
                data.ok &&
                data.answer
            ) {

                message(
                    "bot",
                    data.answer
                );

            } else {

                message(
                    "bot",
                    "The agent is temporarily unavailable. You can still navigate directly to [[PROJECTS]], [[DOCUMENTS]], [[SERVICES]], or [[CONTACT]]."
                );

            }

        } catch {

            stopTyping();

            message(
                "bot",
                "I couldn't reach the agent service right now. You can still browse [[PROJECTS]], [[DOCUMENTS]], [[SERVICES]], or [[CONTACT]]."
            );

        } finally {

            input.disabled =
                false;

            sendButton.disabled =
                false;

            input.focus();

        }

    }


    form?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const question =
                input.value.trim();


            if (!question)
                return;


            if (
                question.length >
                650
            ) {

                message(
                    "bot",
                    "Please keep the question under 650 characters."
                );

                return;

            }


            input.value = "";

            ask(question);

        }
    );


    suggestions
        ?.querySelectorAll(
            "[data-agent-question]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        input.value =
                            button.dataset
                                .agentQuestion ||
                            "";

                        input.focus();

                    }
                );

            }
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeAgent();

            }

        }
    );

})();
