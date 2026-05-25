function MeepleSVG() {
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-20">
      <circle cx="30" cy="14" r="11" fill="#0d9488" />
      <path
        d="M14 38 Q8 28 10 18 Q17 15 19 27 Q22 36 30 36 Q38 36 41 27 Q43 15 50 18 Q52 28 46 38 Q42 46 40 56 L46 70 Q36 74 33 60 L30 52 L27 60 Q24 74 14 70 L20 56 Q18 46 14 38Z"
        fill="#0d9488"
      />
    </svg>
  )
}

function PlantSVG() {
  return (
    <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-20">
      <path d="M22 68 L26 52 L44 52 L48 68Z" fill="#b45309" />
      <rect x="20" y="47" width="30" height="8" rx="3" fill="#92400e" />
      <ellipse cx="35" cy="51" rx="12" ry="3" fill="#78350f" />
      <ellipse cx="35" cy="36" rx="7" ry="18" fill="#15803d" transform="rotate(-18 35 36)" />
      <ellipse cx="35" cy="36" rx="7" ry="18" fill="#16a34a" transform="rotate(18 35 36)" />
      <ellipse cx="35" cy="32" rx="6" ry="16" fill="#15803d" />
      <ellipse cx="22" cy="38" rx="6" ry="14" fill="#16a34a" transform="rotate(-35 22 38)" />
      <ellipse cx="48" cy="38" rx="6" ry="14" fill="#15803d" transform="rotate(35 48 38)" />
      <circle cx="35" cy="32" r="4" fill="#4ade80" />
      <circle cx="35" cy="32" r="2" fill="#86efac" />
    </svg>
  )
}

function DiceSVG() {
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <rect x="14" y="14" width="54" height="54" rx="10" fill="rgba(0,0,0,0.15)" />
      <rect x="8" y="8" width="56" height="56" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <circle cx="23" cy="23" r="5.5" fill="#1c1917" />
      <circle cx="49" cy="23" r="5.5" fill="#1c1917" />
      <circle cx="36" cy="36" r="5.5" fill="#1c1917" />
      <circle cx="23" cy="49" r="5.5" fill="#1c1917" />
      <circle cx="49" cy="49" r="5.5" fill="#1c1917" />
    </svg>
  )
}

function CatSVG() {
  return (
    <svg viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-20">
      <ellipse cx="32" cy="62" rx="20" ry="13" fill="#ea580c" />
      <path d="M50 68 Q68 56 60 40" stroke="#ea580c" strokeWidth="7" strokeLinecap="round" fill="none" />
      <polygon points="10,30 17,10 26,28" fill="#ea580c" />
      <polygon points="38,28 47,10 54,30" fill="#ea580c" />
      <polygon points="13,29 17,15 23,27" fill="#fed7aa" />
      <polygon points="41,27 47,15 51,29" fill="#fed7aa" />
      <ellipse cx="32" cy="38" rx="21" ry="19" fill="#ea580c" />
      <path d="M20 22 Q22 18 24 22" stroke="#c2410c" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M40 22 Q42 18 44 22" stroke="#c2410c" strokeWidth="1.5" fill="none" opacity="0.7" />
      <ellipse cx="24" cy="36" rx="4" ry="5" fill="#1c1917" />
      <ellipse cx="40" cy="36" rx="4" ry="5" fill="#1c1917" />
      <circle cx="25.5" cy="34.5" r="1.5" fill="white" />
      <circle cx="41.5" cy="34.5" r="1.5" fill="white" />
      <path d="M30 43 L32 45 L34 43" fill="#fda4af" strokeLinejoin="round" />
      <path d="M29 46 Q32 49 35 46" stroke="#7c2d12" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <line x1="6" y1="42" x2="26" y2="44" stroke="#7c2d12" strokeWidth="1" opacity="0.55" />
      <line x1="6" y1="46" x2="26" y2="46" stroke="#7c2d12" strokeWidth="1" opacity="0.55" />
      <line x1="38" y1="44" x2="58" y2="42" stroke="#7c2d12" strokeWidth="1" opacity="0.55" />
      <line x1="38" y1="46" x2="58" y2="46" stroke="#7c2d12" strokeWidth="1" opacity="0.55" />
    </svg>
  )
}

function StackSVG() {
  return (
    <svg viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-20">
      <rect x="6" y="56" width="60" height="20" rx="3" fill="#db2777" />
      <rect x="6" y="56" width="7" height="20" rx="2" fill="#9d174d" opacity="0.5" />
      <rect x="20" y="60" width="30" height="3" rx="1" fill="white" opacity="0.3" />
      <rect x="10" y="34" width="54" height="19" rx="3" fill="#0891b2" />
      <rect x="10" y="34" width="7" height="19" rx="2" fill="#0e7490" opacity="0.5" />
      <rect x="24" y="38" width="26" height="3" rx="1" fill="white" opacity="0.3" />
      <rect x="8" y="12" width="50" height="19" rx="3" fill="#d97706" />
      <rect x="8" y="12" width="7" height="19" rx="2" fill="#b45309" opacity="0.5" />
      <rect x="22" y="16" width="22" height="3" rx="1" fill="white" opacity="0.3" />
    </svg>
  )
}

const DECORATIONS = [
  { element: <MeepleSVG />,  label: 'a stray meeple'       },
  { element: <PlantSVG />,   label: 'needs more sunlight'   },
  { element: <DiceSVG />,    label: 'roll for initiative'   },
  { element: <CatSVG />,     label: 'shelf guardian'        },
  { element: <StackSVG />,   label: 'more games incoming'   },
]

export default function EmptyCubby({ index }: { index: number }) {
  const { element, label } = DECORATIONS[index % DECORATIONS.length]

  return (
    <div data-testid="empty-cubby" className="relative overflow-hidden rounded-sm h-full">
      <div className="flex flex-col items-center justify-center gap-3 bg-amber-50 dark:bg-stone-900 h-full min-h-48 py-8">
        {element}
        <p className="text-xs text-stone-400 dark:text-stone-500 italic tracking-wide">{label}</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-sm shadow-[inset_0_10px_28px_rgba(0,0,0,0.3),inset_5px_0_12px_rgba(0,0,0,0.14),inset_-5px_0_12px_rgba(0,0,0,0.14),inset_0_-3px_8px_rgba(0,0,0,0.08)]" />
    </div>
  )
}
