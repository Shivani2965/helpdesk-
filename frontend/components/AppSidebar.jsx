"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Bot,
  ChartNoAxesColumn,
  CirclePlus,
  LogOut,
  MessagesSquare,
  Settings,
  Ticket,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/assistant", label: "AI Assistant", icon: Bot },
  { href: "/tickets", label: "My Tickets", icon: Ticket, badge: "12" },
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/assistant", label: "Chat History", icon: MessagesSquare, disabled: true },
];

export default function AppSidebar({ mobile = false }) {
  const pathname = usePathname();

  if (mobile) {
    const mobileItems = items.filter(({ disabled }) => !disabled);

    return (
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {mobileItems.slice(0, 2).map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/assistant" && pathname.startsWith(href));
          return (
            <Link aria-current={active ? "page" : undefined} aria-label={label} className={`mobile-tab${active ? " active" : ""}`} href={href} key={href} title={label}>
              <Icon aria-hidden="true" />
            </Link>
          );
        })}
        <Link className="mobile-new-chat" href="/assistant" aria-label="New chat" title="New chat"><CirclePlus aria-hidden="true" /></Link>
        <Link aria-current={pathname === "/knowledge-base" ? "page" : undefined} aria-label="Knowledge Base" className={`mobile-tab${pathname === "/knowledge-base" ? " active" : ""}`} href="/knowledge-base" title="Knowledge Base">
          <BookOpen aria-hidden="true" />
        </Link>
        <button aria-label="Employee profile" className="mobile-tab" disabled title="Employee profile" type="button"><UserRound aria-hidden="true" /></button>
      </nav>
    );
  }

  function renderItem({ href, label, icon: Icon, badge, disabled }) {
    const active = !disabled && (pathname === href || (href !== "/assistant" && pathname.startsWith(href)));
    const className = `sidebar-link${active ? " active" : ""}${disabled ? " disabled" : ""}`;
    const content = (
      <>
        <Icon aria-hidden="true" />
        <span>{label}</span>
        {badge && <span className="sidebar-badge">{badge}</span>}
        {active && <span className="sidebar-active-dot" aria-hidden="true" />}
      </>
    );

    return disabled ? (
      <button className={className} disabled key={label} title="Coming soon" type="button">{content}</button>
    ) : (
      <Link aria-current={active ? "page" : undefined} className={className} href={href} key={label}>{content}</Link>
    );
  }

  return (
    <aside className="sidebar">
      <Link className="brand-lockup" href="/assistant">
        <Image src="/icons/brand-mark.svg" width={34} height={34} alt="" />
        <span className="brand-copy">
          <span className="brand-name">PowerGrid</span>
          <span className="brand-caption">Copilot AI</span>
        </span>
      </Link>
      <p className="sidebar-section-label">General</p>
      <nav className="sidebar-nav" aria-label="General navigation">
        {items.map(renderItem)}
      </nav>
      <p className="sidebar-section-label tools-label">Tools</p>
      <nav className="sidebar-nav" aria-label="Tools navigation">
        {[
          { label: "Create Ticket", icon: CirclePlus, disabled: true },
          { label: "Analytics", icon: ChartNoAxesColumn, disabled: true },
          { label: "Settings", icon: Settings, disabled: true },
        ].map(({ label, icon: Icon, disabled }) => (
          <button className="sidebar-link disabled" disabled key={label} title="Coming soon" type="button">
            <Icon aria-hidden="true" /><span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="logout-link" disabled title="Sign-in will be connected later" type="button">
          <LogOut aria-hidden="true" /><span>Log out</span>
        </button>
      </div>
    </aside>
  );
}