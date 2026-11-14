import { useCartStore } from '../../stores/use-cart-store';

type LearningBannerProps = {
  step: string;
  title: string;
  tools: string[];
  description: string;
};

/**
 * Pequeño banner didáctico opcional que puede encenderse o apagarse desde
 * la cabecera para identificar qué parte del stack y qué regla actúa en la vista.
 */
export function LearningBanner({
  step,
  title,
  tools,
  description,
}: LearningBannerProps) {
  const showLearningGuides = useCartStore((s) => s.showLearningGuides);
  if (!showLearningGuides) return null;

  return (
    <aside className="aty-guide-banner" aria-label={`Guía de estudio ${step}`}>
      <div className="aty-guide-banner__top">
        <span className="aty-guide-pill">{step}</span>
        <strong className="aty-guide-title">{title}</strong>
        <div className="aty-guide-tags">
          {tools.map((tool) => (
            <code key={tool} className="aty-guide-tag">
              {tool}
            </code>
          ))}
        </div>
      </div>
      <p className="aty-guide-desc">{description}</p>
    </aside>
  );
}
