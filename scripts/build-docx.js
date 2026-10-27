const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType, LevelFormat,
  BorderStyle, TabStopType,
} = require("docx");

const HEAD = "Noto Sans", BODY = "Carlito", SZ = 21; // 10.5pt body
const out = process.argv[2];

// "**bold**" segments inside a line
const runs = (text, size = SZ, font = BODY) =>
  text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((t) =>
    t.startsWith("**") ? new TextRun({ text: t.slice(2, -2), bold: true, size, font })
                       : new TextRun({ text: t, size, font }));

const link = (text, url) => new ExternalHyperlink({ link: url,
  children: [new TextRun({ text, style: "Hyperlink", size: SZ, font: BODY })] });

const section = (title) => new Paragraph({ keepNext: true,
  spacing: { before: 280, after: 120 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 2 } },
  children: [new TextRun({ text: title, bold: true, size: 28, font: HEAD })],
});

const bullet = (text) => new Paragraph({
  numbering: { reference: "dots", level: 0 }, spacing: { after: 30 }, children: runs(text),
});

const job = (company, roleLine, dates, bullets, stack) => [
  new Paragraph({ spacing: { before: 200 }, keepNext: true,
    children: [new TextRun({ text: company, bold: true, size: 23, font: HEAD })] }),
  new Paragraph({ keepNext: true, spacing: { after: 60 },
    tabStops: [{ type: TabStopType.RIGHT, position: 9900 }],
    children: [new TextRun({ text: roleLine, size: 18, font: HEAD }),
               new TextRun({ text: `\t${dates}`, size: 18, font: HEAD })] }),
  ...bullets.map(bullet),
  ...(stack ? [new Paragraph({ indent: { left: 720 }, spacing: { before: 40 },
    children: runs(`**Stack: ${stack}**`) })] : []),
];

const project = (title, url, tag, bullets, stack) => [
  new Paragraph({ spacing: { before: 140 }, keepNext: true, children: [new ExternalHyperlink({ link: url,
    children: [new TextRun({ text: title, bold: true, size: 23, font: HEAD, style: "Hyperlink" })] }),
    new TextRun({ text: `  ${tag}`, size: 18, font: HEAD })] }),
  ...bullets.map(bullet),
  new Paragraph({ indent: { left: 720 }, children: runs(`**Stack: ${stack}**`) }),
];

const skill = (label, items) => new Paragraph({ numbering: { reference: "dots", level: 0 }, spacing: { after: 40 },
  children: [new TextRun({ text: `${label} | `, bold: true, size: SZ, font: HEAD }),
             new TextRun({ text: items, size: SZ, font: BODY })] });

const children = [
  new Paragraph({ alignment: AlignmentType.CENTER, children: [
    new TextRun({ text: "MD Ashraful ", size: 56, font: HEAD }),
    new TextRun({ text: "Islam", bold: true, size: 56, font: HEAD })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [
    new TextRun({ text: "(+880) 1675996598 | ", size: SZ, font: BODY }),
    link("ashraful.codesmith@gmail.com", "mailto:ashraful.codesmith@gmail.com")] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: "AAAAAA", space: 6 } },
    children: [link("Github", "https://github.com/Srabon444"), new TextRun({ text: " | ", size: SZ, font: BODY }),
      link("ashraful-islam-rabby", "https://www.linkedin.com/in/ashraful-islam-rabby/"),
      new TextRun({ text: " | ", size: SZ, font: BODY }), link("www.ashraful.uk", "https://www.ashraful.uk")] }),

  section("EXPERIENCE"),
  ...job("Techzu Ichicode Pte Ltd.", "Software Engineer II | Singapore (Hybrid)", "November 2025 – Present", [
    "**ERP Platform (Team Lead):** Build **two SaaS ERP products** on SAP Business One workflows for BDO clients in Singapore and lead a team of **5 developers** on one of them; own task breakdown, technical decisions and code review for that project.",
    "**Client Management:** Primary technical contact for **2 BDO clients**; run requirement meetings directly and turn procurement, accounting and service-contract processes into specs and delivery plans.",
    "**AI-Augmented Engineering:** Built the team's AI-assisted workflow on Claude Code, with custom agents for implementation, PR review, regression checks and E2E smoke tests; now used across the team, it automated code review and cut review time by **70%+**.",
    "**Standards & Hiring:** Authored the team's reusable-code plan, the ERP testing strategy and its E2E scope; evaluate technical assessments for engineering hires.",
    "**Performance Architecture:** Replaced multi-table JOINs in the Item Master API with a two-phase paginated query and parallel sub-queries, cutting response time from **~8s to ~225ms (97%)**.",
    "**Purchasing & Finance:** Designed and delivered the Purchasing module across **6 document types**, with automated journal entries and GL determination feeding the financial statements.",
    "**Platform Engineering:** Built shared pieces the team reuses: a config-driven reporting engine, a cron scheduler with cross-replica locking, and configurable rate limiting on public endpoints.",
  ], "React.js, TypeScript, Ant Design, Node.js, Express.js, PostgreSQL, Sequelize, Docker, Claude Code"),
  ...job("Tech Analytica Limited", "Full-Stack Software Engineer | Dhaka, Bangladesh", "August 2024 – Sep 2025", [
    "**Ambufast (Project Lead):** Led end-to-end delivery of Bangladesh's largest ambulance booking platform, with Google Maps routing and the full booking → dispatch → billing → payment lifecycle.",
    "**Operations CMS:** Built the admin and call-operator CMS for bookings, payments and billing, raising operational efficiency by **40%**.",
    "**JS Green Media:** Delivered a landscaping booking platform with a dynamic form builder and admin CMS, cutting missed client inquiries by **50%**.",
    "**Performance & SEO:** Reduced API call overhead by **25%** through caching and leaner data handling; page loads **35% faster**.",
    "**Mentorship & Delivery:** Mentored a junior developer through task planning and code review; kept a **94%** on-schedule delivery rate.",
  ], "Next.js, React.js, TypeScript, Tailwind CSS, Shadcn, TanStack Query, Zustand, NestJS, PostgreSQL, Prisma, Google Maps, Docker"),
  ...job("RISIDIO", "Software Developer | London, UK (Remote, Contract)", "June 2024 – July 2024", [
    "**Codebase Overhaul:** Improved performance and readability of a Next.js codebase for a UK blockchain and digital collectibles client; cut codebase size by **15%** through Tailwind refactoring and component consolidation.",
  ]),
  ...job("GALAXY-NET BD", "Jr. Full-Stack Developer | Dhaka, Bangladesh", "Jan 2023 – Mar 2024", [
    "**Client Projects:** Built React frontends and Node.js, Express, MongoDB and Firebase APIs across multiple client projects; introduced Agile sprints that cut development cycle time by **25%**.",
  ]),

  section("PROJECTS"),
  ...project("Porashona", "https://youtu.be/xep1fDpQrZE", "AI study companion (in development)", [
    "RAG tutor for Bangladeshi Class 11–12 students over NCTB curriculum documents (pgvector); every answer cites its page and says \"not in the book\" when nothing matches.",
    "Automatic calculation checks, bring-your-own Anthropic/OpenAI/Gemini key, admin budget, usage and audit log, and a Remotion pipeline for narrated Bengali videos reviewed before publishing.",
  ], "FastAPI, PostgreSQL, pgvector, Next.js, Remotion"),
  ...project("ClickUp → Discord Notifier", "https://github.com/Srabon444/clickup-discord-notifier", "Self-hosted team automation", [
    "Turns ClickUp activity into Discord notifications with real @mentions and a weekly ticket-coverage report, saving developers **nearly 6 hours a week**.",
    "A log dashboard records every event with its delivery status and raw payload for incident review; a watchdog alerts when the webhook goes unhealthy.",
  ], "Next.js, Supabase, Discord API, ClickUp API"),
  ...project("Team Timesheet", "https://github.com/Srabon444/team-timesheet", "Internal Techzu tool", [
    "Used by **20+ users** and saves developers **140+ hours a month**: per-project timers that auto-fill the company's daily timesheet form, across Chrome extension, desktop (Tauri) and Android apps synced through Google Drive.",
  ], "Svelte, Tauri, Chrome Extension API, Google Drive API"),
  ...project("MealFlow", "https://github.com/Srabon444/meal-flow", "Internal Techzu tool", [
    "Used by **20+ users**: office meal ordering, tally, dues and cancel-approval workflow with admin and user dashboards; one build ships to web, desktop (Tauri) and Android.",
  ], "SvelteKit, Supabase, Tauri"),
  ...project("HRMS Pro", "https://github.com/Srabon444/htms-pro", "Internal HR system", [
    "Automates HR work and cuts the time it takes by **35%**: staff directory, attendance, recruitment (ATS) and KPI reporting that replaced a manual weekly report.",
  ], "SvelteKit, Supabase, Chart.js"),
  ...project("Claude Auto-Resume", "https://marketplace.visualstudio.com/items?itemName=ashraful.claude-auto-resume", "VS Code Marketplace", [
    "Published extension that resumes Claude Code chats after a usage limit resets: per-chat timers, key sending across Windows, macOS, X11 and Wayland.",
  ], "JavaScript, VS Code Extension API"),

  section("SKILLS"),
  skill("FRONT-END", "React • Next.js • TypeScript • Ant Design • Tailwind CSS • TanStack Query • Zustand • Svelte"),
  skill("BACK-END", "Node.js • Express • NestJS • FastAPI • REST APIs • Sequelize • Prisma"),
  skill("DATABASE", "PostgreSQL • pgvector • MongoDB • Redis • Supabase • Firebase"),
  skill("AI / AGENTS", "Claude Code • Codex • Cursor • Anthropic / OpenAI / Gemini APIs • MCP • RAG • Multi-agent Workflows"),
  skill("ERP DOMAIN", "SAP Business One workflows • Procurement • Journal Entries & GL Determination"),
  skill("DEVOPS", "Docker • Git • Vercel • Digital Ocean • Coolify • PM2"),

  section("EDUCATION"),
  new Paragraph({ children: [new TextRun({ text: "UNITED INTERNATIONAL UNIVERSITY (UIU) | Dhaka", bold: true, size: 23, font: HEAD })] }),
  new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: 9900 }], children: [
    new TextRun({ text: "B.Sc., Computer Science & Engineering", size: 18, font: HEAD }),
    new TextRun({ text: "\tMar 2016 – Aug 2021", size: 18, font: HEAD })] }),
];

const doc = new Document({
  styles: { default: { document: { run: { font: BODY, size: SZ } } } },
  numbering: { config: [{ reference: "dots", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 220 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 },
    margin: { top: 720, bottom: 720, left: 1000, right: 1000 } } }, children }],
});
fs.mkdirSync(require("path").dirname(out), { recursive: true });
Packer.toBuffer(doc).then((b) => fs.writeFileSync(out, b));
