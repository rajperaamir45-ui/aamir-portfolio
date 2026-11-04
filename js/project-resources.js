(() => {
    "use strict";

    const RESOURCES = [
        {
            id: "voice-controlled-robot",
            titles: [
                "voice controlled mobile robot",
                "voice controlled robot"
            ],
            url: "assets/projects/voice-controlled-robot/project.pdf",
            label: "View Project Report"
        },
        {
            id: "led-matrix",
            titles: [
                "custom led matrix device",
                "led matrix",
                "led matrix device"
            ],
            url: "assets/projects/led-matrix/project.html",
            label: "View Project Documentation"
        }
    ];

    function normalize(value) {
        return String(value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function matchesProject(text, project) {
        const normalized = normalize(text);

        return project.titles.some(title =>
            normalized.includes(normalize(title))
        );
    }

    function findProjectCard(project) {
        const selectors = [
            "h1", "h2", "h3", "h4", "h5", "h6",
            "[class*='project-title']",
            "[data-project-title]"
        ].join(",");

        for (const element of document.querySelectorAll(selectors)) {
            if (!matchesProject(element.textContent, project)) {
                continue;
            }

            let current = element.parentElement;

            for (let depth = 0; current && depth < 8; depth++) {
                const classes =
                    typeof current.className === "string"
                        ? current.className
                        : "";

                if (
                    /project[-_ ]?(card|item)/i.test(classes) ||
                    current.tagName === "ARTICLE" ||
                    current.hasAttribute("data-project")
                ) {
                    return current;
                }

                current = current.parentElement;
            }
        }

        const cards = [
            ...document.querySelectorAll(
                "article, [data-project], .project-card, .project-item"
            )
        ]
            .filter(card =>
                matchesProject(card.textContent, project)
            )
            .sort((a, b) =>
                a.textContent.length - b.textContent.length
            );

        return cards[0] || null;
    }

    function attachResource(project) {
        const card = findProjectCard(project);

        if (!card) {
            console.warn(
                "[Project Resources] Card not found:",
                project.id
            );
            return;
        }

        if (
            card.querySelector(
                `[data-project-resource="${project.id}"]`
            )
        ) {
            return;
        }

        const link = document.createElement("a");

        link.className = "project-document-link";
        link.dataset.projectResource = project.id;
        link.href = project.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.setAttribute(
            "aria-label",
            project.label
        );

        const label = document.createElement("span");
        label.textContent = project.label;

        const arrow = document.createElement("span");
        arrow.textContent = "↗";
        arrow.setAttribute("aria-hidden", "true");

        link.append(label, arrow);
        card.appendChild(link);

        console.info(
            "[Project Resources] Attached:",
            project.id
        );
    }

    function attachResources() {
        RESOURCES.forEach(attachResource);
    }

    function initialize() {
        attachResources();

        const observer = new MutationObserver(() => {
            attachResources();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }
})();
