import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'monogram';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md'
}) => {
  // Dimensions and sizing helper based on 'size' prop
  const sizes = {
    sm: { height: 32, width: variant === 'full' ? 140 : 36 },
    md: { height: 48, width: variant === 'full' ? 220 : 54 },
    lg: { height: 64, width: variant === 'full' ? 300 : 72 }
  };

  const { height, width } = sizes[size];

  // If monogram only
  if (variant === 'monogram') {
    return (
      <svg
        id="tfj-logo-monogram"
        viewBox="0 0 100 100"
        width={width}
        height={height}
        className={`${className} overflow-visible`}
        aria-label="The Film Journal Monogram"
      >
        <g transform="translate(0, 5)">
          {/* Overlapping TFJ in elegant serif */}
          {/* T - Deep silver/white serif */}
          <text
            x="20"
            y="65"
            fontSize="54"
            fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
            fontWeight="bold"
            fill="#F5F5F0"
            letterSpacing="-1"
            className="select-none"
          >
            T
          </text>
          
          {/* F - Slightly shifted down and right, overlaps T */}
          <text
            x="42"
            y="72"
            fontSize="44"
            fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
            fontStyle="italic"
            fontWeight="500"
            fill="#E2E2D5"
            className="select-none select-none opacity-90"
          >
            F
          </text>

          {/* J - Flowing down on the right */}
          <text
            x="58"
            y="82"
            fontSize="56"
            fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
            fontWeight="normal"
            fill="#F5F5F0"
            className="select-none font-light"
          >
            J
          </text>

          {/* Gold underline accent below the monogram letters */}
          <line
            x1="18"
            y1="88"
            x2="52"
            y2="88"
            stroke="#C9A84C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    );
  }

  // Full lockup (Monogram left, Divider center, Stacked wordmark right)
  return (
    <svg
      id="tfj-logo-full"
      viewBox="0 0 420 100"
      width="100%"
      style={{ maxWidth: width * 1.8, height: 'auto' }}
      className={`${className} overflow-visible`}
      aria-label="The Film Journal Logo"
    >
      {/* Monogram Section (Left 0 - 100 px) */}
      <g transform="translate(10, 5)">
        {/* T */}
        <text
          x="15"
          y="65"
          fontSize="56"
          fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
          fontWeight="bold"
          fill="#F5F5F0"
          className="select-none"
        >
          T
        </text>
        
        {/* F */}
        <text
          x="38"
          y="72"
          fontSize="46"
          fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
          fontStyle="italic"
          fontWeight="500"
          fill="#D6D6CB"
          className="select-none opacity-95"
        >
          F
        </text>

        {/* J */}
        <text
          x="54"
          y="82"
          fontSize="58"
          fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
          fontWeight="normal"
          fill="#F5F5F0"
          className="select-none font-light"
        >
          J
        </text>

        {/* Muted gold line */}
        <line
          x1="13"
          y1="88"
          x2="48"
          y2="88"
          stroke="#C9A84C"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* Elegant Vertical Divider Line (At 115 px) */}
      <line
        x1="115"
        y1="18"
        x2="115"
        y2="78"
        stroke="#2E2E2E"
        strokeWidth="1.5"
      />

      {/* Stacked Wordmark (Right 140 - 410 px) */}
      <g transform="translate(145, 0)" className="select-none">
        <text
          x="0"
          y="32"
          fontSize="20"
          fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
          fontWeight="900"
          fill="#F5F5F0"
          letterSpacing="11"
        >
          THE
        </text>
        <text
          x="0"
          y="56"
          fontSize="22"
          fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
          fontWeight="900"
          fill="#F5F5F0"
          letterSpacing="10"
        >
          FILM
        </text>
        <text
          x="0"
          y="80"
          fontSize="22"
          fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
          fontWeight="900"
          fill="#F5F5F0"
          letterSpacing="5.5"
        >
          JOURNAL
        </text>
      </g>
    </svg>
  );
};
