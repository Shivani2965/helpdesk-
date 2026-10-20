import { BookOpen } from "lucide-react";

export default function KnowledgeSource({ href = "#", children }) {
  return <div className="assistant-source"><span>Verified Reference</span><a href={href}><BookOpen aria-hidden="true" />{children}</a></div>;
}