import Link from 'next/link';
import { Database, ShieldCheck, Zap, ArrowRight, Terminal, Cpu, Lock, Activity, BookOpen, Layers, FileSpreadsheet, Users, Gauge, Tag, CheckCircle, HelpCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-28 text-center hero-section relative">
        <div className="max-w-4xl space-y-8 relative z-10">
          <div className="badge">
            <Zap size={14} className="text-[var(--color-accent)]" />
            <span>100% Private • Serverless • Offline</span>
          </div>
          <h1 className="font-bold" style={{ color: 'var(--color-heading)' }}>
            <span className="block mb-3">Master SQL</span>
            <span className="text-[var(--color-accent)]">Without The Server</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed text-[var(--color-text)]">
            A clean, privacy-focused SQL playground. <br className="hidden md:block" />
            No login. No tracking. Just code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/practice"
              className="btn-primary px-8 py-3.5 text-base"
            >
              <Terminal size={20} />
              Start Practice
            </Link>
            <Link
              href="/playground"
              className="btn-secondary px-8 py-3.5 text-base"
            >
              Open Playground <ArrowRight size={20} />
            </Link>
          </div>
          <div className="pt-6">
            <Link 
              href="/help" 
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              <HelpCircle size={16} />
              Not sure where to start? Check out the help guide
            </Link>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="py-20 px-4 bg-[var(--color-bg-elevated)] border-y border-[var(--color-divider)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <BookOpen size={24} style={{ color: 'var(--color-accent)' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>Practice Mode</h2>
              </div>
              <p className="text-lg mb-6 text-[var(--color-text)]">
                Level up your SQL skills with curated questions in a LeetCode-style format. Perfect for interview prep or sharpening your query skills.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Layers size={14} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <span className="text-[var(--color-text)]"><strong className="text-[var(--color-heading)]">Difficulty levels</strong> — Easy, Medium, and Hard questions to match your skill</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Tag size={14} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <span className="text-[var(--color-text)]"><strong className="text-[var(--color-heading)]">Topic tags</strong> — Filter by JOINs, Subqueries, Aggregations, and more</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckCircle size={14} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <span className="text-[var(--color-text)]"><strong className="text-[var(--color-heading)]">Instant feedback</strong> — Run your query and see pass/fail against test cases</span>
                </li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--color-divider)]">
                <span className="font-semibold text-[var(--color-heading)]">Question #1</span>
                <span className="difficulty-easy px-2 py-1 rounded-full text-xs font-semibold">Easy</span>
              </div>
              <p className="text-sm text-[var(--color-text)] mb-4">
                Write a SQL query to find all employees who earn more than their managers...
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">JOIN</span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">Subquery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section className="py-20 px-4 bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="feature-card">
                <div className="flex items-center gap-2 mb-4">
                  <Database size={18} style={{ color: 'var(--color-secondary)' }} />
                  <span className="font-semibold text-[var(--color-heading)]">your_table</span>
                </div>
                <div className="font-mono text-sm text-[var(--color-text)] bg-[var(--color-bg)] p-4 rounded-lg border border-[var(--color-divider)] overflow-x-auto">
                  <span className="text-[var(--color-accent)]">SELECT</span> COUNT(*) <span className="text-[var(--color-accent)]">FROM</span> users;<br/>
                  <span className="text-[var(--color-tertiary)]">-- 100,000 rows</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center">
                  <FileSpreadsheet size={24} style={{ color: 'var(--color-secondary)' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>Playground Mode</h2>
              </div>
              <p className="text-lg mb-6 text-[var(--color-text)]">
                Your own SQLite database right in the browser. Load your data, write queries, and get results — no setup required.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Cpu size={14} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <span className="text-[var(--color-text)]"><strong className="text-[var(--color-heading)]">WASM-powered</strong> — SQLite runs entirely in your browser, zero server latency</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Gauge size={14} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <span className="text-[var(--color-text)]"><strong className="text-[var(--color-heading)]">Handle large datasets</strong> — Work with 100k+ rows without network overhead or account creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <FileSpreadsheet size={14} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <span className="text-[var(--color-text)]"><strong className="text-[var(--color-heading)]">Import CSVs</strong> — Upload your own data and start querying in seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Lock size={14} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <span className="text-[var(--color-text)]"><strong className="text-[var(--color-heading)]">Persistent storage</strong> — Your data stays in your browser, never leaves your device</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-[var(--color-bg-elevated)] border-t border-[var(--color-divider)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={24} strokeWidth={1.5} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>100% Private</h3>
            <p className="text-sm text-[var(--color-text)]">
              No backend means your queries and data never leave your device. Complete anonymity guaranteed.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mx-auto mb-4">
              <Zap size={24} strokeWidth={1.5} style={{ color: 'var(--color-secondary)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>Lightning Fast</h3>
            <p className="text-sm text-[var(--color-text)]">
              Runs locally in your browser. Zero network latency, instant query results even on large datasets.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-tertiary)]/10 flex items-center justify-center mx-auto mb-4">
              <Users size={24} strokeWidth={1.5} style={{ color: 'var(--color-tertiary)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>No Sign-up</h3>
            <p className="text-sm text-[var(--color-text)]">
              Just open the page and start coding. No account needed, no friction, no tracking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
