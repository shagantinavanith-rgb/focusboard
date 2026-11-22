export const DEFAULT_FILTERS = { query: '', status: 'All', priority: 'All' };

export function computeStats(tasks) {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'In progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, inProgress, completed, percent };
}

export function filterTasks(tasks, { query, status, priority }) {
  const q = query.trim().toLowerCase();
  return tasks.filter(
    (t) =>
      (!q || t.title.toLowerCase().includes(q)) &&
      (status === 'All' || t.status === status) &&
      (priority === 'All' || t.priority === priority)
  );
}

export function formatDueDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
