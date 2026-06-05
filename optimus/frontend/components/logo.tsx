export function LogoIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#0D2B6E" />
      {/* Outer C arc */}
      <path
        d="M 70 16 A 40 40 0 1 0 70 84"
        stroke="white"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      {/* Inner S shape */}
      <path
        d="M 58 30 C 82 30 82 50 58 50 C 34 50 34 70 58 70"
        stroke="white"
        strokeWidth="7.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Plus sign – orange */}
      <line x1="75" y1="10" x2="75" y2="26" stroke="#F59E0B" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="67" y1="18" x2="83" y2="18" stroke="#F59E0B" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  )
}

export function LogoWordmark({ className, light = true }: { className?: string; light?: boolean }) {
  const text = light ? "text-white" : "text-[#0D2B6E]"
  const sub = light ? "text-white/60" : "text-[#0D2B6E]/60"
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <LogoIcon className="w-10 h-10 shrink-0" />
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold text-lg tracking-wide ${text}`}>
          OPTIMUS<span className="text-[#F59E0B]">+</span>
        </span>
        <span className={`text-[10px] tracking-[0.25em] uppercase font-medium ${sub}`}>
          Solutions
        </span>
      </div>
    </div>
  )
}
