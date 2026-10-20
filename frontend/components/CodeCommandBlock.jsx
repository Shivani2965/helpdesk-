"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeCommandBlock({ command }) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="code-block">
      <code>{command}</code>
      <button aria-label={copied ? "Command copied" : "Copy terminal command"} className="code-copy" onClick={copyCommand} title={copied ? "Copied" : "Copy terminal command"} type="button">
        {copied ? <Check aria-hidden="true" /> : <><Copy aria-hidden="true" />Copy Terminal Command</>}
      </button>
    </div>
  );
}