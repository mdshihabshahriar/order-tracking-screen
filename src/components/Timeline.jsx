import { IconCheck } from './Icons';

export default function Timeline({ steps }) {
  const lastCompletedIdx = steps.reduce(
    (acc, step, i) => (step.completed ? i : acc),
    -1
  );

  return (
    <div className="timeline">
      {steps.map((step, i) => {
        const isCompleted = step.completed;
        const isCurrent = i === lastCompletedIdx && !step.completed
          ? false
          : i === lastCompletedIdx;
        const isPending = !isCompleted;
        const isDelayed = step.isDelayed;

        let className = 'timeline-step';
        if (isCompleted) className += ' completed';
        if (isCurrent && isCompleted) className += ' current';
        if (isPending && !isCompleted) className += ' pending';
        if (isDelayed) className += ' delayed';

        return (
          <div key={step.step} className={className}>
            <div className="timeline-node">
              {isCompleted && <IconCheck size={10} />}
            </div>
            <div className="timeline-step-label">{step.label}</div>
            <div className="timeline-step-desc">{step.description}</div>
            {step.date && (
              <div className="timeline-step-date">
                {new Date(step.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                at{' '}
                {new Date(step.date).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
