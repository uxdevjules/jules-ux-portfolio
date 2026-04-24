// Stylized terminal-style portrait — stroke-only line art in the accent color.
// Edit the SVG paths below to adjust the look.
export function Portrait() {
  return (
    <div className="my-2 flex flex-col items-start" aria-hidden="true">
      <svg
        viewBox="0 0 220 240"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[160px] sm:w-[200px] h-auto text-[var(--accent)]"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Wild curly hair silhouette */}
          <path
            d="M 110,28
               C 88,20 70,30 65,45
               C 45,48 32,62 38,80
               C 25,88 22,105 35,118
               C 25,128 26,145 40,152
               C 38,170 50,184 68,180
               C 76,196 92,200 104,188
               C 118,202 134,196 144,184
               C 160,180 172,166 168,150
               C 184,144 190,128 178,114
               C 192,106 192,88 180,80
               C 188,62 174,48 160,46
               C 160,28 138,22 128,32
               C 120,22 112,22 110,28 Z"
          />

          {/* Curl detail flourishes inside the hair */}
          <path d="M 60,58 q -4,4 0,9 q 7,2 7,-5" />
          <path d="M 84,42 q -4,4 0,9 q 7,2 7,-5" />
          <path d="M 130,40 q 4,4 0,9 q -7,2 -7,-5" />
          <path d="M 152,58 q 4,4 0,9 q -7,2 -7,-5" />
          <path d="M 46,92 q -4,4 0,9 q 7,2 7,-5" />
          <path d="M 168,92 q 4,4 0,9 q -7,2 -7,-5" />
          <path d="M 42,128 q -4,4 0,9 q 7,2 7,-5" />
          <path d="M 172,130 q 4,4 0,9 q -7,2 -7,-5" />
          <path d="M 65,168 q -4,4 0,9 q 7,2 7,-5" />
          <path d="M 150,172 q 4,4 0,9 q -7,2 -7,-5" />

          {/* Face oval */}
          <ellipse cx="110" cy="122" rx="30" ry="38" />

          {/* Eyebrows */}
          <path d="M 92,110 q 8,-4 14,0" />
          <path d="M 116,110 q 8,-4 14,0" />

          {/* Eyes */}
          <circle cx="99" cy="118" r="1.6" fill="currentColor" />
          <circle cx="123" cy="118" r="1.6" fill="currentColor" />

          {/* Nose */}
          <path d="M 110,126 q -2,6 1,10" />

          {/* Mouth */}
          <path d="M 104,142 q 7,4 14,0" />
        </g>
      </svg>
      <span className="mt-1 text-[11px] text-[var(--muted)] font-mono">
        // jules.svg
      </span>
    </div>
  );
}
