<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&amp;height=205&amp;color=0:020617,35:0f172a,70:164e63,100:06b6d4&amp;text=TR%E1%BA%A6N%20V%C4%82N%20HUY&amp;fontColor=e2e8f0&amp;fontSize=38&amp;fontAlignY=36&amp;stroke=22d3ee&amp;strokeWidth=1&amp;desc=Software%20Developer%20%C2%B7%20Full-Stack%20%C2%B7%20Data%20Science%20%C2%B7%20AI%20Solutions&amp;descSize=13&amp;descAlignY=56&amp;descAlign=50&amp;descColor=22d3ee&amp;animation=fadeIn" alt="Trần Văn Huy" />
</div>

<a href="https://www.tranvanhuy.io.vn" target="_blank">
  <img align="right" height="230" width="310" alt="Developer coding animation" src="https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif" />
</a>

### ✦ About Me

Hi, I'm **Trần Văn Huy** — a 3rd-year student majoring in **Data Science & Artificial Intelligence** at **Da Nang University of Technology (DUT - UD)** with a GPA of **3.5 / 4.0**.

- 💼 **Current Role:** Software Developer Intern @ **Digital Twin Group (MakeAI)**.
- 📍 **Location:** Da Nang, Vietnam.
- ⚙️ **Core Tech:** Java (Spring Boot), Next.js, React.js, Vue 3, Python (Frappe), PostgreSQL, PostGIS, WebSocket STOMP, Capacitor.
- 🤖 **AI Focus:** I build **production AI agents** (OpenClaw, LLM workflows) — async agent jobs, code-side retrieval and verification, human-in-the-loop — plus Data Science pipelines.
- 🎯 **Philosophy:** Engineering robust, scalable full-stack software systems with clean architecture, high reliability, and practical business impact.
- 🌐 **Live Portfolio:** [www.tranvanhuy.io.vn](https://www.tranvanhuy.io.vn)

<br clear="both" />

---

## ⚡ What I Build

- 🌐 **Full-Stack Web Applications** — Modern, responsive interfaces and performant architectures with Next.js, TypeScript, React.js, and Vue 3.
- ⚙️ **Scalable Backend Systems** — Clean Architecture RESTful APIs, secure auth workflows (JWT/OAuth2), and real-time STOMP WebSockets with Spring Boot and Python Frappe.
- 📱 **Cross-Platform Mobile Apps** — Hybrid applications packaged with Capacitor for seamless multi-platform deployment.
- 🗺️ **GIS & Digital Transformation** — Interactive 2D/3D spatial data platforms with PostGIS and automated statutory enterprise workflows.
- 🤖 **AI Agents & LLM Workflows** — Production agents for estimate review, document parsing/drafting and legal research, with verification and human approval.

---

## 📁 Featured Projects

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🤖 Ward/Commune-Level Public Investment Project Management System</h3>
      <p>Production system rolled out to wards and communes of <b>Da Nang city (currently Huong Tra Ward)</b>, digitizing the 10-step public investment workflow. I am the primary developer and <b>built its AI-agent layer</b> on OpenClaw.</p>
      <p>
        <code>OpenClaw</code> · <code>Agentic AI</code> · <code>LLM</code> · <code>React</code> · <code>TypeScript</code> · <code>Frappe</code> · <code>Python</code> · <code>PostgreSQL</code>
      </p>
      <ul>
        <li><b>AI estimate review</b> against a monthly price warehouse — code-side matching first, LLM only for what code can't resolve, citations verified in code</li>
        <li><b>AI cost extraction</b> from Excel workbooks, mapped onto existing cost lines; <b>AI drafting</b> of official Word forms</li>
        <li><b>Async agent jobs</b> (queue, progress, cancel, resume) shared by every AI feature, with human approval and a full audit trail</li>
        <li>Scheduled <b>legal-base discovery</b> and a <b>permission-aware data assistant</b></li>
      </ul>
      <p>
        <i>🔒 Enterprise project @ Digital Twin Group (MakeAI) — in production (source code private)</i><br />
        <a href="https://digitaltwin.huongtra.danang.gov.vn/dautucong/" target="_blank"><b>🌐 Production system (login required)</b></a>
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>🛍️ NexShop — E-Commerce & POS Platform</h3>
      <p>Full-stack omnichannel retail platform combining an online storefront with an in-person Point of Sale (POS) terminal and revenue analytics.</p>
      <p>
        <code>Next.js</code> · <code>TypeScript</code> · <code>Prisma</code> · <code>PostgreSQL</code> · <code>Google OAuth</code> · <code>Tailwind CSS</code>
      </p>
      <ul>
        <li>Next.js App Router with Server Actions & Prisma ORM</li>
        <li>POS offline-tolerant terminal & transactional stock locking</li>
        <li>Admin revenue analytics dashboard & Google OAuth authentication</li>
      </ul>
      <p>
        <a href="https://vattudongkha.io.vn" target="_blank"><b>🌐 Live Website (vattudongkha.io.vn)</b></a>
      </p>
    </td>
  </tr>
</table>

---

## 🤖 AI Agent Engineering

I build **LLM-powered agents that do real work** — not demos. Public Investment is the production system where I proved it, but the approach is general and reusable on any workflow:

| Capability | What I build |
|---|---|
| **Agent orchestration** | Long-running agent jobs behind a queue: progress, cancel, retry, resume after reload, results applied server-side |
| **Tool use & skills** | Agents that read files, call internal tools/APIs and follow reusable "skill" playbooks written for the domain |
| **Retrieval before the LLM** | Deterministic search/matching in code first, so the model sees only what it needs — cheaper, faster, reproducible |
| **Structured output & verification** | JSON-schema'd answers, numeric checks in code, citations validated against source files, unverified findings flagged |
| **Human-in-the-loop** | Approve/reject checkpoints, editable drafts, audit trail of every decision |
| **Learning from feedback** | Agents that learn the user's preferred document format from their edits |
| **Safe by design** | Agents read data through the same permission layer as the UI; results cached by content hash to avoid repeated LLM calls |

**Typical agent I can ship:** document reviewer · data/Excel extractor · report & form drafter · research/monitoring agent · natural-language data assistant — end to end, from prompt and tool design to the backend, queue and UI.

<p>
  <code>OpenClaw</code> · <code>LLM APIs</code> · <code>Prompt & Skill Design</code> · <code>Tool Calling</code> · <code>Structured Outputs</code> · <code>Python</code> · <code>Job Queues (Redis)</code> · <code>PostgreSQL</code> · <code>React / Next.js</code>
</p>

---

## 🛠️ Tech Stack

<h3 align="center">Languages</h3>
<p align="center">
  <img src="https://img.shields.io/static/v1?label=&message=Java&color=000000&style=flat&logo=openjdk&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/static/v1?label=&message=TypeScript&color=000000&style=flat&logo=typescript&logoColor=3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/static/v1?label=&message=JavaScript&color=000000&style=flat&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/static/v1?label=&message=Python&color=000000&style=flat&logo=python&logoColor=3776AB" alt="Python" />
  <img src="https://img.shields.io/static/v1?label=&message=SQL&color=000000&style=flat&logo=postgresql&logoColor=4169E1" alt="SQL" />
</p>

<h3 align="center">Backend & Frameworks</h3>
<p align="center">
  <img src="https://img.shields.io/static/v1?label=&message=Spring%20Boot&color=222222&style=flat&logo=springboot&logoColor=6DB33F" alt="Spring Boot" />
  <img src="https://img.shields.io/static/v1?label=&message=Frappe%20Framework&color=222222&style=flat&logo=frappe&logoColor=0089FF" alt="Frappe" />
  <img src="https://img.shields.io/static/v1?label=&message=Node.js&color=222222&style=flat&logo=nodedotjs&logoColor=5FA04E" alt="Node.js" />
  <img src="https://img.shields.io/static/v1?label=&message=REST%20APIs&color=222222&style=flat&logo=postman&logoColor=FF6C37" alt="REST APIs" />
  <img src="https://img.shields.io/static/v1?label=&message=WebSocket%20STOMP&color=222222&style=flat&logo=websocket&logoColor=62B5E5" alt="WebSocket" />
</p>

<h3 align="center">Frontend & Mobile</h3>
<p align="center">
  <img src="https://img.shields.io/static/v1?label=&message=Next.js&color=222222&style=flat&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/static/v1?label=&message=React.js&color=222222&style=flat&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/static/v1?label=&message=Vue%203&color=222222&style=flat&logo=vuedotjs&logoColor=4FC08D" alt="Vue 3" />
  <img src="https://img.shields.io/static/v1?label=&message=Capacitor&color=222222&style=flat&logo=capacitor&logoColor=119EFF" alt="Capacitor" />
  <img src="https://img.shields.io/static/v1?label=&message=Tailwind%20CSS&color=222222&style=flat&logo=tailwindcss&logoColor=06B6D4" alt="Tailwind CSS" />
</p>

<h3 align="center">Databases & Geospatial</h3>
<p align="center">
  <img src="https://img.shields.io/static/v1?label=&message=PostgreSQL&color=222222&style=flat&logo=postgresql&logoColor=4169E1" alt="PostgreSQL" />
  <img src="https://img.shields.io/static/v1?label=&message=PostGIS&color=222222&style=flat&logo=postgresql&logoColor=336791" alt="PostGIS" />
  <img src="https://img.shields.io/static/v1?label=&message=MySQL&color=222222&style=flat&logo=mysql&logoColor=4479A1" alt="MySQL" />
  <img src="https://img.shields.io/static/v1?label=&message=SQL%20Server&color=222222&style=flat&logo=microsoftsqlserver&logoColor=CC292B" alt="SQL Server" />
  <img src="https://img.shields.io/static/v1?label=&message=Redis&color=222222&style=flat&logo=redis&logoColor=FF4438" alt="Redis" />
</p>

<h3 align="center">DevOps, AI & Tools</h3>
<p align="center">
  <img src="https://img.shields.io/static/v1?label=&message=Docker&color=222222&style=flat&logo=docker&logoColor=2496ED" alt="Docker" />
  <img src="https://img.shields.io/static/v1?label=&message=Git&color=222222&style=flat&logo=git&logoColor=F05032" alt="Git" />
  <img src="https://img.shields.io/static/v1?label=&message=GitHub%20Actions&color=222222&style=flat&logo=githubactions&logoColor=2088FF" alt="GitHub Actions" />
  <img src="https://img.shields.io/static/v1?label=&message=Linux&color=222222&style=flat&logo=linux&logoColor=FCC624" alt="Linux" />
  <img src="https://img.shields.io/static/v1?label=&message=Agentic%20AI&color=222222&style=flat&logo=openai&logoColor=10A37F" alt="Agentic AI" />
  <img src="https://img.shields.io/static/v1?label=&message=OpenClaw%20Agents&color=222222&style=flat&logo=openai&logoColor=10A37F" alt="OpenClaw Agents" />
  <img src="https://img.shields.io/static/v1?label=&message=LLM%20Workflows&color=222222&style=flat&logo=openai&logoColor=10A37F" alt="LLM Workflows" />
</p>

---

## 🧠 Academic Specialization & Focus

- 📊 **Data Science & ML:** Exploratory Data Analysis, Pandas, NumPy, Scikit-learn, and Deep Learning models.
- 🤖 **Agentic AI & Automation:** Agent job orchestration, tool calling, hybrid rule-based + LLM pipelines, and automated statutory process workflows.
- 🏗️ **Software Engineering:** Scalable full-stack systems (Spring Boot, React, Next.js, PostgreSQL), Clean Architecture, and Transactional Systems.

---

## 📊 GitHub Analytics

<div align="center">
  <img width="49.5%" src="./metrics-streak.svg" alt="GitHub contribution streak" /><img width="49.5%" src="./metrics-languages.svg" alt="Most used programming languages" />
</div>

## 🐍 Contribution Journey

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./github-contribution-grid-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="./github-contribution-grid-snake.svg" />
    <img width="100%" src="./github-contribution-grid-snake.svg" alt="Contribution grid snake animation" />
  </picture>
</div>

---

## 🤝 Connect with Me

<p align="center">
  <a target="_blank" href="https://www.tranvanhuy.io.vn"><img width="38" height="38" src="https://img.icons8.com/doodle/40/000000/domain.png" alt="Portfolio" /></a>&nbsp;&nbsp;
  <a target="_blank" href="https://www.linkedin.com/in/huy-tran-van-5753b13b4"><img width="38" height="38" src="https://img.icons8.com/doodle/40/000000/linkedin--v2.png" alt="LinkedIn" /></a>&nbsp;&nbsp;
  <a target="_blank" href="https://github.com/tranvanhuy-hichan"><img width="38" height="38" src="https://img.icons8.com/doodle/40/000000/github--v1.png" alt="GitHub" /></a>&nbsp;&nbsp;
  <a target="_blank" href="https://facebook.com/tranvanhuy260306"><img width="38" height="38" src="https://img.icons8.com/doodle/40/000000/facebook-new.png" alt="Facebook" /></a>&nbsp;&nbsp;
  <a href="mailto:tranvanhuy064206@gmail.com"><img width="38" height="38" src="https://img.icons8.com/doodle/40/000000/gmail-new.png" alt="Email" /></a>
</p>

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=tranvanhuy-hichan&amp;label=Profile%20views&amp;color=0891b2&amp;style=flat-square" alt="Profile views" />
</div>

<br />

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=85&section=footer&color=0:0891b2,50:0f172a,100:020617&animation=fadeIn" alt="Footer wave" />
