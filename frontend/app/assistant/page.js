"use client";

import { useState } from "react";
import AssistantResponse from "../../components/AssistantResponse.jsx";
import ChatComposer from "../../components/ChatComposer.jsx";
import ChatMessage from "../../components/ChatMessage.jsx";
import EmployeeLayout from "../../components/EmployeeLayout.jsx";
import { Download, Plus, Zap } from "lucide-react";

export default function AssistantPage() {
  const [messages, setMessages] = useState([]);
  const [resolved, setResolved] = useState([]);

  function startNewChat() {
    setMessages([]);
    setResolved([]);
  }

  function handleSend(message) {
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", name: "Priya Patel", time: "Now", content: message },
      {
        id: `preview-${Date.now()}`,
        role: "assistant",
        time: "Now",
        summary: "Your message is in this local preview. Connect the support API and approved knowledge base to get issue-specific guidance and verified sources.",
        preview: true,
      },
    ]);
  }

  function exportTranscript() {
    const transcript = messages.map((message) => `${message.name || "PowerGrid Copilot"} (${message.time})\n${message.content || message.summary}`).join("\n\n");
    const file = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const download = document.createElement("a");
    download.href = url;
    download.download = "powergrid-copilot-transcript.txt";
    download.click();
    URL.revokeObjectURL(url);
  }

  return (
    <EmployeeLayout contentClassName="assistant-page" hideSearch>
      <div className="pg-kicker">
        <span className="pg-kicker-pill">● Active &amp; Grounded to Verified IT Knowledge</span>
        <span>Session #PG-8821</span>
      </div>
      <div className="pg-heading-row">
        <div>
          <h1 className="pg-title">AI Assistant Copilot</h1>
          <p className="pg-subtitle">Autonomous IT troubleshooting and verified engineering workflow remediation.</p>
        </div>
        <div className="pg-actions">
          <button className="pg-button" onClick={exportTranscript} type="button"><Download aria-hidden="true" />Export Transcript</button>
          <button className="pg-button primary" onClick={startNewChat} type="button"><Plus aria-hidden="true" />New Chat</button>
        </div>
      </div>

      <section aria-label="Conversation with PowerGrid Copilot" className="assistant-transcript" aria-live="polite">
        {messages.length === 0 ? (
          <div className="new-chat-state">
            <div className="new-chat-mark"><Zap aria-hidden="true" /></div>
            <h2>What can I help you resolve?</h2>
            <p>Describe an IT issue and I&apos;ll look for approved guidance.</p>
          </div>
        ) : messages.map((message) => message.role === "user" ? (
          <ChatMessage key={message.id} message={message} />
        ) : (
          <AssistantResponse
            key={message.id}
            message={message}
            onResolve={() => setResolved((current) => [...current, message.id])}
            resolved={resolved.includes(message.id)}
          />
        ))}
      </section>

      <section className="assistant-compose-area" aria-label="Message composer">
        <div className="suggested-queries">
          <span className="suggested-queries-label">Suggested queries:</span>
          {["Reset Okta MFA", "Docker WSL2 memory fix", "Outlook PST sync", "AWS IAM STS Session Refresh"].map((query) => (
            <button className="suggestion-pill" key={query} onClick={() => handleSend(query)} type="button">{query}</button>
          ))}
        </div>
        <ChatComposer onSend={handleSend} placeholder="Ask Copilot anything or describe your IT issue..." />
        <div className="composer-footer">
          <span className="grounding-label">Model: GPT-4o Enterprise · Grounded to Engineering KB</span>
          <span>Press Return ↵ to send</span>
        </div>
      </section>
    </EmployeeLayout>
  );
}