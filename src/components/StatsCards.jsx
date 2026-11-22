import { ListIcon, ClockIcon, CheckIcon } from './Icons.jsx';

export default function StatsCards({ stats }) {
  const items = [
    { key: 'total', label: 'Total tasks', value: stats.total, note: 'Across all projects', Icon: ListIcon, tone: 'purple' },
    { key: 'progress', label: 'In progress', value: stats.inProgress, note: 'Keep the momentum', Icon: ClockIcon, tone: 'blue' },
    { key: 'done', label: 'Completed', value: stats.completed, note: `${stats.percent}% completion rate`, Icon: CheckIcon, tone: 'green' },
  ];

  return (
    <section className="stats" aria-label="Task statistics">
      {items.map(({ key, label, value, note, Icon, tone }) => (
        <article className={`stat stat-${key}`} key={key}>
          <span className={`stat-icon tone-${tone}`}>
            <Icon size={18} />
          </span>
          <span className="stat-label">{label}</span>
          <span className="stat-value">{value}</span>
          <span className="stat-note">{note}</span>
        </article>
      ))}
    </section>
  );
}
