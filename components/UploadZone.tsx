'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadZoneProps {
  onFile: (file: File) => void;
  disabled?: boolean;
}

export default function UploadZone({ onFile, disabled }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted[0]) onFile(accepted[0]);
    setDragActive(false);
  }, [onFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    disabled,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const active = isDragActive || dragActive;

  return (
    <div
      {...getRootProps()}
      style={{
        border: `1.5px dashed ${active ? 'var(--border-strong)' : 'var(--border-medium)'}`,
        borderRadius: '16px',
        padding: '3rem 2rem',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: active ? 'var(--bg-secondary)' : 'transparent',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.5 : 1,
        position: 'relative',
      }}
    >
      <input {...getInputProps()} />

      {/* Icon */}
      <div style={{ marginBottom: '1.25rem' }}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            margin: '0 auto',
            display: 'block',
            transform: active ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.2s ease',
          }}
        >
          <rect width="56" height="56" rx="14" fill="var(--bg-secondary)" />
          <path
            d="M28 19v14M22 25l6-6 6 6"
            stroke={active ? 'var(--text-primary)' : 'var(--text-secondary)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 38h20"
            stroke={active ? 'var(--text-primary)' : 'var(--text-secondary)'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '17px',
        fontWeight: 300,
        color: 'var(--text-primary)',
        marginBottom: '6px',
        letterSpacing: '-0.2px',
      }}>
        {active ? 'Drop it here' : 'Drop your card here'}
      </p>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
        Aadhar · PAN · Driving Licence · Voter ID · Passport · Bank Card
      </p>
      <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
        JPG, PNG, PDF — up to 10MB
      </p>

      {!active && (
        <div style={{
          marginTop: '1.25rem',
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: 500,
          padding: '6px 14px',
          border: '0.5px solid var(--border-medium)',
          borderRadius: '8px',
          color: 'var(--text-secondary)',
          letterSpacing: '0.2px',
        }}>
          or click to browse
        </div>
      )}
    </div>
  );
}
