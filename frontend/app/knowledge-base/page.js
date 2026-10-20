"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Bot, BriefcaseBusiness, ChevronRight, Clock3, Database, KeyRound, Laptop, LifeBuoy, Mail, Network, Plus, Printer, Search, ShieldCheck, ThumbsUp, Wifi, Zap } from "lucide-react";
import EmployeeLayout from "../../components/EmployeeLayout.jsx";

const categories = ["All Guides", "Network & VPN", "SAP / ERP", "Hardware", "Security & IAM"];
const guides = [
  { id: "KB-4029", category: "Network & VPN", reading: "3 min read", title: "Resolving GlobalProtect VPN SSL Handshake & MTU Drops", description: "Fixes unexpected session drops when connecting from remote macOS devices.", score: "98% Helpful" },
  { id: "KB-3180", category: "SAP / ERP", reading: "5 min read", title: "SAP S/4 HANA Memory Allocation Fix for macOS & Win11", description: "Step-by-step memory buffer enlargement for thick client instances.", score: "95% Helpful" },
  { id: "KB-2156", category: "Security & IAM", reading: "2 min read", title: "Multi-Factor Authentication (Okta / PowerGrid IAM) Setup", description: "Reset your FIDO2 or TOTP token, transfer Okta Verify to a new device.", score: "99% Helpful" },
];

const departments = [
  { icon: Network, title: "Network & Remote Access", count: "42 Guides", description: "Cisco AnyConnect, GlobalProtect, Substation APs, DNS configs." },
  { icon: Database, title: "Software & ERP", count: "89 Guides", description: "SAP S/4, Oracle Utilities, AutoCAD Grid, Tableau licenses." },
  { icon: Laptop, title: "Hardware & Peripherals", count: "31 Guides", description: "ThinkPad rugged field devices, monitors, dock stations, printers." },
  { icon: KeyRound, title: "Identity & Access", count: "57 Guides", description: "Single Sign-On, Active Directory, role elevation, smartcards." },
  { icon: Mail, title: "Email & M365", count: "24 Guides", description: "Exchange distribution lists, SharePoint teams, Teams governance." },
  { icon: ShieldCheck, title: "Cybersecurity & Zero-Trust", count: "66 Guides", description: "Phishing simulations, incident escalations, USB drive policies." },
];

export default function KnowledgeBasePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Guides");
  const [notice, setNotice] = useState("");
  const filteredGuides = useMemo(() => guides.filter((guide) => {
    const matchesQuery = `${guide.title} ${guide.description} ${guide.id}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All Guides" || guide.category === category;
    return matchesQuery && matchesCategory;
  }), [category, query]);

  return (
    <EmployeeLayout contentClassName="page-content-wide knowledge-page">
      <div className="pg-kicker"><span className="pg-kicker-pill">● Knowledge Hub v4.2</span><span>Updated 12m ago</span></div>
      <div className="pg-heading-row knowledge-heading"><div><h1 className="pg-title">Knowledge Base &amp; Runbook Library</h1><p className="pg-subtitle">Search 2,400+ verified PowerGrid IT guides, step-by-step solutions, and auto-approved runbooks for rapid field &amp; office operations.</p></div><div className="pg-actions"><button className="pg-button primary" onClick={() => setNotice("Guide submission is available to approved maintainers.")} type="button"><ShieldCheck />Submit Guide</button><button className="pg-icon-button" aria-label="Saved guides" title="Saved guides" type="button"><BookOpen /></button><button className="pg-icon-button" aria-label="Recently viewed" title="Recently viewed" type="button"><Clock3 /></button></div></div>
      {notice && <p className="inline-notice" role="status">{notice}<button onClick={() => setNotice("")} type="button" aria-label="Dismiss">×</button></p>}
      <section className="knowledge-search-panel" aria-label="Search knowledge base"><div className="knowledge-search-row"><label className="knowledge-search"><Search /><input aria-label="Search verified guides" onChange={(event) => setQuery(event.target.value)} placeholder="Describe your technical issue, error code (e.g. GlobalProtect VPN)..." value={query} /></label><nav className="knowledge-filters" aria-label="Filter guides">{categories.map((item) => <button aria-pressed={category === item} className={`knowledge-filter${category === item ? " active" : ""}`} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}</nav></div><div className="trending-tags"><strong>↗ TRENDING:</strong><a href="#guides">#GlobalProtect-v6</a><a href="#guides">#Substation-SCADA-Pass</a><a href="#guides">#Outlook-M365-OAuth</a><a href="#guides">#MacBook-M3-Drivers</a></div></section>
      <section className="knowledge-metrics" aria-label="Knowledge base metrics"><Metric label="System corpus" value="2,418" note="Verified PowerGrid Runbooks" extra="+14 this wk" /><Metric label="Automation rate" value="96.8%" note="First-Contact Self-Resolve" extra="Top Tier" /><Metric label="Resolution speed" value="18 min" note="Avg Resolution (MTTR)" extra="-7 min YoY" /><Metric label="Integrations" value="Live Sync" note="Jira Service Desk & Confluence" extra="●" /></section>
      <div className="knowledge-main-grid">
        <div>
          <section id="guides"><div className="guide-section-heading"><h2><span className="section-dot" />Popular &amp; Frequently Accessed Guides</h2><a href="#departments">Browse all 180 trending <ArrowRight /></a></div><div className="guide-grid">{filteredGuides.map((guide, index) => <GuideCard guide={guide} key={guide.id} index={index} onSelect={() => setNotice(`${guide.id} is verified and ready to open from the connected knowledge service.`)} />)}{filteredGuides.length === 0 && <p className="table-empty">No guides match this search.</p>}</div></section>
          <section id="departments" className="department-section"><div className="guide-section-heading"><h2><span className="section-dot gold" />Department Portals &amp; Workspaces</h2><span className="pg-muted">6 Service Disciplines</span></div><div className="department-grid">{departments.map(({ icon: Icon, ...department }) => <DepartmentCard key={department.title} icon={Icon} {...department} />)}</div></section>
        </div>
        <aside className="pg-stack" aria-label="Copilot tools">
          <section className="pg-panel copilot-assist-card"><div className="diagnostic-header"><h3><Bot />Copilot Live Assistant</h3><span className="online-indicator" /></div><span className="pg-card-copy">Real-time LLM Runbook Agent</span><div className="copilot-quote">“Hello Olivia! I detected 2 pending software patches for your Dev Rugged 5450. Would you like me to execute the silent updater runbook now?”</div><div className="assist-actions"><button className="pg-button primary" onClick={() => setNotice("Patch execution is not connected in this frontend preview.")} type="button">Run Silent Patch</button><button className="pg-button" onClick={() => setNotice("Reminder saved for this preview session.")} type="button">Remind later</button></div><Link className="ask-copilot-link" href="/assistant">Ask Copilot a question...<span><ArrowRight /></span></Link></section>
          <section className="pg-panel auto-actions-card"><div className="diagnostic-header"><h3>Auto-Approved Actions</h3><span className="pg-muted">1-click execute</span></div><QuickAction icon={Wifi} title="Flush Active Directory Token" detail="Re-sync SSO permissions" /><QuickAction icon={Zap} title="Substation Wi-Fi Re-enroll" detail="PowerGrid Field-Secure v2" /><QuickAction icon={Printer} title="Auto-Map Nearest Badge Printer" detail="Floor 3 West Wing HQ" /></section>
          <section className="lead-card"><span className="lead-avatar">DR</span><div><small>Lead Contributor</small><strong>Dr. Olivia Vance</strong><span>Senior SCADA Reliability Eng</span></div><b>48<br /><small>Guides</small></b></section>
        </aside>
      </div>
      <section className="custom-assist-banner"><div className="custom-assist-mark"><LifeBuoy /></div><div><span>Need custom assistance?</span><h2>Can&apos;t find what you&apos;re looking for?</h2><p>Our automated triage can cross-reference enterprise logs or seamlessly escalate to a human-duty PowerGrid Level 3 engineer within minutes.</p></div><div className="pg-actions"><Link className="pg-button pink-action" href="/assistant"><Bot />Ask AI Copilot</Link><Link className="pg-button" href="/tickets"><Plus />Create a Support Ticket</Link></div></section>
    </EmployeeLayout>
  );
}

function Metric({ label, value, note, extra }) { return <article className="knowledge-metric"><div className="knowledge-metric-top"><span className="knowledge-metric-label">{label}</span><span className="pg-chip">{extra}</span></div><div className="knowledge-metric-value">{value}</div><div className="knowledge-metric-note">{note}</div></article>; }
function GuideCard({ guide, index, onSelect }) { return <article className="guide-card"><div className="guide-card-top"><span className={`pg-chip ${index === 0 ? "yellow" : index === 1 ? "pink" : "green"}`}>{guide.category}</span><span className="read-time"><Clock3 />{guide.reading}</span></div><button className="guide-title-button" onClick={onSelect} type="button">{guide.title}</button><p>{guide.description}</p><div className="guide-card-footer"><span><ThumbsUp />{guide.score}</span><button aria-label={`Open ${guide.title}`} onClick={onSelect} type="button"><ArrowUpRight /></button></div></article>; }
function DepartmentCard({ icon: Icon, title, count, description }) { return <article className="department-card"><span className="department-icon"><Icon /></span><span className="pg-chip">{count}</span><h3>{title}</h3><p>{description}</p><Link href="/knowledge-base">Explore Portal <ArrowRight /></Link></article>; }
function QuickAction({ icon: Icon, title, detail }) { return <div className="quick-fix"><span className="quick-fix-icon"><Icon /></span><span><strong>{title}</strong><span>{detail}</span></span><ChevronRight /></div>; }