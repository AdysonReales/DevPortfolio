import React from 'react';

interface PhantomCutoutProps {
  className?: string;
  inverted?: boolean;
}

export const PhantomCutout: React.FC<PhantomCutoutProps> = ({ className = '', inverted = false }) => {
  return (
    <div 
      className={`phantom-cutout-root absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cutout-halftone" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill={inverted ? "#F5F5F2" : "#E60012"} opacity="0.35" />
          </pattern>
          <pattern id="cutout-stripes" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="20" stroke={inverted ? "#FFFFFF" : "#080808"} strokeWidth="4" opacity="0.15" />
          </pattern>
        </defs>

        {/* Giant Angular Silhouette Base - Persona 5 Diagonal Split */}
        <path
          d="M 680, -50 
             L 1980, -50 
             L 1980, 1150 
             L 1100, 1150 
             L 860, 720 
             L 940, 680 
             L 760, 420 
             L 820, 390 
             L 680, 180 
             Z"
          fill={inverted ? "#F5F5F2" : "#080808"}
        />

        {/* Sharp Jagged Red Accent Shards */}
        <polygon
          points="620,-20 720,-20 860,240 780,260"
          fill="#E60012"
        />
        <polygon
          points="890,360 970,340 1060,510 980,530"
          fill="#E60012"
        />
        <polygon
          points="1020,640 1140,620 1260,880 1150,910"
          fill="#E60012"
        />

        {/* Interior Cutout Shapes (Negative Space Windows inside the dark mass) */}
        <polygon
          points="1240,160 1480,120 1420,290 1200,260"
          fill={inverted ? "#080808" : "#F5F5F2"}
        />
        <polygon
          points="1520,110 1740,80 1780,240 1560,220"
          fill="url(#cutout-halftone)"
        />
        <polygon
          points="1310,380 1580,340 1520,540 1260,500"
          fill={inverted ? "#080808" : "#F5F5F2"}
        />
        <polygon
          points="1640,420 1880,380 1820,620 1600,580"
          fill={inverted ? "#E60012" : "#E60012"}
        />
        <polygon
          points="1140,680 1420,640 1360,860 1100,820"
          fill={inverted ? "#080808" : "#F5F5F2"}
        />

        {/* Graphic comic hatching stripes */}
        <polygon
          points="1420,720 1700,680 1660,940 1380,900"
          fill="url(#cutout-stripes)"
        />

        {/* Stylized P5 Star Marks */}
        <g transform="translate(740, 140) scale(0.7) rotate(15)">
          <polygon points="50,0 63,38 100,50 63,62 50,100 37,62 0,50 37,38" fill="#E60012" />
        </g>
        <g transform="translate(1080, 580) scale(0.9) rotate(-22)">
          <polygon points="50,0 63,38 100,50 63,62 50,100 37,62 0,50 37,38" fill="#FFFFFF" />
        </g>
        <g transform="translate(860, 820) scale(0.6) rotate(8)">
          <polygon points="50,0 63,38 100,50 63,62 50,100 37,62 0,50 37,38" fill="#E60012" />
        </g>

        {/* Small Directional Chevrons */}
        <path d="M 640 480 L 670 500 L 640 520" stroke="#E60012" strokeWidth="6" strokeLinecap="square" />
        <path d="M 665 480 L 695 500 L 665 520" stroke="#E60012" strokeWidth="6" strokeLinecap="square" />
        <path d="M 690 480 L 720 500 L 690 520" stroke="#E60012" strokeWidth="6" strokeLinecap="square" />
      </svg>
    </div>
  );
};
