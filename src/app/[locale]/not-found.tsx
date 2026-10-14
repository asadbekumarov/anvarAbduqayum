import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-elevated border border-border rounded-[2px]">
        <span className="font-serif text-6xl font-light text-gold tracking-tight block">
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
          <Link href="/">
            <Button variant="primary" size="md" className="px-6">
              Bosh sahifaga qaytish
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
