(() => {
    "use strict";

    const $ = (s, scope = document) =>
        scope.querySelector(s);

    const $$ = (s, scope = document) =>
        [...scope.querySelectorAll(s)];


    /* ======================================================
       PORTFOLIO DATA
       ====================================================== */

    const projects = {

        robot: {
            number: "01",
            type: "EMBEDDED AI",
            title: "Voice-Controlled Mobile Robot",
            description:
                "Developed a real-time offline voice-controlled robot for hazardous-environment inspection using Raspberry Pi 4, speech processing, machine-learning classification, environmental sensing and motor control.",
            technologies:
                "Raspberry Pi 4 · CNN · STFT · Sensors · Motor Control",
            result:
                "95% reported command accuracy with bilingual Urdu and English support.",
            architecture:
                "Microphone → preprocessing → spectrogram → CNN → command → robot control",
            pdf:
                "assets/projects/voice-controlled-robot/project.pdf",
            externalLabel:
                "Project material",
            externalUrl:
                "https://drive.google.com/file/d/1Albx6nulVBy855bplnNmCh2zzZJiAXHp/view?usp=drive_link"
        },

        summa: {
            number: "02",
            type: "AI / NLP",
            title: "Summa Bot",
            description:
                "AI text and PDF summarization application supporting raw text, direct PDF uploads and online PDF sources.",
            technologies:
                "Bubble.io · NLP Models · Third-Party APIs · HTTPS",
            result:
                "A multi-input summarization workflow producing concise downloadable summaries.",
            architecture:
                "Input → processing → NLP model → summary → export",
            pdf:
                "assets/projects/summa-bot/project.pdf",
            externalLabel:
                "Live demo",
            externalUrl:
                "https://summau.bubbleapps.io/version-test"
        },

        conveyor: {
            number: "03",
            type: "INDUSTRIAL AUTOMATION",
            title: "Low-Cost Conveyor Belt Automation",
            description:
                "Designed a hands-free automated motor-control system using existing production-line infrastructure without requiring a PLC.",
            technologies:
                "Optical Sensors · Relay Logic · Timer Relays · Electrical Schematics",
            result:
                "Focused on production bottlenecks, downtime and operational control.",
            architecture:
                "Detection → relay logic → timing → motor control",
            pdf:
                "assets/projects/conveyor-automation/project.pdf",
            externalLabel:
                "Project material",
            externalUrl:
                "https://drive.google.com/drive/folders/1SdXXyvi9nJwqbgMrmpi1HWsKRDAEorK7?usp=drive_link"
        },

        led: {
            number: "04",
            type: "PCB / EMBEDDED",
            title: "Custom LED Matrix Device",
            description:
                "Designed a custom driver PCB and firmware logic for an LED matrix with attention to signal integrity, power efficiency and thermal stability.",
            technologies:
                "Embedded C · PCB Routing · Microcontrollers · Power Analysis",
            result:
                "Integrated custom hardware and firmware into an embedded display platform.",
            architecture:
                "MCU → driver logic → multiplexing → LED matrix",
            pdf:
                "assets/projects/led-matrix/project.pdf",
            externalLabel:
                "Project material",
            externalUrl:
                "https://drive.google.com/drive/folders/1L51az6kkCP5AWyBCQG4g4Dwh9kYi7qUb?usp=drive_link"
        },

        fpga: {
            number: "05",
            type: "FPGA",
            title: "FPGA-Based Security System",
            description:
                "Implemented a hardware security module with digital password keypad logic and nested IR-sensor priority alerts.",
            technologies:
                "Verilog HDL · FPGA · Testbenches · Simulation · IR Sensors",
            result:
                "Combined digital access control with sensor-driven priority logic.",
            architecture:
                "Keypad + sensors → HDL logic → priority control → alerts",
            pdf:
                "assets/projects/fpga-security/project.pdf",
            externalLabel:
                "Project material",
            externalUrl:
                "https://drive.google.com/drive/folders/1B6_oH9fYiwnjNrSQ6fofd5BqJh5rvVrn?usp=sharing"
        },

        gesture: {
            number: "06",
            type: "WIRELESS EMBEDDED",
            title: "Gesture-Controlled Robotic Car",
            description:
                "Built a low-latency gesture-driven robotic vehicle using real-time tilt processing and wireless peer-to-peer communication.",
            technologies:
                "ESP32 · ESP-NOW · MPU6050 · C++",
            result:
                "Real-time motion-to-command control over a local wireless link.",
            architecture:
                "MPU6050 → tilt processing → ESP-NOW → vehicle control",
            pdf:
                "assets/projects/gesture-robot/project.pdf",
            externalLabel:
                "Project material",
            externalUrl:
                "https://drive.google.com/drive/folders/1ooi_Nz9h-y1Cad9-vAgOyG5W6BcAoVPL?usp=sharing"
        }

    };


    const documents = {

        cv: {
            title:
                "Aamir Rajper — Curriculum Vitae",
            path:
                "assets/documents/cv/aamir-rajper-cv.pdf"
        },

        publication: {
            title:
                "Applications of Augmented Reality in Industrial Manufacturing in the Era of Industry 5.0",
            path:
                "assets/documents/publications/industry-5-ar.pdf"
        }

    };


    /* ======================================================
       HEADER
       ====================================================== */

    const header =
        $("#site-header");


    function updateHeader() {

        header?.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    const mobileToggle =
        $(".mobile-toggle");

    const navLinks =
        $(".nav-links");


    mobileToggle?.addEventListener(
        "click",
        () => {

            const open =
                navLinks?.classList.toggle(
                    "open"
                ) || false;

            mobileToggle.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );


    $$(".nav-links > a").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks?.classList.remove(
                        "open"
                    );

                    mobileToggle?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );


    const dropdown =
        $(".nav-dropdown");

    const dropdownTrigger =
        $(".nav-dropdown-trigger");


    dropdownTrigger?.addEventListener(
        "click",
        () => {

            const open =
                dropdown?.classList.toggle(
                    "open"
                ) || false;

            dropdownTrigger.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                dropdown &&
                !dropdown.contains(
                    event.target
                )
            ) {

                dropdown.classList.remove(
                    "open"
                );

                dropdownTrigger?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* ======================================================
       SCROLL REVEAL
       ====================================================== */

    const reveal =
        $$(".reveal");


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -35px 0px"
                }
            );


        reveal.forEach(
            element =>
                observer.observe(element)
        );

    } else {

        reveal.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

    }


    /* ======================================================
       PROJECT FILTERS
       ====================================================== */

    const filterButtons =
        $$(".filter-button");

    const projectCards =
        $$(".project-card");


    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.filter;


                    filterButtons.forEach(
                        b =>
                            b.classList.remove(
                                "active"
                            )
                    );


                    button.classList.add(
                        "active"
                    );


                    projectCards.forEach(
                        card => {

                            if (
                                filter === "all"
                            ) {

                                card.classList.remove(
                                    "is-hidden"
                                );

                                return;

                            }


                            const categories =
                                (
                                    card.dataset.category ||
                                    ""
                                )
                                    .split(/\s+/)
                                    .filter(Boolean);


                            card.classList.toggle(
                                "is-hidden",
                                !categories.includes(
                                    filter
                                )
                            );

                        }
                    );

                }
            );

        }
    );


    /* ======================================================
       DOCUMENT VIEWER
       ====================================================== */

    const documentModal =
        $("#document-modal");

    const documentFrame =
        $("#document-frame");

    const documentPlaceholder =
        $("#document-placeholder");

    const documentTitle =
        $("#document-title");

    const documentNewTab =
        $("#document-new-tab");


    function showDocumentState(
        title,
        message
    ) {

        if (documentTitle)
            documentTitle.textContent =
                title;


        if (documentFrame) {

            documentFrame.src =
                "about:blank";

            documentFrame.style.display =
                "none";

        }


        if (documentPlaceholder) {

            documentPlaceholder.hidden =
                false;

            documentPlaceholder.innerHTML = `
                <strong>${title}</strong>
                <p>${message}</p>
            `;

        }


        if (documentNewTab) {

            documentNewTab.href =
                "#";

            documentNewTab.style.display =
                "none";

        }

    }


    async function openDocument(
        path,
        title
    ) {

        if (
            !documentModal ||
            !path
        ) {
            return;
        }


        documentModal.classList.add(
            "open"
        );

        documentModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );


        if (documentPlaceholder)
            documentPlaceholder.hidden = true;


        if (documentFrame) {

            documentFrame.style.display =
                "block";

        }


        if (documentNewTab) {

            documentNewTab.style.display =
                "inline-flex";

            documentNewTab.href =
                path;

        }


        if (documentTitle)
            documentTitle.textContent =
                title || "Document Viewer";


        try {

            const response =
                await fetch(
                    path,
                    {
                        method: "HEAD",
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                showDocumentState(
                    title || "Document",
                    "The viewer is ready, but this PDF has not been attached to the website yet."
                );

                return;

            }


            if (documentFrame)
                documentFrame.src =
                    path;

        } catch {

            showDocumentState(
                title || "Document",
                "The file could not be verified. You can try opening it in a new tab."
            );

        }

    }


    function closeDocument() {

        if (!documentModal)
            return;


        documentModal.classList.remove(
            "open"
        );


        documentModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        if (documentFrame)
            documentFrame.src =
                "about:blank";

    }


    $$(".document-open").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const key =
                        button.dataset.documentKey;

                    const item =
                        documents[key];


                    openDocument(
                        item?.path ||
                        button.dataset.document,
                        item?.title ||
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    $$(".document-close").forEach(
        button =>
            button.addEventListener(
                "click",
                closeDocument
            )
    );


    $(".modal-backdrop", documentModal)
        ?.addEventListener(
            "click",
            closeDocument
        );


    /* ======================================================
       PROJECT MODAL
       ====================================================== */

    const projectModal =
        $("#project-modal");

    const modalContent =
        $("#modal-content");


    function resourceHTML(project) {

        let html =
            `<div class="modal-project-resources">
                <span>PROJECT RESOURCES</span>
                <div class="resource-links">`;


        if (project.pdf) {

            html += `
                <button
                    type="button"
                    class="resource-button"
                    data-resource-pdf="${project.pdf}"
                    data-resource-title="${project.title} — Project PDF"
                >
                    Project PDF ↗
                </button>
            `;

        }


        if (project.externalUrl) {

            html += `
                <a
                    class="resource-button"
                    href="${project.externalUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${project.externalLabel} ↗
                </a>
            `;

        }


        html += `
                </div>

                <p class="resource-note">
                    Additional project files can be placed under
                    assets/projects/${project.slug || "project"}/.
                </p>

            </div>`;


        return html;

    }


    function openProject(
        key
    ) {

        const project =
            projects[key];


        if (
            !project ||
            !projectModal ||
            !modalContent
        ) {
            return;
        }


        modalContent.innerHTML = `

            <span class="modal-project-label">
                ${project.number} / ${project.type}
            </span>

            <h2
                class="modal-project-title"
                id="modal-title"
            >
                ${project.title}
            </h2>

            <p class="modal-project-description">
                ${project.description}
            </p>

            <div class="modal-project-grid">

                <div class="modal-project-block">
                    <span>TECHNOLOGIES</span>
                    <strong>
                        ${project.technologies}
                    </strong>
                </div>

                <div class="modal-project-block">
                    <span>RESULT / OUTCOME</span>
                    <strong>
                        ${project.result}
                    </strong>
                </div>

                <div class="modal-project-block">
                    <span>SYSTEM ARCHITECTURE</span>
                    <strong>
                        ${project.architecture}
                    </strong>
                </div>

            </div>

            ${resourceHTML(project)}
        `;


        modalContent
            .querySelectorAll(
                "[data-resource-pdf]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () =>
                            openDocument(
                                button.dataset.resourcePdf,
                                button.dataset.resourceTitle
                            )
                    );

                }
            );


        projectModal.classList.add(
            "open"
        );


        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    function closeProject() {

        if (!projectModal)
            return;


        projectModal.classList.remove(
            "open"
        );


        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    $$(".project-open").forEach(
        button => {

            button.addEventListener(
                "click",
                () =>
                    openProject(
                        button.dataset.project
                    )
            );

        }
    );


    $$("#project-modal .modal-close")
        .forEach(
            button =>
                button.addEventListener(
                    "click",
                    closeProject
                )
        );


    $(".modal-backdrop", projectModal)
        ?.addEventListener(
            "click",
            closeProject
        );


    /* ======================================================
       DIRECT URL DEEP LINKS
       ====================================================== */

    function handleDeepLink() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const project =
            params.get("project");


        if (
            project &&
            projects[project]
        ) {

            window.setTimeout(
                () =>
                    openProject(project),
                300
            );

        }


        const documentKey =
            params.get("open");


        if (
            documentKey &&
            documents[documentKey]
        ) {

            window.setTimeout(
                () =>
                    openDocument(
                        documents[documentKey].path,
                        documents[documentKey].title
                    ),
                300
            );

        }

    }


    handleDeepLink();


    /* ======================================================
       ESCAPE
       ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            )
                return;

            closeProject();
            closeDocument();

        }
    );


    /* ======================================================
       MAGNETIC ACTIONS
       ====================================================== */

    if (
        window.matchMedia(
            "(hover: hover)"
        ).matches
    ) {

        $$(".magnetic").forEach(
            element => {

                element.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        element.style.transform =
                            `translate(${x * 0.08}px, ${y * 0.08}px)`;

                    }
                );


                element.addEventListener(
                    "pointerleave",
                    () =>
                        element.style.transform = ""
                );

            }
        );

    }


    /* ======================================================
       ANCHOR SCROLL
       ====================================================== */

    $$('a[href^="#"]').forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    )
                        return;


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target)
                        return;


                    event.preventDefault();


                    const offset =
                        header?.offsetHeight ||
                        0;


                    const top =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        offset -
                        15;


                    window.scrollTo({
                        top,
                        behavior:
                            window.matchMedia(
                                "(prefers-reduced-motion: reduce)"
                            ).matches
                                ? "auto"
                                : "smooth"
                    });

                }
            );

        }
    );

})();
