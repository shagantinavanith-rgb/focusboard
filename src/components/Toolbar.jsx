import { STATUSES, PRIORITIES } from '../data/sampleTasks.js';
import { SearchIcon, ChevronDownIcon } from './Icons.jsx';

export default function Toolbar({ filters, onChange, total }) {
  const set = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="toolbar">
      <div className="tabs" role="group" aria-label="Filter by status">
        {['All', ...STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            className={`tab${filters.status === s ? ' active' : ''}`}
            aria-pressed={filters.status === s}
            onClick={() => set({ status: s })}
          >
            {s === 'All' ? (
              <>
                All<span className="hide-sm"> tasks</span> <span className="tab-count">{total}</span>
              </>
            ) : (
              s
            )}
          </button>
        ))}
      </div>

      <div className="search">
        <SearchIcon size={16} />
        <label htmlFor="search" className="sr-only">
          Search tasks by title
        </label>
        <input
          id="search"
          type="search"
          placeholder="Find a task..."
          value={filters.query}
          onChange={(e) => set({ query: e.target.value })}
        />
      </div>

      <div className="select-wrap priority-select">
        <label htmlFor="priority" className="sr-only">
          Filter by priority
        </label>
        <select id="priority" value={filters.priority} onChange={(e) => set({ priority: e.target.value })}>
          {['All', ...PRIORITIES].map((p) => (
            <option key={p} value={p}>
              Priority: {p}
            </option>
          ))}
        </select>
        <ChevronDownIcon size={16} />
      </div>
    </div>
  );
}
