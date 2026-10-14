export default function Loading() {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Subtle gold spinner */}
        <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        <span className="font-serif text-sm tracking-widest text-muted uppercase">
          Yuklanmoqda...
        </span>
      </div>
    </div>
  );
}
