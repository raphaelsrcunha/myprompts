export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0071e3" />
          <stop offset="100%" stopColor="#0077ed" />
        </linearGradient>
      </defs>
      
      {/* Circle background */}
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
      
      {/* Cute Robot */}
      <g>
        {/* Antenna */}
        <line x1="50" y1="25" x2="50" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="23" r="3" fill="white" />
        
        {/* Robot Head */}
        <rect x="35" y="32" width="30" height="25" rx="4" fill="white" />
        
        {/* Eyes */}
        <circle cx="43" cy="42" r="3" fill="#0071e3" />
        <circle cx="57" cy="42" r="3" fill="#0071e3" />
        
        {/* Eye shine */}
        <circle cx="44" cy="41" r="1" fill="white" />
        <circle cx="58" cy="41" r="1" fill="white" />
        
        {/* Smile */}
        <path
          d="M 42 50 Q 50 53 58 50"
          stroke="#0071e3"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Robot Body */}
        <rect x="38" y="60" width="24" height="20" rx="3" fill="white" opacity="0.95" />
        
        {/* Body details - chest panel */}
        <rect x="44" y="65" width="12" height="10" rx="2" fill="#0071e3" opacity="0.3" />
        
        {/* Arms */}
        <rect x="28" y="62" width="8" height="14" rx="3" fill="white" opacity="0.9" />
        <rect x="64" y="62" width="8" height="14" rx="3" fill="white" opacity="0.9" />
        
        {/* Hands */}
        <circle cx="32" cy="78" r="3" fill="white" />
        <circle cx="68" cy="78" r="3" fill="white" />
      </g>
    </svg>
  );
}
