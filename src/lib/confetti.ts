import confetti from 'canvas-confetti';

const LUNAE_COLORS = ['#5B4BDB', '#14B8A6', '#8B5CF6', '#2DD4BF', '#F59E0B', '#6366F1'];

/**
 * Standard celebratory burst of confetti with Lunae brand colors.
 */
export function triggerConfetti(origin = { x: 0.5, y: 0.6 }) {
  if (typeof window === 'undefined') return;

  confetti({
    particleCount: 80,
    spread: 70,
    origin,
    colors: LUNAE_COLORS,
    ticks: 200,
    gravity: 1.1,
    scalar: 1,
    shapes: ['square', 'circle'],
    disableForReducedMotion: true,
  });
}

/**
 * Dual cannon burst from both bottom corners.
 * Perfect for major conversions, account creation, or trial starts.
 */
export function triggerRealisticCannons() {
  if (typeof window === 'undefined') return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: LUNAE_COLORS,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Star & sparkle burst for testimonials, reviews, and high ratings.
 */
export function triggerStars() {
  if (typeof window === 'undefined') return;

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 20,
    shapes: ['star'] as confetti.Shape[],
    colors: ['#FFE838', '#FFD000', '#F59E0B', '#14B8A6', '#A78BFA'],
    disableForReducedMotion: true,
  };

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    origin: { x: 0.5, y: 0.5 },
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 0.75,
    origin: { x: 0.5, y: 0.5 },
  });
}

/**
 * Monetary / Pix celebration effect.
 */
export function triggerPixSuccess() {
  if (typeof window === 'undefined') return;

  confetti({
    particleCount: 60,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#10B981', '#14B8A6', '#34D399', '#059669', '#2DD4BF'],
    ticks: 180,
    gravity: 1,
    scalar: 1.1,
    disableForReducedMotion: true,
  });
}
