import { useState } from 'react';

const ICON_COLORS = ['#f97316', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

export function ProfilePage() {
  const [displayName, setDisplayName] = useState('BarFlow User');
  const [selectedIcon, setSelectedIcon] = useState<number>(0);

  const firstLetter = displayName.trim().charAt(0).toUpperCase() || 'U';
  const colorIndex = selectedIcon;
  const accentColor = ICON_COLORS[colorIndex % ICON_COLORS.length];

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Profile</h1>

      {/* Display Name */}
      <div style={{ marginBottom: 24 }}>
        <label
          htmlFor="display-name-input"
          style={{
            display: 'block',
            fontSize: 13,
            color: '#a3a3a3',
            marginBottom: 8,
          }}
        >
          Display name
        </label>
        <input
          id="display-name-input"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px',
            backgroundColor: '#262626',
            border: '1px solid #333',
            borderRadius: 10,
            color: '#e5e5e5',
            fontSize: 15,
            boxSizing: 'border-box',
          }}
          placeholder="Your display name"
        />
      </div>

      {/* Profile Icon Selector */}
      <div style={{ marginBottom: 24 }}>
        <label
          style={{
            display: 'block',
            fontSize: 13,
            color: '#a3a3a3',
            marginBottom: 12,
          }}
        >
          Profile icon
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {firstLetter}
          </div>
          <span style={{ fontSize: 14, color: '#737373' }}>Current: letter badge</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {ICON_COLORS.map((color, i) => (
            <button
              key={color}
              onClick={() => setSelectedIcon(i)}
              aria-label={`Select accent color ${i + 1}`}
              aria-pressed={selectedIcon === i}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: color,
                border: selectedIcon === i ? '3px solid #fff' : '2px solid #333',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {firstLetter}
            </button>
          ))}
        </div>
      </div>

      {/* BarFlow Premium */}
      <div
        style={{
          backgroundColor: '#262626',
          border: '1px solid #333',
          borderRadius: 12,
          padding: 20,
          marginTop: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            BarFlow Premium
          </span>
        </div>
        <p style={{ color: '#a3a3a3', fontSize: 14, marginBottom: 8 }}>
          $3.99 one-time — Unlock exclusive profile icons
        </p>
        <button
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#f97316',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Get Premium
        </button>
      </div>
    </div>
  );
}
