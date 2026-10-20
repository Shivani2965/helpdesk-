import { Paperclip } from "lucide-react";

export default function ChatMessage({ message }) {
  return (
    <div className="message-row user">
      <div className="message-avatar" aria-hidden="true">{message.name.split(" ").map((part) => part[0]).join("")}</div>
      <article className="message-bubble">
        <header className="message-meta"><strong>{message.name}</strong><span className="message-time">{message.time}</span></header>
        <p className="message-text">{message.content}</p>
      </article>
    </div>
  );
}