import AppSidebar from "./AppSidebar.jsx";
import TopNavigation from "./TopNavigation.jsx";

export default function EmployeeLayout({ children, contentClassName = "", hideSearch = false }) {
  return (
    <div className="app-shell">
      <AppSidebar />
      <div className="workspace">
        <TopNavigation hideSearch={hideSearch} />
        <main className={`page-content ${contentClassName}`}>{children}</main>
      </div>
      <AppSidebar mobile />
    </div>
  );
}