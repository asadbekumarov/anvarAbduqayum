import Link from "next/link";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="bg-base text-white" suppressHydrationWarning>
        <div className="min-h-screen bg-base text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6 p-8 bg-elevated border border-border rounded-[2px]">
            <span className="font-serif text-6xl font-light text-neutral-500 tracking-tight block">
              404
            </span>
            <div>
              <h2 className="font-serif text-2xl font-normal text-white">
                Sahifa topilmadi
              </h2>
              <p className="text-xs sm:text-sm text-muted font-light mt-2 leading-relaxed">
                Siz qidirayotgan sahifa ko‘chirilgan yoki mavjud emas.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/uz"
                className="bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] font-medium px-6 py-3 uppercase tracking-wider text-xs rounded-[2px] inline-flex items-center justify-center transition-colors"
              >
                Bosh sahifaga qaytish
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
