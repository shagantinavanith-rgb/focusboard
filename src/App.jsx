import { useRef, useState } from 'react';
import { useTasks } from './state/TaskContext.jsx';
import { DEFAULT_CATEGORY } from './data/sampleTasks.js';
import { DEFAULT_FILTERS, computeStats, filterTasks, makeId } from './utils/tasks.js';
import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import BottomNav from './components/BottomNav.jsx';
import StatsCards from './components/StatsCards.jsx';
import FocusCarousel from './components/FocusCarousel.jsx';
import HeroCard from './components/HeroCard.jsx';
import Toolbar from './components/Toolbar.jsx';
import TaskCard from './components/TaskCard.jsx';
import TaskForm from './components/TaskForm.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import { PlusIcon } from './components/Icons.jsx';

export default function App() {
  const { tasks, dispatch } = useTasks();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [formTask, setFormTask] = useState(undefined); // undefined = closed, null = new, object = editing
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [activeNav, setActiveNav] = useState('overview');
  const tasksRef = useRef(null);

  const stats = computeStats(tasks);
  const visible = filterTasks(tasks, filters);

  const navigate = (id) => {
    setActiveNav(id);
    if (id === 'tasks') tasksRef.current?.scrollIntoView();
    else window.scrollTo({ top: 0 });
  };

  const handleSave = (data) => {
    if (formTask) dispatch({ type: 'UPDATE', task: { ...data, id: formTask.id } });
    else dispatch({ type: 'ADD', task: { ...data, id: makeId(), category: DEFAULT_CATEGORY } });
    setFormTask(undefined);
  };

  return (
    <div className="shell">
      <Sidebar active={activeNav} onNavigate={navigate} />

      <div className="content-col">
        <TopBar />

        <main className="page">
          <div className="page-head">
            <div>
              <h1>
                Your work, <span className="line-2">in focus.</span>
              </h1>
              <p className="page-sub">
                <span className="hide-sm">Plan your day, stay organized, and celebrate small wins.</span>
                <span className="show-sm">Stay organized and keep moving forward.</span>
              </p>
            </div>
            <button type="button" className="btn btn-primary btn-new hide-sm" onClick={() => setFormTask(null)}>
              New task
            </button>
          </div>

          <FocusCarousel />
          <HeroCard stats={stats} />

          <h2 className="section-title show-sm">Overview</h2>
          <StatsCards stats={stats} />

          <section id="tasks" ref={tasksRef} className="tasks" aria-labelledby="tasks-heading">
            <div className="section-head">
              <div>
                <h2 id="tasks-heading" className="section-title">My tasks</h2>
                <p className="muted">
                  <span className="hide-sm">Manage and track everything in one place.</span>
                  <span className="show-sm">Your priorities for this week</span>
                </p>
              </div>
              <button type="button" className="btn btn-soft hide-sm" onClick={() => setFilters(DEFAULT_FILTERS)}>
                View all tasks
              </button>
              <button type="button" className="add-btn show-sm" aria-label="New task" onClick={() => setFormTask(null)}>
                <PlusIcon size={22} />
              </button>
            </div>

            <Toolbar filters={filters} onChange={setFilters} total={stats.total} />

            {visible.length === 0 ? (
              <p className="empty" role="status">
                {tasks.length === 0 ? 'No tasks yet. Create your first one.' : 'No tasks match your filters.'}
              </p>
            ) : (
              <ul className="task-list">
                {visible.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() =>
                      dispatch({
                        type: 'SET_STATUS',
                        id: task.id,
                        status: task.status === 'Completed' ? 'To do' : 'Completed',
                      })
                    }
                    onEdit={() => setFormTask(task)}
                    onDelete={() => setDeleteTarget(task)}
                    onStatusChange={(status) => dispatch({ type: 'SET_STATUS', id: task.id, status })}
                  />
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>

      <BottomNav active={activeNav} onNavigate={navigate} />

      {formTask !== undefined && (
        <TaskForm task={formTask} onCancel={() => setFormTask(undefined)} onSave={handleSave} />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete task?"
          message={`"${deleteTarget.title}" will be permanently removed.`}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            dispatch({ type: 'DELETE', id: deleteTarget.id });
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}
