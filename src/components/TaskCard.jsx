import { useEffect, useRef, useState } from 'react';
import { STATUSES } from '../data/sampleTasks.js';
import { formatDueDate } from '../utils/tasks.js';
import { CalendarIcon, CheckIcon, DotsIcon } from './Icons.jsx';

function TaskMenu({ task, onEdit, onDelete, onStatusChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const menuId = `menu-${task.id}`;

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const run = (fn) => () => {
    btnRef.current?.focus(); // keep focus on a stable element so dialogs can restore it
    setOpen(false);
    fn();
  };

  return (
    <div className="menu-wrap" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className="menu-btn"
        aria-label={`Actions for ${task.title}`}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <DotsIcon size={18} />
      </button>
      {open && (
        <ul id={menuId} className="menu">
          {STATUSES.filter((s) => s !== task.status).map((s) => (
            <li key={s}>
              <button type="button" onClick={run(() => onStatusChange(s))}>
                Mark as {s}
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={run(onEdit)}>
              Edit task
            </button>
          </li>
          <li>
            <button type="button" className="danger" onClick={run(onDelete)}>
              Delete task
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default function TaskCard({ task, onToggle, onEdit, onDelete, onStatusChange }) {
  const done = task.status === 'Completed';

  return (
    <li className="task-card">
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={`Mark ${task.title} as completed`}
        className={`check${done ? ' checked' : ''}`}
        onClick={onToggle}
      >
        {done && <CheckIcon size={14} strokeWidth={3} />}
      </button>

      <div className="task-main">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span className="sr-only">Status: {task.status}</span>
      </div>

      <div className="task-meta">
        <span className="chip chip-cat">{task.category}</span>
        <span className={`chip chip-${task.priority.toLowerCase()}`}>{task.priority}</span>
        <span className="task-date">
          {task.dueDate ? (
            <>
              <CalendarIcon size={14} />
              {formatDueDate(task.dueDate)}
            </>
          ) : null}
        </span>
      </div>

      <TaskMenu task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
    </li>
  );
}
