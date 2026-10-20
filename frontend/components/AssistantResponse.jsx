import { Check, CircleHelp, ThumbsDown, ThumbsUp, Zap } from "lucide-react";
import Link from "next/link";
import CodeCommandBlock from "./CodeCommandBlock.jsx";
import KnowledgeSource from "./KnowledgeSource.jsx";
import TroubleshootingStep from "./TroubleshootingStep.jsx";

export default function AssistantResponse({ message, onResolve, resolved }) {
  return (
    <article className="assistant-response">
      <div className="message-avatar assistant" aria-hidden="true"><Zap /></div>
      <header className="assistant-response-heading">
        <strong>PowerGrid Copilot</strong>
        {message.preview ? <span className="pg-chip lavender">Preview</span> : <span className="pg-chip">v4.2 Model</span>}
        <span className="message-time">{message.time}</span>
        <span className="response-feedback" aria-label="Response feedback">
          <button className="pg-icon-button" aria-label="Helpful response" title="Helpful" type="button"><ThumbsUp /></button>
          <button className="pg-icon-button" aria-label="Not helpful response" title="Not helpful" type="button"><ThumbsDown /></button>
        </span>
      </header>
      <div className="assistant-response-body">
        <p>{message.summary}</p>
        {message.steps?.length > 0 && (
          <ol className="assistant-step-grid">
            {message.steps.map((step, index) => (
              <TroubleshootingStep key={step.title} number={index + 1} {...step} />
            ))}
          </ol>
        )}
        {message.command && <CodeCommandBlock command={message.command} />}
      </div>
      {!message.preview && message.sourceId && (
        <div className="assistant-source-row">
          <KnowledgeSource href="/knowledge-base">
            <><strong>{message.sourceId}: {message.sourceTitle}</strong></>
          </KnowledgeSource>
          <span className="assistant-confidence">Match Confidence: {message.confidence}</span>
        </div>
      )}
      {!message.preview && (
        <div className="assistant-response-actions">
          <span className="followup-prompt">{resolved ? "Marked as resolved. Thanks for confirming." : message.followup || "Is your issue resolved?"}</span>
          <Link className="pg-button" href="/tickets"><CircleHelp aria-hidden="true" />Escalate to Engineer</Link>
          <button className="pg-button primary" disabled={resolved} onClick={onResolve} type="button">
            {resolved ? <Check aria-hidden="true" /> : <Check aria-hidden="true" />}{resolved ? "Solved" : "This Solved It"}
          </button>
        </div>
      )}
    </article>
  );
}