"use client";

import { Bell, Search, SlidersHorizontal, UserRound } from "lucide-react";
import { useState } from "react";

const scopes = ["Tickets", "KB", "Runbooks"];

export default function TopNavigation({ hideSearch = false }) {
  const [activeScope, setActiveScope] = useState("Tickets");

  return (
    <header className="top-navigation">
      {!hideSearch && (
        <label className="global-search">
          <Search aria-hidden="true" />
          <input aria-label="Search Copilot or records" placeholder="Ask Copilot or search records..." />
          <span className="search-scopes" aria-label="Search scope">
            {scopes.map((scope) => (
              <button
                aria-pressed={activeScope === scope}
                className={activeScope === scope ? "scope-chip selected" : "scope-chip"}
                key={scope}
                onClick={() => setActiveScope(scope)}
                type="button"
              >
                {scope}
              </button>
            ))}
          </span>
        </label>
      )}
      <div className="top-navigation-actions">
        <button className="header-icon-button" type="button" aria-label="Notifications" title="Notifications"><Bell aria-hidden="true" /></button>
        <button className="header-icon-button" type="button" aria-label="Preferences" title="Preferences"><SlidersHorizontal aria-hidden="true" /></button>
        <button className="profile-button" type="button" aria-label="Employee profile" title="Employee profile"><UserRound aria-hidden="true" /></button>
      </div>
    </header>
  );
}