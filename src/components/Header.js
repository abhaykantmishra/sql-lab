import Link from 'next/link';
import { Database, HelpCircle } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 border-b border-[var(--color-divider)] bg-[var(--color-bg-elevated)] flex items-center px-5 md:px-8 justify-between sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="flex items-center gap-3 md:gap-8">
                <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white p-1.5 rounded-lg">
                        <Database size={22} strokeWidth={1.5} />
                    </div>
                    <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--color-heading)' }}>SQL Labs</span>
                </Link>

                <nav className="flex items-center gap-1 md:gap-2">
                    <Link 
                        href="/practice" 
                        className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-heading)] hover:bg-[var(--color-divider)] px-3 py-2 rounded-lg transition-all"
                    >
                        Practice
                    </Link>
                    <Link 
                        href="/playground" 
                        className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-heading)] hover:bg-[var(--color-divider)] px-3 py-2 rounded-lg transition-all"
                    >
                        Playground
                    </Link>
                    <Link 
                        href="/help" 
                        className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-heading)] hover:bg-[var(--color-divider)] px-3 py-2 rounded-lg transition-all flex items-center gap-1.5"
                    >
                        <HelpCircle size={16} />
                        <span className="hidden sm:inline">Help</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
