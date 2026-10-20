"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowDownToLine, ArrowRight, Bot, Check, ChevronLeft, ChevronRight, CircleAlert, Plus, Printer, Search, ShieldCheck, Ticket, Wifi, Zap } from "lucide-react";
import EmployeeLayout from "../../components/EmployeeLayout.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";

const starterTickets = [
  { id: "PG-9421", title: "GlobalProtect VPN SSL Handshake Timeout", description: "Gateway gateway.powergrid.internal · macOS 14.4.1", category: "Network / VPN", priority: "P2 High", status: "In Progress", updated: "12 min ago" },
  { id: "PG-9410", title: "Docker Desktop WSL2 Memory Limit Increase (16GB)", description: "Requested approval for workload environment", category: "Software & Apps", priority: "P3 Medium", status: "In Progress", updated: "1 hr ago" },
  { id: "PG-9388", title: "SAP S/4 HANA Client Crash on Memory Allocation", description: "Exit code 0xC0000017 during mass invoice export", category: "ERP Solutions", priority: "P1 Critical", status: "Waiting for You", updated: "3 hrs ago" },
  { id: "PG-9204", title: "Replacement Ergonomic Keyboard", description: "Delivered · Track #RF-981204", category: "Hardware", priority: "P4 Low", status: "Resolved", updated: "Yesterday" },
];

const filters = ["All (18)", "In Progress (2)", "Waiting for You (1)", "Resolved (15)"];

export default function TicketsPage() {
  const [tickets] = useState(starterTickets);
  const [activeFilter, setActiveFilter] = useState("All (18)");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const visibleTickets = useMemo(() => tickets.filter((ticket) => {
    const matchesQuery = `${ticket.id} ${ticket.title} ${ticket.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = activeFilter === "All (18)" || ticket.status === activeFilter.replace(/ \(.*\)/, "");
    return matchesQuery && matchesStatus;
  }), [activeFilter, query, tickets]);

  function exportTickets() {
    const csv = ["Ticket,Subject,Category,Priority,Status,Updated", ...visibleTickets.map((ticket) => `${ticket.id},"${ticket.title}","${ticket.category}","${ticket.priority}","${ticket.status}","${ticket.updated}"`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "powergrid-support-tickets.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <EmployeeLayout contentClassName="page-content-wide tickets-page">
      <div className="pg-kicker"><span className="pg-kicker-pill">● Employee Support Portal</span><span>Updated 3 min ago</span></div>
      <div className="pg-heading-row"><div><h1 className="pg-title">Your Support Tickets &amp; Requests</h1></div><div className="ticket-actions"><button className="pg-button" onClick={exportTickets} type="button"><ArrowDownToLine />Export CSV</button><button className="pg-button primary" onClick={() => setNotice("Ticket creation is ready to connect to your support API.")} type="button"><Plus />Create New Ticket</button></div></div>
      {notice && <p className="inline-notice" role="status">{notice}<button onClick={() => setNotice("")} type="button" aria-label="Dismiss">×</button></p>}
      <div className="ticket-tabs" role="group" aria-label="Filter tickets">{filters.map((filter) => <button aria-pressed={activeFilter === filter} className={`ticket-tab${activeFilter === filter ? " active" : ""}`} key={filter} onClick={() => setActiveFilter(filter)} type="button">{filter}</button>)}</div>
      <section className="ticket-summary" aria-label="Ticket summary">
        <article className="summary-card"><span className="summary-label">Ticket volume</span><div className="summary-value">18</div><div className="summary-description">Total tickets filed</div><Ticket className="summary-watermark" /></article>
        <article className="summary-card pink"><span className="summary-label">Active issues</span><div className="summary-value">3 <small>in queue</small></div><div className="summary-description">Awaiting your confirmation</div><span className="summary-note">● Action Required: Docker WSL2</span></article>
        <article className="summary-card beige"><span className="summary-label">Avg resolution</span><div className="summary-value">3.2 <small>hrs</small></div><div className="summary-description">Average resolution time</div><span className="summary-note">SLA compliance <strong>100% On-Time</strong></span></article>
        <article className="summary-card yellow"><span className="summary-label">Copilot auto-fixed</span><div className="summary-value">12 <small>issues (67%)</small></div><div className="summary-description">Zero IT human intervention</div><span className="summary-note">↗ Saved ~18.5 engineering hrs</span></article>
      </section>
      <div className="tickets-workspace">
        <section className="pg-panel ticket-register">
          <div className="ticket-register-heading"><div><h2>Ticket Register</h2><p className="pg-card-copy">Real-time status synced with IT Service Desk &amp; SRE telemetry</p></div><label className="ticket-table-search"><Search /><input aria-label="Search tickets" onChange={(event) => setQuery(event.target.value)} placeholder="Filter tickets..." value={query} /></label></div>
          <div className="table-scroll"><table className="ticket-table"><thead><tr><th>Ticket ID &amp; Subject</th><th>Category</th><th>Priority</th><th>Status</th><th>Updated</th></tr></thead><tbody>{visibleTickets.map((ticket) => <tr key={ticket.id}><td className="ticket-subject"><Link className="ticket-link" href={`/tickets/${ticket.id}`}>#{ticket.id}</Link><span className="ticket-subject-title">{ticket.title}</span><span className="ticket-subject-meta">{ticket.description}</span></td><td><span className="pg-chip">{ticket.category}</span></td><td><span className={`priority-chip ${ticket.priority.split(" ")[0].toLowerCase()}`}>{ticket.priority}</span></td><td><StatusBadge status={ticket.status === "Resolved" ? "resolved" : ticket.status === "Waiting for You" ? "waiting" : "in-progress"}>{ticket.status}</StatusBadge></td><td className="pg-muted">{ticket.updated}</td></tr>)}</tbody></table>{visibleTickets.length === 0 && <p className="table-empty">No tickets match this filter.</p>}</div>
          <div className="ticket-pagination"><span>Showing 1 to {visibleTickets.length} of 18 tickets</span><div className="pagination-controls"><button aria-label="Previous page" type="button"><ChevronLeft /></button><button className="active" type="button">1</button><button type="button">2</button><button type="button">3</button><button aria-label="Next page" type="button"><ChevronRight /></button></div></div>
        </section>
        <aside className="pg-stack" aria-label="Ticket insights">
          <section className="pg-panel diagnostic-panel"><div className="diagnostic-header"><h3><Bot />Copilot Live Diagnostics</h3><span className="pg-chip yellow">AI Active</span></div><div className="diagnostic-body"><h4>Automated log analysis <span>Confidence 96%</span></h4><p>Identified TLS certificate pinning mismatch following Friday&apos;s root cert rotation in VPN Cluster-04.</p><div className="diagnostic-tags"><span className="pg-chip">KB-4091</span><span className="pg-chip">Hotfix script ready</span></div></div><div className="diagnostic-actions"><button className="pg-button primary" onClick={() => setNotice("Local preview: fix application will be connected to the support service.")} type="button"><Zap />Apply Local Cert Fix via Copilot</button><button className="pg-button" onClick={() => setNotice("Diagnostic logs are not connected in this frontend preview.")} type="button">View Diagnostic Log Run</button></div></section>
          <section className="pg-panel decision-panel pink"><div className="diagnostic-header"><div><span className="summary-label">Pending decision</span><h3>Docker Memory Allocation</h3></div><CircleAlert /></div><p className="pg-card-copy">Engineer Ananya Roy configured 16GB RAM limit for your WSL2 container. Please confirm if host laptop has restarted.</p><div className="decision-actions"><button className="pg-button primary" onClick={() => setNotice("Your confirmation will be sent once ticket services are connected.")} type="button"><Check />Confirm &amp; Close</button><button className="pg-button" onClick={() => setNotice("More memory can be requested through your IT team.")} type="button">Need More RAM</button></div></section>
          <section className="pg-panel quick-fixes-panel"><h3 className="pg-card-title">Self-Service Quick Fixes</h3><QuickFix icon={Wifi} title="Corporate Wi-Fi 802.1x Passcode" detail="Instant automated refresh" /><QuickFix icon={ShieldCheck} title="Okta / 2FA Device Re-Enroll" detail="Self-serve QR code generator" /><QuickFix icon={Printer} title="Floor 4 Secure Badge Printer" detail="Driver setup script (macOS/Win)" /></section>
        </aside>
      </div>
    </EmployeeLayout>
  );
}

function QuickFix({ icon: Icon, title, detail }) {
  return <div className="quick-fix"><span className="quick-fix-icon"><Icon aria-hidden="true" /></span><span><strong>{title}</strong><span>{detail}</span></span><ArrowRight aria-hidden="true" /></div>;
}