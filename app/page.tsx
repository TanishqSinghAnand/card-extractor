'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import UploadZone from '@/components/UploadZone';
import ResultCard from '@/components/ResultCard';
import ScannerSkeleton from '@/components/ScannerSkeleton';
import { ScanResult } from '@/lib/types';

type AppState = 'idle' | 'preview' | 'scanning' | 'result' | 'error';

export default function Home() {
  const [state, setState] = useState<AppState>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    setError('');
    setState('preview');

    if (f.type.startsWith('image/')) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, []);

  const handleScan = async () => {
    if (!file) return;
    setState('scanning');
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/scan', { method: 'POST', body: formData });
      const json = await res.json();

      if (json.success && json.data) {
        setResult(json.data);
        setState('result');
      } else {
        setError(json.error || 'Failed to scan card. Please try again.');
        setState('error');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
      setState('error');
    }
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError('');
    setState('idle');
  };

  const isProcessing = state === 'scanning';

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '0 1.25rem 5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Top strip */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          paddingTop: '2.5rem',
          paddingBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="var(--bg-primary)" strokeWidth="1"/>
              <path d="M4 7h6M4 9h4" stroke="var(--bg-primary)" strokeWidth="0.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '-0.2px',
              color: 'var(--text-primary)',
            }}
          >
            CardScan
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            color: '#3B6D11',
            background: '#EAF3DE',
            padding: '3px 10px',
            borderRadius: '20px',
            border: '0.5px solid #C0DD97',
            fontWeight: 500,
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
          AI Powered
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '3rem 0 2rem',
          animation: 'fadeUp 0.6s ease both',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 46px)',
            fontWeight: 300,
            letterSpacing: '-1px',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: '14px',
          }}
        >
          Scan any card,<br />
          <span style={{ color: 'var(--text-secondary)' }}>extract everything.</span>
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: '480px',
          }}
        >
          Upload a photo of your Aadhar, PAN, Bank Card, Passport, or any ID.
          AI identifies it and extracts all details — privately and securely.
        </p>
      </div>

      {/* Main card */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--bg-card)',
          border: '0.5px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '1.5rem',
          animation: 'fadeUp 0.6s ease 0.1s both',
        }}
      >
        {/* Upload zone — always visible if not result-only */}
        {state !== 'result' && (
          <UploadZone onFile={handleFile} disabled={isProcessing} />
        )}

        {/* Preview */}
        {(state === 'preview' || state === 'error') && file && (
          <div style={{ marginTop: '1.25rem', animation: 'fadeUp 0.4s ease both' }}>
            {previewUrl ? (
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '0.5px solid var(--border-subtle)',
                  background: 'var(--bg-secondary)',
                  maxHeight: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={previewUrl}
                  alt="Card preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '220px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'var(--bg-secondary)',
                  border: '0.5px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 3h8l4 4v10H4V3z" stroke="var(--text-secondary)" strokeWidth="1" fill="none" strokeLinejoin="round"/>
                  <path d="M12 3v4h4" stroke="var(--text-secondary)" strokeWidth="1" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{file.name}</span>
              </div>
            )}

            {state === 'error' && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#FCEBEB',
                  border: '0.5px solid #F7C1C1',
                  fontSize: '13px',
                  color: '#A32D2D',
                }}
              >
                {error}
              </div>
            )}

            <button
              onClick={handleScan}
              disabled={isProcessing}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '13px',
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                letterSpacing: '0.2px',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => { if (!isProcessing) (e.target as HTMLButtonElement).style.opacity = '0.8'; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.opacity = '1'; }}
            >
              Scan &amp; Extract Details
            </button>

            <button
              onClick={handleReset}
              style={{
                marginTop: '8px',
                width: '100%',
                padding: '10px',
                background: 'transparent',
                color: 'var(--text-tertiary)',
                border: '0.5px solid var(--border-subtle)',
                borderRadius: '10px',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.color = 'var(--text-secondary)';
                (e.target as HTMLButtonElement).style.borderColor = 'var(--border-medium)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.color = 'var(--text-tertiary)';
                (e.target as HTMLButtonElement).style.borderColor = 'var(--border-subtle)';
              }}
            >
              Choose different file
            </button>
          </div>
        )}

        {/* Skeleton while scanning */}
        {state === 'scanning' && (
          <div style={{ marginTop: '1.25rem' }}>
            <ScannerSkeleton />
          </div>
        )}

        {/* Result */}
        {state === 'result' && result && (
          <div>
            <ResultCard result={result} />

            <div style={{ marginTop: '1rem', display: 'flex', gap: '8px' }}>
              <button
                onClick={handleReset}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '0.5px solid var(--border-medium)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                Scan another card
              </button>
              <button
                onClick={() => {
                  const text = result.fields.map(f => `${f.label}: ${f.value}`).join('\n');
                  navigator.clipboard?.writeText(text);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '0.5px solid var(--border-medium)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                Copy all fields
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Supported cards strip */}
      {state === 'idle' && (
        <div
          style={{
            width: '100%',
            maxWidth: '680px',
            marginTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            animation: 'fadeUp 0.6s ease 0.2s both',
          }}
        >
          {['Aadhar Card', 'PAN Card', 'Driving Licence', 'Voter ID', 'Passport', 'Bank Card'].map((label) => (
            <span
              key={label}
              style={{
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                padding: '4px 10px',
                border: '0.5px solid var(--border-subtle)',
                borderRadius: '20px',
                background: 'var(--bg-card)',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          marginTop: '4rem',
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          textAlign: 'center',
          lineHeight: 1.7,
        }}
      >
        <p>Images are processed server-side via the Anthropic API and never stored.</p>
        <p>Sensitive numbers are masked before display.</p>
      </footer>
    </main>
  );
}
