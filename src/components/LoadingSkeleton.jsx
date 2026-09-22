export default function LoadingSkeleton() {
  return (
    <div className="content">
      <div className="skeleton-card" style={{ padding: '24px' }}>
        <div className="skeleton skeleton-line w-40 h-20" style={{ marginBottom: 16 }} />
        <div className="skeleton skeleton-line w-80" style={{ height: 16, marginBottom: 8 }} />
        <div className="skeleton skeleton-line w-60" />
        <div style={{ marginTop: 20 }}>
          <div className="skeleton skeleton-line w-full" style={{ height: 44, borderRadius: 12 }} />
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="skeleton skeleton-line w-full h-6" />
        </div>
      </div>

      <div className="skeleton-card">
        <div className="skeleton skeleton-line w-40" style={{ marginBottom: 20 }} />
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="skeleton-row" style={{ marginBottom: 20 }}>
            <div className="skeleton skeleton-circle" style={{ width: 16, height: 16, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton skeleton-line w-60" />
              <div className="skeleton skeleton-line w-80" style={{ height: 8 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="skeleton-card">
        <div className="skeleton-row">
          <div className="skeleton" style={{ width: 64, height: 64, borderRadius: 12, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton skeleton-line w-80" />
            <div className="skeleton skeleton-line w-40" />
            <div className="skeleton skeleton-line w-60" style={{ height: 8 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
