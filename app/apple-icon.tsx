import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0071e3 0%, #0077ed 100%)',
          borderRadius: '36px',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Antenna */}
          <line x1="50" y1="25" x2="50" y2="32" stroke="white" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="50" cy="23" r="3.5" fill="white" />
          
          {/* Robot Head */}
          <rect x="35" y="32" width="30" height="25" rx="4" fill="white" />
          
          {/* Eyes */}
          <circle cx="43" cy="42" r="3.5" fill="#0071e3" />
          <circle cx="57" cy="42" r="3.5" fill="#0071e3" />
          
          {/* Eye shine */}
          <circle cx="44.5" cy="40.5" r="1.5" fill="white" />
          <circle cx="58.5" cy="40.5" r="1.5" fill="white" />
          
          {/* Smile */}
          <path
            d="M 42 50 Q 50 53 58 50"
            stroke="#0071e3"
            stroke-width="2.5"
            stroke-linecap="round"
            fill="none"
          />
          
          {/* Robot Body */}
          <rect x="38" y="60" width="24" height="20" rx="3" fill="white" opacity="0.95" />
          
          {/* Body details */}
          <rect x="44" y="65" width="12" height="10" rx="2" fill="#0071e3" opacity="0.3" />
          
          {/* Arms */}
          <rect x="28" y="62" width="8" height="14" rx="3" fill="white" opacity="0.9" />
          <rect x="64" y="62" width="8" height="14" rx="3" fill="white" opacity="0.9" />
          
          {/* Hands */}
          <circle cx="32" cy="78" r="3.5" fill="white" />
          <circle cx="68" cy="78" r="3.5" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
