# PRD: AI IT Help Desk Copilot (PowerGrid)

| | |
|---|---|
| **Version** | 0.1 (draft for team review) |
| **Date** | 13 October 2026 |
| **Team** | Ramesh Chavan, Shivani Devanekar, Srushti Gosavi, Samruddhi Suryawanshi |
| **Guide** | Prof. Sanjay Waykar, MGMCET, Dept. of Information Technology |
| **Problem statement** | SIH25195: Smart Helpdesk Ticketing Solution for IT Services (Ministry of Power) |
| **Related docs** | `DB_SCHEMA.md`, `TRD.md`, `IMPLEMENTATION_PLAN.md` (to be written) |

> How to use this file: it is a living document. Anything marked **[DECIDE]** is an open choice for the team. When the code changes scope, update the matching line here.

---

## 1. Overview

### 1.1 Problem
Employees at the organisation report IT problems through email, phone calls and messaging apps. Requests get scattered, lost or delayed. IT engineers sort and route every request by hand, and the same questions are answered again and again.

The problem statement identifies these gaps:

- No centralised platform for reporting IT issues
- Manual ticket categorisation
- Manual ticket routing
- No self-service support
- Limited analytics and reporting
- High workload for IT teams

### 1.2 Proposed solution
A web-based IT helpdesk with an AI chat assistant that uses Natural Language Processing (NLP), Retrieval-Augmented Generation (RAG), and a Large Language Model (LLM).

The NLP component processes employees' natural-language issue descriptions and predicts the relevant ticket category, with confidence-based fallback for uncertain predictions. The RAG component retrieves relevant information from the organisation's approved knowledge base and verified past resolutions using semantic search. The LLM generates responses grounded in the retrieved information and provides source references.

If the assistant cannot find sufficiently relevant information, it acknowledges the limitation and offers ticket creation. When a ticket is created, the system generates a summary, suggests a category and priority, and routes the ticket according to configured rules. Engineers can review and override AI-generated suggestions. Verified resolutions can subsequently be converted into knowledge-base drafts, subject to human approval.

### 1.3 Product vision (one sentence)
*Employees get answers in seconds, engineers receive well-formed tickets, and managers see what is happening, all in one place.*

---

## 2. Goals and success metrics

### 2.1 Goals
1. Give employees a single place to report and track IT issues.
2. Resolve common issues through self-service, without creating a ticket.
3. Remove manual categorisation and routing.
4. Give IT managers real-time visibility into volume, workload and SLA compliance.
5. Keep the knowledge base growing from real resolutions.

### 2.2 Success metrics
Targets below are **proposed starting points**. Real values come from testing on our own test set; do not quote them as achieved results.

| Metric | How we measure | Proposed target |
|---|---|---|
| Self-service resolution rate | Chats closed by the user as "solved" without a ticket / total chats | Track first; aim for 30–40% on the test set |
| Answer groundedness | Share of bot answers fully supported by the cited KB chunks (manual review of ~50–100 test questions) | 90%+ |
| Correct "I don't know" handling | Out-of-scope or unanswerable test questions where the bot declines and offers a ticket | 90%+ |
| Auto-category accuracy | Predicted vs. human-labelled category on a labelled test set | 85%+ |
| Auto-routing accuracy | Ticket sent to the correct team on the test set | 85%+ |
| SLA compliance | Tickets resolved within SLA / total tickets (dashboard) | Reported, no fixed target |
| User satisfaction | Thumbs up/down after chat or resolution | Reported, no fixed target |

---

## 3. Users and roles

| Role | Who | Main needs |
|---|---|---|
| **Employee** | Any staff member raising an IT issue | Quick answers, easy ticket creation, status visibility, no repeated explaining |
| **IT engineer** | Support staff who resolve tickets | Clear ticket summary, correct assignment, suggested fixes, easy way to record the resolution |
| **IT manager / admin** | Team lead, system administrator | Dashboard, workload balance, SLA tracking, KB approval, user and category management |

Access is **role-based**: each role sees only its own screens and data.

---

## 4. Scope

### 4.1 MVP (must build)
- Login with three roles
- AI chat assistant using RAG over the KB and resolved tickets, with source citations
- Fallback: "I couldn't find a reliable answer" leads to ticket creation
- Ticket creation (from chat or manually) with AI-generated summary, category, priority and suggested SLA
- Automatic routing to a team or engineer
- Full ticket lifecycle with status changes and comments
- SLA timers and an overdue flag
- Engineer queue and resolution notes
- KB management: upload and edit articles; approve new KB entries drafted from resolved tickets
- Analytics dashboard: ticket volume and trends, workload per engineer, SLA compliance, satisfaction
- Email notifications on key ticket events
- Thumbs up/down feedback on bot answers

### 4.2 Stretch (add only after MVP works end to end)
Pick two or three, in this order of value:
1. Duplicate and major-incident detection (group similar tickets, e.g. many "VPN down" reports into one incident with a banner)
2. Agent assist: suggested fix steps and reply drafts for the engineer, with sources
3. Knowledge-gap report: questions the bot could not answer, so the team knows which articles to write
4. Email-to-ticket (create tickets from incoming email)
5. Hindi / Marathi query support
6. Local (on-prem) LLM option to show data-sovereignty readiness
7. Screenshot understanding, chat-app channel (Teams / WhatsApp / Telegram), SLA-breach prediction

### 4.3 Out of scope (for now)
- Mobile native apps (the web UI should simply be responsive)
- Full asset / CMDB management
- Integration with real PowerGrid systems (Active Directory, SCADA/OT networks)
- Automated actions such as password reset (needs real directory integration)
- Fine-tuning or training our own models

---

## 5. Functional requirements

### 5.1 Authentication and roles
- **FR-1** Users can sign in; the system knows each user's role.
- **FR-2** Each role can only access its own screens and API routes.
- **FR-3** Admin can create users and change roles. **[DECIDE]** self-registration or admin-created accounts only.

### 5.2 AI chat assistant
- **FR-4** An employee can describe a problem in natural language.
- **FR-5** The assistant retrieves relevant KB chunks and verified past resolutions.
- **FR-6** The assistant answers **only from retrieved content** and shows its sources.
- **FR-7** If retrieval confidence is low, the assistant says so and offers to create a ticket instead of guessing.
- **FR-8** The user can mark an answer as helpful / not helpful; "not helpful" offers ticket creation.
- **FR-9** The chat conversation is saved and attached to the ticket if one is created.
- **FR-10** Personal data (names, phone numbers, IDs) is masked before text is sent to the LLM.
### 5.3 NLP, RAG and LLM processing

- **FR-11** The system shall accept IT issue descriptions written in natural language.
- **FR-12** The NLP component shall preprocess issue text and predict a ticket category from the configured categories.
- **FR-13** The system shall record the predicted category and its confidence score. Low-confidence predictions shall be flagged for user confirmation or human review.
- **FR-14** The RAG component shall convert the query into an embedding and retrieve relevant, published knowledge-base chunks and permitted past resolutions using semantic similarity.
- **FR-15** The LLM shall generate a response using the retrieved context and the employee's question. The response shall include source references where applicable.
- **FR-16** The assistant shall not present unsupported troubleshooting instructions as verified facts. If retrieval is insufficient, it shall decline to provide a definitive answer and offer ticket creation.
- **FR-17** The system shall allow users and authorised engineers to review and correct AI-generated ticket fields.
- **FR-18** The system shall evaluate category classification and retrieval quality using a labelled test set and documented evaluation metrics.

The NLP classifier, embedding model and LLM shall be replaceable through separate interfaces so that model providers can be changed without redesigning the core ticketing workflow.

### 5.4 Ticketing
- **FR-11** A ticket can be created from a chat or manually.
- **FR-12** AI generates a title/summary, category and priority, and suggests an SLA; the user or engineer can override them.
- **FR-13** Ticket statuses: `Open`, `Assigned`, `In Progress`, `Waiting for User`, `Resolved`, `Closed`, `Reopened`.
- **FR-14** Employees can view their own tickets and add comments or attachments.
- **FR-15** Engineers and admins can change status, reassign and add internal notes.
- **FR-16** An engineer must enter resolution notes when resolving a ticket.
- **FR-17** All ticket changes are written to an audit trail.

### 5.5 Routing and SLA
- **FR-18** New tickets are routed by category (and later skill and current workload) to a team or engineer.
- **FR-19** Admin can configure the category-to-team mapping.
- **FR-20** Each ticket has an SLA due time based on priority; overdue tickets are flagged and escalated.

### 5.6 Knowledge base
- **FR-21** Admin / engineers can upload or write KB articles (PDF, text, Markdown).
- **FR-22** Articles are split into chunks and indexed for search automatically.
- **FR-23** When a ticket is resolved, the system drafts a KB entry from it; an engineer or admin must **approve** before it becomes searchable.
- **FR-24** KB content can carry role / department visibility so users only retrieve what they may see.

### 5.7 Analytics and notifications
- **FR-25** Dashboard shows ticket counts by status, category and priority over time.
- **FR-26** Dashboard shows engineer workload, average resolution time and SLA compliance.
- **FR-27** Dashboard shows self-service resolution rate and satisfaction.
- **FR-28** Users receive notifications on creation, assignment, status change and resolution.

---

## 6. App flow

### 6.1 End-to-end flow (summary)

```
Employee reports issue in chat
        ↓
Assistant searches KB + past resolved tickets
        ↓
 Confident answer?
   ├─ YES → show answer with sources → user marks "solved" → chat closed
   └─ NO / "not helpful"
        ↓
AI creates ticket: summary + category + priority + SLA
        ↓
Auto-routing to team / engineer
        ↓
Engineer works the ticket → adds resolution notes → Resolved
        ↓
Draft KB entry → engineer/admin approves → added to KB
        ↓
Dashboard updates (trends, workload, SLA, satisfaction)
```
### 6.2 AI processing pipeline

1. **Input:** The employee describes an IT problem in the chat interface.
2. **NLP processing:** The system preprocesses the text and predicts a ticket category with a confidence score.
3. **Retrieval:** The query is converted into an embedding, and the system retrieves relevant, published knowledge-base chunks and permitted past resolutions.
4. **Context preparation:** The retrieved content is filtered according to access permissions and prepared as context for the LLM.
5. **Response generation:** The LLM generates an answer grounded in the retrieved content, including source references where applicable.
6. **Confidence and fallback:** If retrieval is insufficient, the assistant offers ticket creation instead of guessing.
7. **Ticket creation:** If required, the system prepares the ticket summary, category and priority. Uncertain predictions are flagged for confirmation or review.
8. **Human review:** The employee can review the ticket details, and an authorised engineer can correct the classification or priority.
9. **Learning and improvement:** Classification and retrieval performance are evaluated against a test set. Verified ticket resolutions may be drafted into the knowledge base after human approval.

The initial implementation will use pretrained embeddings and a cloud LLM API. A lightweight NLP classifier may be trained on labelled IT issue descriptions. Training a large language model from scratch is outside the MVP scope.

### 6.3 Employee flow
1. Sign in → lands on **Chat** (primary screen).
2. Describe the problem → receive answer with sources.
3. Choose **"This solved it"** (chat closes, feedback recorded) or **"Create a ticket"**.
4. Review the pre-filled ticket (summary, category, priority) → edit if needed → submit.
5. Open **My Tickets** → see status, comments, resolution; reopen if the fix did not work.
6. Rate the resolution.

### 6.4 IT engineer flow
1. Sign in → lands on **My Queue** (assigned tickets, sorted by SLA urgency).
2. Open a ticket → see AI summary, full chat history, category, priority and suggested KB articles.
3. Change status, comment (public to the user or internal).
4. Resolve with mandatory **resolution notes**.
5. Review the auto-drafted KB entry → approve, edit or reject.

### 6.5 Admin / manager flow
1. Sign in → lands on **Dashboard**.
2. View volume, trends, workload, SLA compliance, satisfaction.
3. Open **All Tickets** → filter, reassign, override priority.
4. Open **Knowledge Base** → upload/edit articles, approve pending entries.
5. Open **Settings** → manage users and roles, categories, routing rules, SLA rules.

### 6.6 Screen list

| Screen | Employee | Engineer | Admin |
|---|:-:|:-:|:-:|
| Login | ✔ | ✔ | ✔ |
| Chat assistant | ✔ | ✔ | ✔ |
| My Tickets / Ticket detail | ✔ | ✔ | ✔ |
| Engineer Queue | | ✔ | ✔ |
| All Tickets | | | ✔ |
| Knowledge Base manager + approvals | | ✔ | ✔ |
| Analytics Dashboard | | | ✔ |
| Settings (users, categories, routing, SLA) | | | ✔ |

---

## 7. Reference data (starting values)

Placeholders for the team to confirm. Real values should come from the organisation's policy.

**Categories:** Network / VPN · Hardware · Software / Applications · Email / Account / Access · Security · Other

**Priority and SLA (illustrative):**

| Priority | Meaning | First response | Resolution |
|---|---|---|---|
| Critical | Many users or an essential service down | 30 min | 4 h |
| High | One user fully blocked | 1 h | 8 h |
| Medium | Work affected but workaround exists | 4 h | 2 days |
| Low | Minor issue or request | 1 day | 5 days |

---

## 8. Non-functional requirements

- **Security:** role-based access on every API route; passwords hashed; secrets in environment variables; audit trail for ticket and KB changes.
- **Privacy:** PII masked before LLM calls; only retrieved context and the question are sent to the LLM.
- **AI safety:** answers grounded in sources; "no answer" path; guard against prompt injection in user text and KB documents; human approval before any new KB entry goes live.
- **Portability:** the LLM and embedding provider sit behind one interface so a cloud API can be swapped for a local model without changing the rest of the code.
- **Performance:** chat response ideally within a few seconds for a typical question **[DECIDE target]**.
- **Usability:** responsive web UI; clear status and SLA indicators.
- **Maintainability:** TypeScript across frontend and backend; docs kept in the repo.
- **AI reliability:** Classification confidence and retrieval relevance shall be evaluated against test data. Low-confidence predictions and insufficient retrieval results shall trigger confirmation, review or fallback.
- **AI evaluation:** Report classification accuracy, per-category precision and recall, retrieval relevance, answer groundedness and response latency where applicable. Proposed targets are not considered achieved until measured.
- **AI modularity:** NLP, embedding and LLM providers shall be isolated behind interfaces to support model replacement.
- **Resource constraints:** The initial implementation shall avoid requiring local training or inference of a large language model. Lightweight NLP and embedding workloads may run locally; cloud LLM inference will be used initially.
- **Privacy:** Apply the existing PII masking and access-control requirements before sending data to external model providers.
---

## 9. Assumptions and constraints

- We do **not** have real PowerGrid tickets or KB documents. We will use public IT-ticket datasets plus a synthetic KB we write ourselves, and say so openly in the review.
- The first version uses a cloud LLM API; a local model is a stretch goal.
- Team has frontend experience (React, Next.js) and is learning the backend, database and AI parts. Scope is chosen to match.
- Stack: Next.js frontend, Node.js + Express (TypeScript) backend, PostgreSQL with pgvector.

---

## 10. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Bot gives wrong or invented answers | Users lose trust | Grounded answers only, citations, confidence threshold, "no answer" fallback, test set |
| No real data | Hard to evaluate | Public datasets + synthetic KB; be transparent |
| Learning curve on backend and RAG | Delays | Build ticketing without AI first; one-day RAG experiment; fake `/api/chat` endpoint for early frontend work |
| Scope creep | Unfinished demo | MVP first; max 2–3 stretch features |
| Cloud LLM cost / data concerns | Budget, privacy | Free tiers during development, PII masking, local-model option later |
| Bad entries polluting the KB | Poor answers | Human approval before indexing |

---

## 11. Open questions

1. **[DECIDE]** Self-registration or admin-created accounts?
2. **[DECIDE]** Which cloud LLM provider and embedding model do we start with (cost and free-tier limits)?
3. **[DECIDE]** Which two or three stretch features do we commit to?
4. **[DECIDE]** Is the submission target a SIH round, a college review only, or both? The deadline in the problem statement (15 October 2025) has passed, so confirm the real timeline.
5. **[DECIDE]** Languages for the first demo: English only, or Hindi/Marathi as well?
6. **[DECIDE]** Which datasets will we use for tickets and KB content?

---

## 12. Change log

| Date | Version | Change |
|---|---|---|
| 13 Oct 2026 | 0.1 | First draft from review deck and team discussion |
