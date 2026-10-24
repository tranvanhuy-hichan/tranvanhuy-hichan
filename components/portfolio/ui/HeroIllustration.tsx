import React from 'react';

const origin: React.CSSProperties = { transformBox: 'fill-box', transformOrigin: 'center' };

function Sparkle({ x, y, s = 1, fill = '#fff' }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -12 C1 -4 4 -1 12 0 C4 1 1 4 0 12 C-1 4 -4 1 -12 0 C-4 -1 -1 -4 0 -12Z"
      fill={fill}
    />
  );
}

/** Flat, friendly developer + laptop illustration drawn in the brand-blue palette (no external assets). */
export default function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 440" role="img" aria-label="Illustration of a developer working on a laptop" className={className}>
      {/* background blob + clouds */}
      <path
        d="M96 120 C130 40 280 20 366 76 C450 130 468 250 410 332 C350 414 190 428 112 350 C48 286 62 190 96 120Z"
        style={{ fill: 'var(--pf-blob)' }}
      />
      <g fill="#fff" opacity="0.9">
        <ellipse cx="350" cy="58" rx="34" ry="14" />
        <ellipse cx="372" cy="46" rx="22" ry="14" />
        <ellipse cx="326" cy="50" rx="18" ry="11" />
      </g>
      <g fill="#7dd3fc" opacity="0.55">
        <ellipse cx="70" cy="330" rx="30" ry="12" />
        <ellipse cx="92" cy="320" rx="18" ry="12" />
      </g>

      {/* floating badges */}
      <g className="pf-float" style={origin}>
        <rect x="52" y="104" width="62" height="62" rx="18" fill="#fff" transform="rotate(-8 83 135)" />
        <text x="83" y="146" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0284c7" fontFamily="Nunito, sans-serif" transform="rotate(-8 83 135)">
          {'</>'}
        </text>
      </g>
      <g className="pf-float-2" style={origin}>
        <circle cx="408" cy="150" r="30" fill="#2dd4a4" />
        <path d="M393 151l10 10 19-21" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <g className="pf-float" style={origin}>
        <rect x="40" y="236" width="56" height="56" rx="28" fill="#ff5c8a" />
        <text x="68" y="272" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff" fontFamily="Nunito, sans-serif">
          {'{ }'}
        </text>
      </g>
      <g className="pf-float-2" style={origin}>
        <path d="M312 86h74a14 14 0 0114 14v26a14 14 0 01-14 14h-36l-18 16v-16h-20a14 14 0 01-14-14v-26a14 14 0 0114-14z" fill="#ffc93c" />
        <circle cx="332" cy="113" r="4" fill="#14213d" />
        <circle cx="349" cy="113" r="4" fill="#14213d" />
        <circle cx="366" cy="113" r="4" fill="#14213d" />
      </g>
      <Sparkle x={140} y={72} s={1} />
      <Sparkle x={446} y={250} s={0.8} fill="#0ea5e9" />
      <Sparkle x={236} y={40} s={0.6} fill="#ffc93c" />
      <Sparkle x={430} y={330} s={0.7} />

      {/* developer: hoodie body */}
      <path d="M112 352 C108 290 128 256 176 252 C226 250 244 290 238 352Z" fill="#0ea5e9" />
      <path d="M146 258 C160 276 192 276 206 258" stroke="#0369a1" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M168 270 v22 M184 270 v22" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" />
      {/* neck + head */}
      <rect x="165" y="228" width="22" height="26" rx="10" fill="#f2b98d" />
      <circle cx="176" cy="200" r="38" fill="#ffd7b5" />
      <ellipse cx="139" cy="203" rx="6" ry="9" fill="#ffd7b5" />
      {/* hair */}
      <path d="M137 198 C132 160 160 150 184 154 C208 156 220 176 214 200 C204 186 192 180 176 178 C160 178 146 184 137 198Z" fill="#14213d" />
      {/* face */}
      <circle cx="193" cy="204" r="4" fill="#14213d" />
      <circle cx="168" cy="204" r="4" fill="#14213d" />
      <path d="M170 220 q12 11 24 0" stroke="#14213d" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="158" cy="216" r="6" fill="#ff9db8" opacity="0.6" />
      <circle cx="204" cy="216" r="6" fill="#ff9db8" opacity="0.6" />
      {/* glasses */}
      <g stroke="#14213d" strokeWidth="3" fill="none">
        <rect x="156" y="195" width="22" height="18" rx="7" />
        <rect x="182" y="195" width="22" height="18" rx="7" />
        <path d="M178 203h4" />
      </g>
      {/* arm to laptop */}
      <path d="M214 286 C240 292 252 308 264 322" stroke="#0ea5e9" strokeWidth="24" strokeLinecap="round" fill="none" />
      <circle cx="268" cy="326" r="11" fill="#ffd7b5" />

      {/* laptop */}
      <path d="M244 328h186l-14 16H258z" fill="#94a3b8" />
      <rect x="256" y="214" width="162" height="116" rx="14" fill="#0c4a6e" />
      <rect x="264" y="222" width="146" height="100" rx="9" fill="#0b1a3a" />
      <rect x="276" y="236" width="52" height="8" rx="4" fill="#38bdf8" />
      <rect x="276" y="254" width="88" height="8" rx="4" fill="#7dd3fc" opacity="0.8" />
      <rect x="290" y="272" width="64" height="8" rx="4" fill="#2dd4a4" />
      <rect x="290" y="290" width="96" height="8" rx="4" fill="#ffc93c" />
      <rect x="276" y="306" width="38" height="8" rx="4" fill="#ff5c8a" />
      <circle cx="388" cy="244" r="7" fill="#0ea5e9" />

      {/* desk */}
      <rect x="60" y="342" width="372" height="16" rx="8" fill="#14213d" />
      <rect x="92" y="356" width="14" height="52" rx="6" fill="#14213d" />
      <rect x="386" y="356" width="14" height="52" rx="6" fill="#14213d" />
      {/* mug */}
      <rect x="76" y="316" width="26" height="26" rx="7" fill="#ffc93c" />
      <path d="M102 324h6a6 6 0 010 14h-6" stroke="#ffc93c" strokeWidth="5" fill="none" />
      <path d="M84 308c-4-6 4-8 0-14M94 308c-4-6 4-8 0-14" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}
