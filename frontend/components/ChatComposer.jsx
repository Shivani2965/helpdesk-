"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUp, Mic, Paperclip } from "lucide-react";

export default function ChatComposer({ onSend, placeholder }) {
  const [value, setValue] = useState("");

  function submitMessage(event) {
    event.preventDefault();
    const message = value.trim();
    if (!message) return;
    onSend(message);
    setValue("");
  }

  return (
    <form className="chat-composer" onSubmit={submitMessage}>
      <button aria-label="Attach a file" className="composer-tool" title="Attach a file" type="button"><Paperclip aria-hidden="true" /></button>
      <textarea aria-label="Describe your issue" className="composer-input" onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          event.currentTarget.form.requestSubmit();
        }
      }} placeholder={placeholder || "Ask Copilot anything or describe your IT issue..."} rows={1} value={value} />
      <button aria-label="Voice input" className="composer-tool voice-button" title="Voice input" type="button"><Mic aria-hidden="true" /></button>
      <button className="send-button" disabled={!value.trim()} type="submit">Send <ArrowUp aria-hidden="true" /></button>
    </form>
  );
}