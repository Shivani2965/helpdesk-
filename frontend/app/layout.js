import "./globals.css";
import "./powergrid.css";
import "./reference-overrides.css";

export const metadata = {
  title: "PowerGrid Copilot | IT Support",
  description: "AI-assisted IT support grounded in verified knowledge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
