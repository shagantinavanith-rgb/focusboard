import { useRef, useState } from 'react';
import { STATUSES, PRIORITIES } from '../data/sampleTasks.js';
import { useModal } from '../hooks/useModal.js';
import { CalendarIcon, ChevronDownIcon, CloseIcon } from './Icons.jsx';

const empty = { title: '', description: '', status: 'To do', priority: 'Medium', dueDate: '' };

export default function TaskForm({ task, onSave, onCancel }) {
  const editing = Boolean(task);
  const [values, setValues] = useState(
    task
      ? { title: task.title, description: task.description, status: task.status, priority: task.priority, dueDate: task.dueDate }
      : empty
  );
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  useModal(formRef, onCancel, '#f-title');

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  function validate() {
    const next = {};
    const title = values.title.trim();
    if (!title) next.title = 'Task title is required.';
    else if (title.length > 80) next.title = 'Task title must be 80 characters or fewer.';
    return next;
  }

  function submit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave({ ...values, title: values.title.trim(), description: values.description.trim() });
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <form
        ref={formRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        aria-describedby="form-sub"
        onSubmit={submit}
        noValidate
      >
        <header className="modal-head">
          <div>
            <h2 id="form-title">{editing ? 'Edit task' : 'Create new task'}</h2>
            <p id="form-sub">
              {editing ? 'Update your task details.' : 'Add your task details to stay on top of your work.'}
            </p>
          </div>
          <button type="button" className="close-btn" aria-label="Close dialog" onClick={onCancel}>
            <CloseIcon size={18} />
          </button>
        </header>

        <hr />

        <div className="field">
          <label htmlFor="f-title">
            Task title <span aria-hidden="true">*</span>
          </label>
          <input
            id="f-title"
            placeholder="e.g. Update pricing page"
            value={values.title}
            onChange={set('title')}
            aria-required="true"
            aria-invalid={errors.title ? 'true' : undefined}
            aria-describedby={errors.title ? 'err-title' : undefined}
          />
          {errors.title && (
            <span id="err-title" className="error" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="f-desc">Description</label>
          <textarea id="f-desc" placeholder="Add notes about this task..." value={values.description} onChange={set('description')} />
        </div>

        <div className="grid-2">
          <div className="field">
            <label htmlFor="f-status">Status</label>
            <div className="select-wrap">
              <select id="f-status" value={values.status} onChange={set('status')}>
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDownIcon size={16} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-priority">Priority</label>
            <div className="select-wrap">
              <select id="f-priority" value={values.priority} onChange={set('priority')}>
                {PRIORITIES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <ChevronDownIcon size={16} />
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="f-due">Due date</label>
          <div className="date-wrap">
            <CalendarIcon size={18} />
            <input id="f-due" type="date" value={values.dueDate} onChange={set('dueDate')} />
          </div>
        </div>

        <p className="required-note">* Required field</p>

        <hr />

        <div className="modal-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {editing ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </div>
  );
}
