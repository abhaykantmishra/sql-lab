import Link from 'next/link';
import { Database, Code2, Trophy, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Master SQL with <span className="text-blue-600 dark:text-blue-400">Real Practice</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Interactive SQL playground, challenging problems, and instant feedback.
            Level up your database skills from anywhere.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/practice"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
            >
              Start Practicing <ArrowRight size={20} />
            </Link>
            <Link
              href="/playground"
              className="px-8 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 rounded-lg font-semibold text-lg transition-all"
            >
              Try Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <Database className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Interactive Environment</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Run SQL queries directly in your browser with our persistent SQLite engine. No setup required.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <Code2 className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Real-world Problems</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Tackle a variety of SQL questions ranging from basic selects to complex joins and window functions.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Track Progress</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Create an account to save your solutions, track your progress, and earn badges as you master SQL.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
