import { LogoMark, ChevronDownIcon } from './Icons.jsx';

export default function TopBar() {
  return (
    <>
      {/* Desktop top bar (>= 1024px) */}
      <div className="topbar">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li>Workspace</li>
            <li aria-current="page">Overview</li>
          </ol>
        </nav>
        <div className="user">
          <div className="avatar" role="img" aria-label="Signed in as JD">JD</div>
          <ChevronDownIcon size={16} />
        </div>
      </div>

      {/* Tablet / mobile header (< 1024px) */}
      <header className="mobile-header">
        <div className="brand">
          <LogoMark />
          <span>FocusBoard</span>
        </div>
        <div className="avatar" role="img" aria-label="Signed in as JD">JD</div>
      </header>
    </>
  );
}
