// SINGLE SOURCE OF TRUTH. Edit content here only; UI never holds copy.
export const person = {
  name: 'Aamir Rajper', email: 'aamir.prof.edu@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aamir-rajper-020b13223/',
  cv: 'assets/docs/Aamir_Rajper_CV.pdf', location: 'Karachi, Pakistan'
};
// A lens re-ranks the SAME data by tag emphasis. Add a lens = add an object.
export const lenses = {
  public:    { label: 'General',  code: null,    focus: [], wave: 'sine',
    role: 'Electrical & Automation Engineer',
    lead: 'I build and keep running the systems behind power, production and procurement: from genset diagnostics to voice-controlled robots.',
    about: 'Electronics & automation graduate (Sukkur IBA, 2024) working across power systems, embedded hardware and supply chain. I like problems where the root cause is hiding in the data.' },
  academic:  { label: 'Research', code: 'AC007', focus: ['ai','embedded','research','fpga'], wave: 'square',
    role: 'Embedded Systems & AI Researcher',
    lead: 'Speech recognition on a Raspberry Pi, FPGA logic, and a published paper on Augmented Reality in Industry 5.0.',
    about: 'My thesis put a CNN-based speech recogniser on-device (95% accuracy, no cloud). I co-authored an IJEAP paper and won the PEC final-year project funding award.' },
  corporate: { label: 'Industry', code: 'CS007', focus: ['power','ops','supply','data'], wave: 'saw',
    role: 'Power, Operations & Procurement Engineer',
    lead: 'Genset reliability, solar PV + BESS feasibility, and vendor-managed procurement, measured in downtime and cost.',
    about: 'I cut genset downtime by over 60% with root-cause tracking, priced solar PV + BESS studies and ran ERP-based procurement. I work best where engineering meets operational numbers.' }
};
export const stats = [['60%','less genset downtime'],['95%','voice command accuracy'],['25%','fewer unexpected breakdowns']];
export const experience = [
  { role:'Electrical Engineer', org:'PAA', place:'Hyderabad', when:'Jan 2026 – May 2026', tags:['power','ops'], points:[
    'Ran facility load audits and wind resource assessments for commercial buildings; inspected illumination systems on MD83 and Boeing 737 aircraft.',
    'Built cost estimates and design comparisons for solar PV + BESS feasibility, including technology selection and commercial models.',
    'Prepared maintenance oversight plans and project documentation for electrical rehabilitation and HVAC planning.'] },
  { role:'Assistant Shift Engineer', org:'Allied Engineering and Services', place:'Karachi', when:'May 2025 – Dec 2025', tags:['power','ops','data'], points:[
    'Resolved recurring AVR failures and added a root-cause log, cutting genset downtime by over 60%.',
    'Introduced shift KPIs and standard handover procedures, reducing response times by 30%.',
    'Launched an Excel/Sheets health dashboard that informed maintenance planning and cut unexpected breakdowns 25%.'] },
  { role:'Supply Chain Procurement Manager', org:'AH Associates', place:'Karachi', when:'Jun 2024 – Apr 2025', tags:['supply','ops','data'], points:[
    'Managed purchase orders and inventory through ERP and Excel trackers, with weekly cost reports to management.',
    'Negotiated pricing with local vendors daily and tracked vendor performance against project deadlines.'] },
  { role:'Maintenance Intern', org:'Pakistan Beverages (PepsiCo)', place:'Karachi', when:'Jul 2024 – Oct 2024', tags:['ops','data'], points:[
    'Compared IIoT and SCADA technologies and recommended the best fit for plant operations.'] },
  { role:'Production Intern', org:'FrieslandCampina Engro', place:'Sukkur', when:'Jul 2023 – Aug 2023', tags:['ops','embedded'], points:[
    'Diagnosed conveyor motor downtime and delivered a relay-logic fix that removed the bottleneck.'] }
];
export const projects = [
  { title:'Voice Controlled Mobile Robot', blurb:'Thesis. CNN speech recogniser trained on STFT spectrograms, running offline on a Raspberry Pi 4 with gas and temperature sensing. 95% accuracy, with Urdu support via transfer learning.', tags:['ai','embedded','research'], link:'https://drive.google.com/file/d/1AIbx6nuIVBy855bplnNmCh2zzZJiAXHp/view?usp=drive_link' },
  { title:'Conveyor Belt Automation', blurb:'Relay, timer and contactor logic with optical sensors that stops motors on downstream faults. No PLC needed, so it is cheap to replicate across lines.', tags:['ops','power','embedded'], link:'https://drive.google.com/drive/folders/1SdXXyvi9nJwqbgMrmpi1HWsKRDAEorK7?usp=drive_link' },
  { title:'FPGA Security System', blurb:'Verilog password door lock plus IR intrusion detection, verified with testbenches.', tags:['fpga','embedded'], link:'https://drive.google.com/drive/folders/1B6_oH9fYiwnjNrSQ6fofd5BqJh5rvVrn?usp=sharing' },
  { title:'Summa Bot', blurb:'No-code AI web app (Bubble.io) that summarises text, PDFs and PDF links, with downloadable output.', tags:['ai','data'], link:'https://summau.bubbleapps.io/version-test' },
  { title:'Gesture Controlled Car', blurb:'Tilt-gesture driving using two ESP32 boards over ESP-NOW and an MPU6050.', tags:['embedded'], link:'https://drive.google.com/drive/folders/1ooi_Nz9h-y1Cad9-vAgOyG5W6BcAoVPL?usp=sharing' },
  { title:'LED Matrix Display', blurb:'Custom-routed PCB and embedded C firmware for patterns, messages and brightness.', tags:['embedded','power'], link:'https://drive.google.com/drive/folders/1L51az6kkCP5AWyBCQG4g4Dwh9kYi7qUb?usp=drive_link' }
];
export const credentials = {
  education:[{ title:'B.E. Electronics & Automation', sub:'Sukkur IBA University, 2020 – 2024', note:'80% final grade. Thesis: Voice Controlled Mobile Robot. Fully funded merit scholarship (340 selected from 30,000+ applicants).', tags:['ai','embedded'] }],
  publication:[{ title:'Applications of Augmented Reality in Industrial Manufacturing in the Era of Industry 5.0', sub:'Co-author, International Journal of Engineering and Applied Physics, Vol. 5 (2024)', note:'Proposes a spatial AR system for real-time work instructions, safety alerts and ergonomic feedback.', tags:['research','ai'] }],
  awards:[{ title:'PEC-FYDP funding award', sub:'Pakistan Engineering Council, 2024', note:'Selected nationwide for impactful final-year projects.', tags:['research'] }],
  learning:[{ title:'McKinsey Forward, Google Project Management, Aspire Leadership Program', sub:'Certifications', note:'', tags:['ops'] }]
};
