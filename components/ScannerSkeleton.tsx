export default function ScannerSkeleton() {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border-subtle)',
        borderRadius: '16px',
        overflow: 'hidden',
        animation: 'fadeIn 0.3s ease both',
      }}
    >
      {/* Header skeleton */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '0.5px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          className="skeleton"
          style={{ width: '100px', height: '24px', borderRadius: '20px' }}
        />
        <div
          className="skeleton"
          style={{ width: '80px', height: '16px', borderRadius: '6px' }}
        />
      </div>

      {/* Fields skeleton */}
      <div
        style={{
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem 1.5rem',
        }}
      >
        {[
          { w: '60%', full: false },
          { w: '50%', full: false },
          { w: '45%', full: false },
          { w: '40%', full: false },
          { w: '80%', full: true },
        ].map((item, i) => (
          <div key={i} style={{ gridColumn: item.full ? '1 / -1' : undefined }}>
            <div
              className="skeleton"
              style={{ width: '50px', height: '10px', borderRadius: '4px', marginBottom: '6px' }}
            />
            <div
              className="skeleton"
              style={{ width: item.w, height: '16px', borderRadius: '4px' }}
            />
          </div>
        ))}
      </div>

      {/* Scanning indicator */}
      <div
        style={{
          padding: '0.75rem 1.25rem',
          borderTop: '0.5px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--bg-secondary)',
        }}
      >
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            border: '2px solid var(--border-medium)',
            borderTopColor: 'var(--text-primary)',
            animation: 'spin 0.7s linear infinite',
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Analysing card with AI vision…
        </span>
      </div>
    </div>
  );
}
