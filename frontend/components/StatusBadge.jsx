export default function StatusBadge({ status = "open", children }) {
  return <span className={`status-badge ${status}`}>{children ?? status}</span>;
}