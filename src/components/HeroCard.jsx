import { greeting } from '../utils/tasks.js';

// Mobile version of the focus banner (shown below 640px, as in the Figma mobile frame).
export default function HeroCard({ stats }) {
  const waiting = stats.total - stats.completed;
  const message =
    waiting === 0
      ? 'You are all caught up.'
      : `${waiting} task${waiting === 1 ? '' : 's'} waiting for your attention.`;

  return (
    <section className="hero-card show-sm" aria-label="Today's focus">
      <p className="eyebrow">{greeting()}</p>
      <h2>Make today count</h2>
      <p className="hero-sub">{message}</p>
      <div className="hero-progress">
        <div
          className="hero-track"
          role="progressbar"
          aria-label="Completion progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={stats.percent}
        >
          <span style={{ width: `${stats.percent}%` }} />
        </div>
        <span className="hero-pct">{stats.percent}%</span>
      </div>
    </section>
  );
}
