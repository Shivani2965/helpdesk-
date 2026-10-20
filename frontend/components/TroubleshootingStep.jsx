import { CircleCheck, CircleDot } from "lucide-react";

export default function TroubleshootingStep({ number, title, description, status }) {
  return (
    <li className="assistant-step">
      <div className="assistant-step-top"><span className="assistant-step-number">{number}</span></div>
      <h3>{title}</h3>
      <p>{description}</p>
      {status && <span className="assistant-step-status">{status === "Automated" ? <CircleCheck /> : <CircleDot />}{status}</span>}
    </li>
  );
}