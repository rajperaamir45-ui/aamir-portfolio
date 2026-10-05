```javascript
// Persona Database Configurations
const personaData = {
    "PUBLIC": {
        roleTitle: "Electrical & Electronics Engineer",
        heroDesc: "Building practical solutions across engineering, automation, embedded systems, and technology.",
        cvLink: "assets/docs/Aamir_Rajper_General_CV.pdf",
        headline: "Multi-Disciplinary Engineering & Operations Focus",
        bio: "I am an electrical engineer with specialized expertise spanning power distribution, embedded microcontrollers, and strategic procurement. I focus on bridging high-level technical designs with cost-efficient physical implementations.",
        pillars: [
            { icon: "⚡", title: "Power & Infrastructure", desc: "Solar PV, BESS integration, switchgear, and standardized schedule of rates." },
            { icon: "🔌", title: "Embedded Systems", desc: "STM32 microcontrollers, sensor guidance logic, and C/Assembly drivers." },
            { icon: "📦", title: "Supply Chain Procurement", desc: "Technical BOM auditing, equipment rate sheets, and vendor management." }
        ],
        experience: [
            { role: "Electrical & Supply Chain Engineer", company: "Engineering Solutions Corp", period: "2024 - Present", details: "Coordinating technical equipment procurement, solar PV switchgear specs, and embedded hardware workflows." },
            { role: "Embedded Systems Engineer", company: "Automation & Robotics Lab", period: "2023 - 2024", details: "Developed STM32 microcontroller firmware and sensor guidance systems for automated controllers." }
        ],
        education: [
            { degree: "B.S. in Electrical Engineering", institution: "Engineering University", period: "2019 - 2023", details: "Specialization in power systems, digital logic design, and embedded architectures." }
        ],
        projects: [
            { title: "Smart Parking Guidance & Control System", tags: ["STM32", "Embedded Systems", "Sensors"], desc: "Designed and built an automated vehicle guidance and gate control system using STM32 microcontrollers, HC-SR04 ultrasonic sensors, and servo actuators with local wireless architecture.", sourceLink: null },
            { title: "Solar & Battery Energy Storage Measurement System", tags: ["Solar PV", "BESS", "Procurement"], desc: "Developed standardized electrical measurement sheets and schedule of rates for power distribution, solar PV infrastructure, surge protection, and low-voltage BESS integrations.", sourceLink: null },
            { title: "Rental Market Exploratory Data Analysis", tags: ["Python", "Pandas", "Data Analysis"], desc: "Executed statistical summary models, logarithmic distribution transformations, and multi-variable correlation matrix evaluations across property listings using Python and Pandas.", sourceLink: null }
        ],
        research: [],
        contactText: "I am open to opportunities in electrical engineering, supply chain procurement, power systems, and embedded automation. Feel free to reach out directly or connect with me!"
    },
    "AC007": {
        roleTitle: "Electrical Engineer | Systems & Research Specialist",
        badge: "🎓 Academic Research & Theoretical Computer Architecture Mode Active",
        heroDesc: "Focusing on digital logic design, theoretical computer architecture, formal automata systems, and embedded hardware prototyping.",
        cvLink: "assets/docs/Aamir_Rajper_Academic_CV.pdf",
        headline: "Academic Excellence in Digital Logic & Theoretical Architectures",
        bio: "Specializing in theoretical digital design, computer architecture, formal languages, and embedded systems. I approach engineering from mathematical first-principles, utilizing tools like JFLAP for automata simulation and RISC-V datapaths for micro-operation modeling.",
        pillars: [
            { icon: "💻", title: "Digital Logic & RISC-V", desc: "NOR expressions, full-adder decrementers, register micro-ops, and single-cycle datapaths." },
            { icon: "🔬", title: "Formal Automata Theory", desc: "NPDA logic, regular expressions, formal languages, and JFLAP simulation XML models." },
            { icon: "⚡", title: "Hardware Prototyping", desc: "STM32 register-level configuration, ultrasonic sensor timing, and low-power execution." }
        ],
        experience: [
            { role: "Graduate Research Assistant", company: "Digital Systems & Architecture Lab", period: "2024 - Present", details: "Researched non-deterministic pushdown automata models and RISC-V register micro-operations." },
            { role: "Academic Teaching Assistant", company: "Department of Electrical Engineering", period: "2023 - 2024", details: "Instructed laboratory sessions on digital logic design, Karnaugh maps, and STM32 microcontroller pinouts." }
        ],
        education: [
            { degree: "B.S. in Electrical Engineering (Honors)", institution: "Engineering University", period: "2019 - 2023", details: "Focus: Computer Architecture, Formal Languages, Digital System Design. Magna Cum Laude." }
        ],
        projects: [
            { title: "RISC-V Single-Cycle Datapath Simulator", tags: ["RISC-V", "Architecture", "Verilog"], desc: "Complete schematic and logic design for custom single-cycle datapath micro-operations.", sourceLink: "assets/docs/riscv_datapath_thesis.pdf" },
            { title: "Smart Parking Ultrasonic Guidance Logic", tags: ["STM32", "Embedded", "C"], desc: "Firmware timing models and full circuit schematics with ultrasonic guidance.", sourceLink: "assets/docs/stm32_parking_paper.pdf" },
            { title: "NPDA Language Automata Models", tags: ["Automata", "JFLAP", "Theory"], desc: "Formal language solver for context-free grammars and JFLAP simulation source.", sourceLink: "assets/docs/npda_automata_thesis.pdf" }
        ],
        research: [
            { title: "Formal Systems Analysis of Context-Free Languages in NPDA Architecture", journal: "Journal of Theoretical Computer Engineering (2026)", paperPdf: "assets/docs/npda_paper_2026.pdf" },
            { title: "Single-Cycle RISC-V Datapath Optimization for Embedded Microcontrollers", journal: "IEEE Micro-Architecture Symposium (2025)", paperPdf: "assets/docs/riscv_paper_2025.pdf" }
        ],
        contactText: "Interested in academic research collaborations, teaching assistantships, or PhD fellowship opportunities? Reach out directly!"
    },
    "CS007": {
        roleTitle: "Electrical & Supply Chain Lead Engineer",
        badge: "💼 Corporate Executive & Supply Chain Procurement Mode Active",
        heroDesc: "Leveraging dual background in power engineering and supply chain logistics to optimize equipment scheduling, BOM auditing, and renewable ROI.",
        cvLink: "assets/docs/Aamir_Rajper_Executive_CV.pdf",
        headline: "Strategic Sourcing, Equipment Procurement & Power Infrastructure",
        bio: "Specializing in renewable energy infrastructure, battery storage systems (BESS), equipment schedule of rates, and technical bill-of-materials auditing. I deliver measurable financial savings and streamlined procurement logistics for corporate engineering projects.",
        pillars: [
            { icon: "⚡", title: "Power Infrastructure & BESS", desc: "Solar PV plant specifications, switchgear selection, surge protection, and cable runs." },
            { icon: "📦", title: "Technical Sourcing & BOM", desc: "Line-item vendor auditing, contract negotiation, and rate schedules." },
            { icon: "📊", title: "Data-Driven ROI Modeling", desc: "Python Pandas analytics for capital expenditure forecasts and price distributions." }
        ],
        experience: [
            { role: "Senior Supply Chain & Procurement Lead", company: "Power Infrastructure Group", period: "2024 - Present", details: "Managed $2M+ in BESS equipment procurement, standardized low-voltage distribution rate sheets, and vendor contracts." },
            { role: "Power Systems Procurement Engineer", company: "Renewable Energy Solutions", period: "2023 - 2024", details: "Audited bill-of-materials (BOM) for solar PV plants and streamlined equipment switchgear logistics." }
        ],
        education: [
            { degree: "B.S. in Electrical Engineering", institution: "Engineering University", period: "2019 - 2023", details: "Concentration in Power Systems Engineering & Technical Supply Chain Management." }
        ],
        projects: [
            { title: "Solar & BESS Schedule of Rates Model", tags: ["Solar PV", "BESS", "Procurement"], desc: "Standardized measurement sheets and low-voltage cable procurement specifications.", sourceLink: null },
            { title: "Rental Market Price EDA & Cost Analytics", tags: ["Python", "Pandas", "ROI"], desc: "Exploratory logarithmic price distribution modeling and multi-variable correlation matrices.", sourceLink: null },
            { title: "Smart Parking Industrial Hardware Deployment", tags: ["STM32", "Logistics", "Hardware"], desc: "Cost-optimized bill of materials and actuator sourcing strategy for vehicle guidance.", sourceLink: null }
        ],
        research: [],
        contactText: "Discussing power infrastructure projects, procurement auditing, or corporate engineering roles? Let's connect!"
    }
};

// Page Load Initialization
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    const savedCode = localStorage.getItem('portfolio_pin');

    if (codeFromUrl && personaData[codeFromUrl.toUpperCase()]) {
        applyPersona(codeFromUrl.toUpperCase());
    } else if (savedCode && personaData[savedCode]) {
        applyPersona(savedCode);
    } else {
        applyPersona("PUBLIC");
    }
});

// Authenticate Code Function
function verifyAccessCode() {
    const inputField = document.getElementById("accessCodeInput");
    const input = inputField ? inputField.value.trim().toUpperCase() : "";
    
    if (personaData[input]) {
        localStorage.setItem('portfolio_pin', input);
        applyPersona(input);
    } else {
        alert("Invalid PIN code. Try 'AC007' for Academic Mode or 'CS007' for Corporate Mode.");
    }
}

// Reset Persona to Public View
function resetAccessCode() {
    localStorage.removeItem('portfolio_pin');
    const inputField = document.getElementById("accessCodeInput");
    if (inputField) inputField.value = "";
    applyPersona("PUBLIC");
}

// Main Function to Update DOM Elements dynamically
function applyPersona(code) {
    const data = personaData[code] || personaData["PUBLIC"];

    // 1. Update Hero Section & CV Download Link
    const heroRole = document.querySelector(".hero-role");
    if (heroRole) heroRole.innerText = data.roleTitle;

    const heroDesc = document.getElementById("heroDesc");
    if (heroDesc) heroDesc.innerText = data.heroDesc;

    const cvBtn = document.getElementById("cvDownloadBtn");
    if (cvBtn) cvBtn.href = data.cvLink;

    // 2. Auth Badge & Reset Button Display
    const badge = document.getElementById("modeBadge");
    const resetBtn = document.getElementById("resetPinBtn");
    const inputField = document.getElementById("accessCodeInput");

    if (code !== "PUBLIC") {
        if (badge) {
            badge.innerText = data.badge;
            badge.style.display = "inline-block";
        }
        if (resetBtn) resetBtn.style.display = "inline-block";
        if (inputField) inputField.value = code;
    } else {
        if (badge) badge.style.display = "none";
        if (resetBtn) resetBtn.style.display = "none";
    }

    // 3. Update About Me Section & Pillars
    const personaHeadline = document.getElementById("personaHeadline");
    if (personaHeadline) personaHeadline.innerText = data.headline;

    const personaBio = document.getElementById("personaBio");
    if (personaBio) personaBio.innerText = data.bio;

    const personaPillars = document.getElementById("personaPillars");
    if (personaPillars) {
        personaPillars.innerHTML = data.pillars.map(p => `
            <div class="pillar-card ${code !== 'PUBLIC' ? 'highlighted' : ''}">
                <h4>${p.icon} ${p.title}</h4>
                <p>${p.desc}</p>
            </div>
        `).join("");
    }

    // 4. Update Experience Section
    const experienceList = document.getElementById("experienceList");
    if (experienceList) {
        experienceList.innerHTML = data.experience.map(e => `
            <div class="timeline-card">
                <div class="timeline-header">
                    <h3>${e.role}</h3>
                    <span class="timeline-date">${e.period}</span>
                </div>
                <h4 class="timeline-company">${e.company}</h4>
                <p>${e.details}</p>
            </div>
        `).join("");
    }

    // 5. Update Education Section
    const educationList = document.getElementById("educationList");
    if (educationList) {
        educationList.innerHTML = data.education.map(ed => `
            <div class="education-card">
                <h3>${ed.degree}</h3>
                <h4>${ed.institution} (${ed.period})</h4>
                <p>${ed.details}</p>
            </div>
        `).join("");
    }

    // 6. Update Projects Section & Download/View Buttons
    const projectsGrid = document.getElementById("projectsGrid");
    if (projectsGrid) {
        projectsGrid.innerHTML = data.projects.map(p => `
            <div class="project-card">
                <div>
                    <div class="project-tags">
                        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
                    </div>
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                </div>
                <div class="project-links">
                    ${p.sourceLink ? `<button type="button" onclick="openPdfModal('${p.title}', '${p.sourceLink}')" class="btn-link">📄 View Specs & Paper</button>` : `<a href="#contact" class="btn-link">Inquire Details &rarr;</a>`}
                </div>
            </div>
        `).join("");
    }

    // 7. Academic Research Section Toggle (AC007 Only)
    const researchSec = document.getElementById("research");
    const navResearchLink = document.getElementById("navResearchLink");
    const researchGrid = document.getElementById("researchGrid");

    if (code === "AC007" && data.research.length > 0) {
        if (researchSec) researchSec.style.display = "block";
        if (navResearchLink) navResearchLink.style.display = "inline-block";
        if (researchGrid) {
            researchGrid.innerHTML = data.research.map(r => `
                <div class="research-card">
                    <h3>📄 ${r.title}</h3>
                    <p class="journal-name">${r.journal}</p>
                    <button type="button" onclick="openPdfModal('${r.title}', '${r.paperPdf}')" class="btn-primary-sm">Read Publication PDF</button>
                </div>
            `).join("");
        }
    } else {
        if (researchSec) researchSec.style.display = "none";
        if (navResearchLink) navResearchLink.style.display = "none";
    }

    // 8. Update Contact Section Text
    const contactLeadText = document.getElementById("contactLeadText");
    if (contactLeadText) contactLeadText.innerText = data.contactText;
}

// Modal PDF Overlay Controls
function openPdfModal(title, pdfUrl) {
    const modalTitle = document.getElementById("modalTitle");
    const pdfFrame = document.getElementById("pdfFrame");
    const pdfModal = document.getElementById("pdfModal");

    if (modalTitle) modalTitle.innerText = title;
    if (pdfFrame) pdfFrame.src = pdfUrl;
    if (pdfModal) pdfModal.style.display = "flex";
}

function closePdfModal() {
    const pdfModal = document.getElementById("pdfModal");
    const pdfFrame = document.getElementById("pdfFrame");

    if (pdfModal) pdfModal.style.display = "none";
    if (pdfFrame) pdfFrame.src = "";
}

```