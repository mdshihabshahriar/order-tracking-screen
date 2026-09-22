import { IconAlertTriangle, IconRefresh } from './Icons';

export default function ErrorState({ onRetry }) {
  return (
    <div className="content">
      <div className="error-state">
        <div className="error-state-icon">
          <IconAlertTriangle size={32} />
        </div>
        <h3>Something went wrong</h3>
        <p>We couldn't load your tracking information. Please check your connection and try again.</p>
        <button className="btn btn-primary" onClick={onRetry} style={{ margin: '0 auto', maxWidth: 220 }}>
          <IconRefresh size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}
