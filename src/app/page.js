import Link from 'next/link';
import { Database, ShieldCheck, Zap, ArrowRight, Terminal, Cpu, Lock, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center border-b-[1.5px] border-border">
        <div className="max-w-4xl space-y-8">
          <div className="inline-block px-4 py-1.5 border-[1.5px] border-border font-bold text-sm tracking-widest mb-4 bg-background text-foreground shadow-[2px_2px_0px_0px_currentColor]">
            Privacy First • Serverless • Offline Capable
          </div>
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="block my-4">Master SQL</span>
            <span className="bg-foreground text-background px-4">Without The Server</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            A clean, privacy-focused SQL playground. <br />
            No login. No tracking. Just code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link
              href="/practice"
              className="btn-primary px-8 py-4 text-xl flex items-center gap-3"
            >
              <Terminal size={24} />
              Start Practice
            </Link>
            <Link
              href="/playground"
              className="px-8 py-4 bg-transparent text-foreground border-[1.5px] border-foreground font-bold text-xl shadow-[2px_2px_0px_0px_currentColor] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-3"
            >
              Open Playground <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background text-foreground">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 border-[1.5px] border-foreground hover:shadow-[4px_4px_0px_0px_currentColor] transition-all bg-background">
            <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center mb-6">
              <Cpu size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Local Engine</h3>
            <p className="text-lg font-medium opacity-80">
              Powered by WASM. Your database lives in your browser's memory. Reset anytime. Zero latency.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 border-[1.5px] border-foreground hover:shadow-[4px_4px_0px_0px_currentColor] transition-all bg-background">
            <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center mb-6">
              <Lock size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4">100% Private</h3>
            <p className="text-lg font-medium opacity-80">
              No backend means no data leaks. Your queries and data never leave your device. Complete anonymity.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 border-[1.5px] border-foreground hover:shadow-[4px_4px_0px_0px_currentColor] transition-all bg-background">
            <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center mb-6">
              <Activity size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4 uppercase">Instant Feedback</h3>
            <p className="text-lg font-medium opacity-80">
              Battle-test your skills with real-time query execution against rigorous test cases.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
