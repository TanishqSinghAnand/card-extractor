'use client';

import { ScanResult } from '@/lib/types';
import CardBadge from './CardBadge';

interface ResultCardProps {
  result: ScanResult;
}

function isMasked(value: string): boolean {
  return value.includes('X') || value.includes('*');
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border-subtle)',
        borderRadius: '16px',
        overflow: 'hidden',
        animation: 'fadeUp 0.4s ease both',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '0.5px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CardBadge typeKey={result.cardTypeKey} large />
          <span
            style={{
              fontSize: '13px',
              color: 'var(--text-tertiary)',
              fontStyle: 'italic',
              fontFamily: 'var(--font-display)',
            }}
          >
            {result.fields.length} field{result.fields.length !== 1 ? 's' : ''} extracted
          </span>
        </div>

        {/* Secure indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            color: '#3B6D11',
            background: '#EAF3DE',
            padding: '3px 8px',
            borderRadius: '20px',
            border: '0.5px solid #C0DD97',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1L1.5 2.5v2.5c0 2 1.5 3.8 3.5 4.5 2-.7 3.5-2.5 3.5-4.5V2.5L5 1z"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              strokeLinejoin="round"
            />
          </svg>
          Secured
        </div>
      </div>

      {/* Fields grid */}
      <div
        style={{
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem 1.5rem',
        }}
      >
        {result.fields.map((field, i) => (
          <div
            key={i}
            style={{
              gridColumn: field.full ? '1 / -1' : undefined,
              animation: `fadeUp 0.4s ease both`,
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.9px',
                color: 'var(--text-tertiary)',
                fontWeight: 500,
                marginBottom: '4px',
              }}
            >
              {field.label}
            </div>
            <div
              style={{
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
                color: isMasked(field.value) ? 'var(--text-tertiary)' : 'var(--text-primary)',
                letterSpacing: isMasked(field.value) ? '1.5px' : '0.2px',
                lineHeight: 1.5,
                wordBreak: 'break-all',
              }}
            >
              {field.value || '—'}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div
        style={{
          padding: '0.75rem 1.25rem',
          borderTop: '0.5px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          background: 'var(--bg-secondary)',
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ flexShrink: 0, marginTop: '2px' }}
        >
          <path
            d="M7 1.5L1.5 4v3.5c0 2.9 2.2 5.5 5.5 6.1 3.3-.6 5.5-3.2 5.5-6.1V4L7 1.5z"
            stroke="var(--text-tertiary)"
            strokeWidth="0.8"
            fill="none"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 7l1.5 1.5L9.5 5.5"
            stroke="var(--text-tertiary)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
          This image was processed via the Anthropic API and is not stored. Sensitive numbers are partially masked for security.
        </p>
      </div>
    </div>
  );
}
