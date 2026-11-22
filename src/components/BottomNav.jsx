import { NAV_ITEMS } from './navItems.js';

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {NAV_ITEMS.map(({ id, shortLabel, Icon, disabled }) => (
        <button
          key={id}
          type="button"
          className={`bottom-item${active === id ? ' active' : ''}`}
          aria-current={active === id ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          title={disabled ? 'Coming soon' : undefined}
          onClick={() => !disabled && onNavigate(id)}
        >
          <Icon />
          <span>{shortLabel}</span>
        </button>
      ))}
    </nav>
  );
}
