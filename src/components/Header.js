import Link from 'next/link';
import { Database } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 border-b-[1.5px] border-border bg-background flex items-center px-6 justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-8">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="bg-foreground text-background p-1 border-[1.5px] border-foreground">
                        <Database size={24} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-foreground uppercase">Sql Labs</span>
                </Link>

                <nav className="flex items-center gap-3 md:gap-6">
                    <Link href="/practice" className="text-sm font-bold text-foreground hover:bg-foreground hover:text-background px-2 py-1 transition-colors uppercase border-[1.5px] border-transparent hover:border-foreground">
                        Practice
                    </Link>
                    <Link href="/playground" className="text-sm font-bold text-foreground hover:bg-foreground hover:text-background px-2 py-1 transition-colors uppercase border-[1.5px] border-transparent hover:border-foreground">
                        Playground
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Auth links removed for no-backend version */}
            </div>
        </header>
    );
};

export default Header;
