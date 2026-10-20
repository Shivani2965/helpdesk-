import TicketDetailView from "../../../components/TicketDetailView.jsx";

export function generateStaticParams() {
  return ["PG-9421", "PG-9410", "PG-9388", "PG-9204"].map((ticketId) => ({ ticketId }));
}

export default async function TicketDetailsPage({ params }) {
  const { ticketId } = await params;
  return <TicketDetailView ticketId={ticketId} />;
}