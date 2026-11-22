import { LogoMark } from './Icons.jsx';
import { NAV_ITEMS } from './navItems.js';

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <LogoMark />
        <span>FocusBoard</span>
      </div>
      <nav aria-label="Primary">
        <p className="nav-label">WORKSPACE</p>
        <ul className="nav-list">
          {NAV_ITEMS.map(({ id, label, Icon, disabled }) => (
            <li key={id}>
              <button
                type="button"
                className={`nav-item${active === id ? ' active' : ''}`}
                aria-current={active === id ? 'page' : undefined}
                aria-disabled={disabled || undefined}
                title={disabled ? 'Coming soon' : undefined}
                onClick={() => !disabled && onNavigate(id)}
              >
                <Icon />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
