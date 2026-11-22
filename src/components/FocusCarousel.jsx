import { useState } from 'react';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx';

const slides = [
  { title: 'Make today count.', text: 'A little focus goes a long way.', label: 'NEXT UP', task: 'Design landing page', progress: 62 },
  { title: 'Small steps, big progress.', text: 'Keep your priorities in view.', label: 'IN PROGRESS', task: 'Fix navigation', progress: 67 },
  { title: 'Celebrate the wins.', text: 'Every completed task moves you forward.', label: 'COMPLETED', task: 'Onboarding copy', progress: 100 },
];

const pad = (n) => String(n).padStart(2, '0');

export default function FocusCarousel() {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (i) => setIndex((i + count) % count);
  const slide = slides[index];

  return (
    <section
      className="carousel hide-sm"
      aria-roledescription="carousel"
      aria-label="Focus notes"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
      }}
    >
      <div className="carousel-viewport" aria-live="polite">
        <div
          className="slide"
          key={index}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${count}`}
        >
          <div className="slide-text">
            <p className="eyebrow">
              <span>FOCUS NOTES</span>
              <span className="slide-count">
                {pad(index + 1)} / {pad(count)}
              </span>
            </p>
            <h2>{slide.title}</h2>
            <p className="slide-sub">{slide.text}</p>
          </div>

          <div className="mini-stack" aria-hidden="true">
            <div className="mini-card">
              <span className="mini-check">
                <CheckIcon size={16} strokeWidth={2.6} />
              </span>
              <div className="mini-body">
                <span className="mini-label">{slide.label}</span>
                <span className="mini-title">{slide.task}</span>
                <div className="mini-progress">
                  <span className="mini-track">
                    <span style={{ width: `${slide.progress}%` }} />
                  </span>
                  <span className="mini-pct">{slide.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashes">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            className={`dash${i === index ? ' active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <div className="arrows">
        <button type="button" className="arrow arrow-prev" aria-label="Previous slide" onClick={() => go(index - 1)}>
          <ChevronLeftIcon size={18} />
        </button>
        <button type="button" className="arrow arrow-next" aria-label="Next slide" onClick={() => go(index + 1)}>
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </section>
  );
}
