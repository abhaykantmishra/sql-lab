import Link from 'next/link';
import { Database, User, LogIn, UserPlus } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center px-6 justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-8">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Database className="text-blue-600 dark:text-blue-400" size={24} />
                    <span className="font-semibold md:font-bold text-base whitespace-nowrap md:text-xl  tracking-tight text-zinc-900 dark:text-zinc-100">Sql Labs</span>
                </Link>

                <nav className="flex items-center gap-3 md:gap-6">
                    <Link href="/practice" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Practice
                    </Link>
                    <Link href="/playground" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Playground
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Link href="/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-2">
                    <LogIn size={16} />
                    <span className='hidden md:flex'>Login</span>
                </Link>
                <Link href="/signup" className="text-sm font-medium px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2">
                    <UserPlus size={16} />
                    <span className='hidden md:flex'>Sign Up</span>
                </Link>
                {/* <Link href="/profile" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors" title="Profile">
                    <User size={20} />
                </Link> */}
            </div>
        </header>
    );
};

export default Header;
