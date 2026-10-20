"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, ArrowLeft, ArrowUp, Bot, BookOpen, Check, ChevronRight, CircleCheck, Clock3, Download, FileText, MessageCircle, Network, RotateCcw, ShieldCheck, SlidersHorizontal, UserRound, Zap } from "lucide-react";
import EmployeeLayout from "./EmployeeLayout.jsx";
import KnowledgeSource from "./KnowledgeSource.jsx";
import StatusBadge from "./StatusBadge.jsx";

const initialTimeline = [
  { name: "PowerGrid Copilot AI", tag: "Auto-Triage", time: "10:14 AM", icon: Bot, text: "Analyzed crash logs from chat session #CHAT-8831. Detected MTU Packet Drop signature on tunnel adapter. Escalated to NetOps Tier-2 queue with diagnostic snapshot." },
  { name: "Rajesh Kumar", tag: "NetOps Tier-2", time: "10:28 AM", icon: UserRound, text: "Ticket acknowledged. Replicated packet fragmentation on gateway cluster. Lowering gateway tunnel MTU from 1500 to 1380 to accommodate double IPSec encapsulation." },
  { name: "Priya Sharma", tag: "Reporter", time: "10:42 AM", icon: UserRound, text: "Testing the new gateway tunnel profile now. SAP client initialized without timing out on handshake! Can you verify if the persistent keepalive flag is active?" },
  { name: "Rajesh Kumar", tag: "Fix Deployed", time: "10:55 AM", icon: Check, text: "Keepalive enabled (interval: 30s). Applied dynamic clamping across all US-East VPN concentrators. Marking as resolved for reporter verification." },
];

export default function TicketDetailView({ ticketId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [notice, setNotice] = useState("");
  const [resolved, setResolved] = useState(false);
  const [timeline, setTimeline] = useState(initialTimeline);

  function submitComment(event) {
    event.preventDefault();
    if (!comment.trim()) return;
    setTimeline((entries) => [...entries, { name: "Priya Sharma", tag: "You", time: "Now", icon: UserRound, text: comment.trim() }]);
    setComment("");
    setNotice("Your comment was added to the activity.");
  }

  return (
    <EmployeeLayout contentClassName="page-content-wide ticket-detail-page">
      <div className="ticket-breadcrumbs"><Link href="/tickets">Tickets</Link><ChevronRight /><Link href="/tickets">My Tickets</Link><ChevronRight /><strong>#{ticketId}</strong><span className="pg-chip pink">P1 · High</span><StatusBadge status={resolved ? "resolved" : "in-progress"}>{resolved ? "Resolved" : "In Progress"}</StatusBadge><span className="pg-chip"><Clock3 />2h 45m remaining · On Track</span></div>
      <div className="ticket-detail-actions"><Link className="pg-button" href="/tickets"><ArrowLeft />Back to tickets</Link><button className="pg-button" onClick={() => setNotice("Sharing is available when accounts are connected.")} type="button">Share</button><button className="pg-button primary" onClick={() => setNotice("You are following this ticket.")} type="button">Following</button></div>
      <section className="ticket-hero"><div className="ticket-hero-main"><div className="ticket-hero-eyebrow">Network Operations &amp; Access <span>•</span> Reported 45m ago via Copilot Auto-Escalate</div><h1 className="ticket-hero-title">GlobalProtect VPN SSL Handshake Timeout on Internal ERP</h1><div className="ticket-hero-meta"><span className="reporter-avatar">PS</span><span>Reporter: <strong>Priya Sharma</strong> (Staff Frontend Engineer)</span><span>·</span><span>Target Cluster: <span className="mono-chip">erp-prd-us-east</span></span></div></div><div className="triage-box"><span>Triage level</span><strong><ShieldCheck />Tier-2 Active Patch</strong></div></section>
      {notice && <p className="inline-notice" role="status">{notice}<button onClick={() => setNotice("")} type="button" aria-label="Dismiss">×</button></p>}
      <div className="ticket-detail-grid">
        <div className="pg-stack">
          <section className="pg-panel issue-card"><div className="issue-card-heading"><h2><span className="square-icon"><FileText /></span>Original Issue &amp; Diagnostics</h2><span className="pg-chip">System Payload</span></div><p className="issue-description">Engineers attempting to authenticate into the internal staging SAP and Oracle ERP gateway via GlobalProtect 6.2 receive recurring error: <code className="error-code">SSL_ERROR_SYSCALL: Connection reset by peer after ClientHello (1466 bytes)</code>. Connection drops continuously after exactly 18 seconds.</p><div className="attachment-row"><div className="attachment-file"><FileText /><span><strong>vpn_error_log.txt</strong><span>14.2 KB · Dump captured by Local Daemon v4.11</span></span></div><button className="pg-button" onClick={() => setNotice("The sample attachment is not available in this preview.")} type="button"><Download />Download</button></div></section>

          <section className="pg-panel resolution-card"><div className="resolution-top"><span className="round-marker"><CircleCheck /></span><div><h2>Resolution Verification</h2><p className="pg-card-copy">Engineer deployed the payload patch. Please confirm stability.</p></div><span className="pg-chip">Awaiting Confirmation</span></div><div className="rating-row"><div><strong>Rate Copilot &amp; Ops Speed</strong><span>How quickly did this MTU hotfix unblock your workflow?</span></div><div className="rating-stars" role="group" aria-label="Rate support experience">{[1, 2, 3, 4, 5].map((value) => <button aria-label={`${value} stars`} aria-pressed={rating === value} key={value} onClick={() => setRating(value)} type="button">{value <= rating ? "★" : "☆"}</button>)}</div></div><div className="resolution-actions"><button className="pg-button primary" onClick={() => { setResolved(true); setNotice("Resolution confirmed. Thank you for helping improve support."); }} type="button"><CircleCheck />Confirm Resolution &amp; Close</button><button className="pg-button" onClick={() => setNotice("This request has been flagged for reopening.")} type="button"><RotateCcw />Request Reopen</button></div></section>

          <section className="pg-panel timeline"><div className="timeline-heading"><h2><Activity />Activity &amp; Resolution Timeline</h2><span className="pg-muted">{timeline.length} Events Recorded</span></div><div className="timeline-list">{timeline.map(({ name, tag, time, icon: Icon, text }, index) => <article className="timeline-entry" key={`${time}-${index}`}><span className="timeline-icon"><Icon /></span><div className="timeline-content"><header><span><strong>{name}</strong><span className="pg-chip">{tag}</span></span><time>{time}</time></header><p>{text}</p></div></article>)}</div></section>

          <form className="pg-panel public-comment" onSubmit={submitComment}><div className="issue-card-heading"><h2><MessageCircle />Public Comment</h2><span className="pg-muted">Markdown supported</span></div><textarea aria-label="Write a public comment" onChange={(event) => setComment(event.target.value)} placeholder="Type your reply to NetOps or add diagnostic context..." value={comment} /><div className="public-comment-actions"><button className="pg-button primary" disabled={!comment.trim()} type="submit">Send Reply <ArrowUp /></button></div></form>
        </div>

        <aside className="pg-stack" aria-label="Ticket information">
          <section className="pg-panel telemetry-card"><div className="diagnostic-header"><h3>Ticket Telemetry</h3><SlidersHorizontal /></div><div className="telemetry-owner"><span className="reporter-avatar mauve">RK</span><span><strong>Rajesh Kumar</strong><small>NetOps Tier-2 Specialist</small></span><span className="online-indicator" /></div><Telemetry label="Affected Gateway" value="gw-us-east.pg.internal" /><Telemetry label="Impact Scope" value="ERP & Staging Cluster" /><Telemetry label="SLA Target Deadline" value="13:00 EST (98% margin)" /><Telemetry label="Origination" value="Copilot Self-Service Session" /><button className="pg-button full-width" onClick={() => setNotice("Audit log will be available when ticket services are connected.")} type="button"><Clock3 />View Audit Log</button></section>
          <section className="pg-panel diagnostics-card"><div className="diagnostic-header"><h3><Zap />AI Diagnostics</h3><span className="pg-chip">94% Confidence</span></div><span className="summary-label">Identified root cause</span><strong>MTU Packet Fragmentation on IPSec Wrapper</strong><p>The ERP server&apos;s TCP MSS exceeded tunnel threshold, prompting silent drops during the SSL client certificate exchange.</p><Link className="diagnostic-session" href="/assistant"><Zap /><span><strong>Session #CHAT-8831</strong><small>Open Chat</small></span><ChevronRight /></Link></section>
          <section className="pg-panel verified-card"><div className="diagnostic-header"><h3><BookOpen />Verified Runbooks</h3><span className="pg-chip green">Automated</span></div><VerifiedArticle id="KB-4029" match="96% Match" title="Configuring MTU Clamping for Palo Alto GlobalProtect" /><VerifiedArticle id="KB-3180" match="81% Match" title="SAP ERP High-Availability Gateway Failover Procedures" /><KnowledgeSource href="/knowledge-base">Browse verified knowledge base</KnowledgeSource></section>
        </aside>
      </div>
    </EmployeeLayout>
  );
}

function Telemetry({ label, value }) {
  return <div className="telemetry-row"><span>{label}</span><strong>{value}</strong></div>;
}

function VerifiedArticle({ id, match, title }) {
  return <Link className="verified-article" href="/knowledge-base"><span className="pg-chip lavender">{id}</span><span>{match}</span><strong>{title}</strong><span>Updated 3 days ago · 4 min read</span></Link>;
}