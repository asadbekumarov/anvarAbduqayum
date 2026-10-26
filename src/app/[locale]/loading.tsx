export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center pointer-events-none select-none"
      style={{
        animation: "preloaderFadeOut 0.4s ease 1.6s forwards",
      }}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Monogram or champagne spinner */}
        <div className="w-10 h-10 border-2 border-white/10 border-t-[#C5A880] rounded-full animate-spin" />
        <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
          Yuklanmoqda...
        </span>
      </div>
    </div>
  );
}
