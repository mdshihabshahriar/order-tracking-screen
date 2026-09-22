// Utility helpers for date formatting and status logic.

/**
 * Format a date string into a human-readable form.
 * @param {string} dateStr - ISO date string
 * @param {object} opts - Intl.DateTimeFormat options
 */
export function formatDate(dateStr, opts = {}) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...opts,
  });
}

export function formatTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return `${formatDate(dateStr)} at ${formatTime(dateStr)}`;
}

/**
 * Returns a relative time string (e.g., "3 days ago", "in 2 days")
 */
export function relativeTime(dateStr) {
  if (!dateStr) return '';
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = d - now;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
}

/**
 * Get the progress percentage for the timeline.
 */
export function getProgressPercent(timeline) {
  const completedCount = timeline.filter((s) => s.completed).length;
  return Math.round((completedCount / timeline.length) * 100);
}

/**
 * Determine the current active step index.
 */
export function getCurrentStepIndex(timeline) {
  const lastCompleted = timeline.reduce(
    (acc, step, i) => (step.completed ? i : acc),
    -1
  );
  return lastCompleted;
}
