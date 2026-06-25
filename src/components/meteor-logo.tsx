type LogoProps = {
  variant?: "horizontal" | "icon";
  onDark?: boolean;
  className?: string;
};

/**
 * Meteor Oto Yıkama logo — inline SVG inspired by the brand reference:
 * meteor with star streaking over a car silhouette, "METEOR" wordmark with
 * orange middle bar, "OTO YIKAMA" subtitle below.
 */
export function MeteorLogo({
  variant = "horizontal",
  onDark = false,
  className = "",
}: LogoProps) {
  const dark = onDark ? "#ffffff" : "#1a1d22";
  const orange = "#ff5a1f";
  const subtitle = onDark ? "#ffffff" : "#1a1d22";

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Meteor Oto Yıkama"
      >
        <circle cx="40" cy="40" r="36" fill="none" stroke={dark} strokeWidth="2.5" />
        {/* meteor streak */}
        <path
          d="M14 30 Q26 26 38 28"
          stroke={orange}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 36 Q30 33 40 35"
          stroke={orange}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* star */}
        <path
          d="M42 24 l2.2 5 5.2 0.6 -3.9 3.5 1.1 5.1 -4.6-2.7 -4.6 2.7 1.1-5.1 -3.9-3.5 5.2-0.6z"
          fill={orange}
        />
        {/* M letter */}
        <text
          x="40"
          y="60"
          textAnchor="middle"
          fontFamily="Sora, system-ui, sans-serif"
          fontWeight="800"
          fontSize="26"
          fill={dark}
          letterSpacing="-0.5"
        >
          M
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 280 90"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Meteor Oto Yıkama"
    >
      {/* Meteor + car silhouette */}
      <g transform="translate(70 2)">
        {/* meteor streaks */}
        <path
          d="M2 22 Q38 14 78 18"
          stroke={orange}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 32 Q44 24 80 28"
          stroke={orange}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
        {/* star (meteor head) */}
        <path
          d="M86 8 l3 6.8 7.4 0.8 -5.5 5 1.6 7.3 -6.5-3.8 -6.5 3.8 1.6-7.3 -5.5-5 7.4-0.8z"
          fill={orange}
        />
        {/* car silhouette (windscreen + body curve) */}
        <path
          d="M40 38 Q70 16 110 32 L140 38 Q138 42 132 42 L48 42 Q42 42 40 38 Z"
          fill={dark}
          opacity="0.15"
        />
        <path
          d="M40 40 Q70 18 110 34"
          stroke={dark}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M30 44 Q40 38 60 38 L130 38 Q150 38 158 46"
          stroke={dark}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* METEOR wordmark */}
      <g transform="translate(0 70)">
        <text
          x="140"
          y="0"
          textAnchor="middle"
          fontFamily="Sora, system-ui, sans-serif"
          fontWeight="800"
          fontSize="34"
          fill={dark}
          letterSpacing="2"
        >
          METEOR
        </text>
        {/* orange accent bar on E */}
        <rect x="158" y="-12" width="14" height="3.5" fill={orange} rx="1" />

        {/* OTO YIKAMA subtitle */}
        <text
          x="140"
          y="18"
          textAnchor="middle"
          fontFamily="Sora, system-ui, sans-serif"
          fontWeight="600"
          fontSize="11"
          fill={subtitle}
          letterSpacing="5"
        >
          OTO YIKAMA
        </text>
      </g>
    </svg>
  );
}
