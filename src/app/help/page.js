import Link from 'next/link';
import { Home, Keyboard, BookOpen, Code, Database, Table, Filter, Calculator, ArrowRight, Info } from 'lucide-react';

export const metadata = {
  title: "Help - SQL Labs",
  description: "SQL cheat sheet and keyboard shortcuts for SQL Labs",
};

export default function HelpPage() {
  return (
    <div className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-heading)] transition-colors mb-6">
            <Home size={16} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>Help & Cheat Sheet</h1>
          <p className="text-lg text-[var(--color-text)]">
            Quick reference guide for SQL and keyboard shortcuts
          </p>
        </div>

        {/* Keyboard Shortcuts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
              <Keyboard size={20} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-heading)' }}>Keyboard Shortcuts</h2>
          </div>
          
          <div className="grid gap-4">
            <div className="feature-card p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-bg)] flex items-center justify-center border border-[var(--color-divider)]">
                    <span className="text-xs font-mono font-bold text-[var(--color-heading)]">⌘</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text)]">+</span>
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-bg)] flex items-center justify-center border border-[var(--color-divider)]">
                    <span className="text-xs font-mono font-bold text-[var(--color-heading)]">Enter</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--color-text)]">Run SQL query</span>
                  <span className="px-2 py-1 rounded-md bg-[var(--color-success)]/10 text-[var(--color-success)] text-xs font-semibold">Works in Practice & Playground</span>
                </div>
              </div>
            </div>

            <div className="feature-card p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-bg)] flex items-center justify-center border border-[var(--color-divider)]">
                    <span className="text-xs font-mono font-bold text-[var(--color-heading)]">⌘</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text)]">+</span>
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-bg)] flex items-center justify-center border border-[var(--color-divider)]">
                    <span className="text-xs font-mono font-bold text-[var(--color-heading)]">S</span>
                  </div>
                </div>
                <span className="text-sm text-[var(--color-text)]">Save code (Playground only)</span>
              </div>
            </div>

            <div className="feature-card p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-bg)] flex items-center justify-center border border-[var(--color-divider)]">
                    <span className="text-xs font-mono font-bold text-[var(--color-heading)]">⌘</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text)]">+</span>
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-bg)] flex items-center justify-center border border-[var(--color-divider)]">
                    <span className="text-xs font-mono font-bold text-[var(--color-heading)]">/</span>
                  </div>
                </div>
                <span className="text-sm text-[var(--color-text)]">Toggle comment</span>
              </div>
            </div>
          </div>
        </section>

        {/* SQL Cheat Sheet */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary)]/10 flex items-center justify-center">
              <BookOpen size={20} style={{ color: 'var(--color-secondary)' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-heading)' }}>SQL Cheat Sheet</h2>
          </div>

          {/* SELECT */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <Code size={18} style={{ color: 'var(--color-accent)' }} />
              Basic Queries
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="SELECT * FROM users;" desc="Select all columns from users table" />
              <CodeBlock code="SELECT name, email FROM users;" desc="Select specific columns" />
              <CodeBlock code="SELECT DISTINCT city FROM users;" desc="Select unique values" />
              <CodeBlock code="SELECT * FROM users LIMIT 10;" desc="Limit results to 10 rows" />
            </div>
          </div>

          {/* WHERE */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <Filter size={18} style={{ color: 'var(--color-accent)' }} />
              Filtering with WHERE
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="SELECT * FROM users WHERE age > 18;" desc="Greater than" />
              <CodeBlock code="SELECT * FROM users WHERE city = 'New York';" desc="Exact match (strings in quotes)" />
              <CodeBlock code="SELECT * FROM users WHERE age BETWEEN 20 AND 30;" desc="Range (inclusive)" />
              <CodeBlock code="SELECT * FROM users WHERE name LIKE 'J%';" desc="Starts with 'J'" />
              <CodeBlock code="SELECT * FROM users WHERE name LIKE '%son%';" desc="Contains 'son'" />
              <CodeBlock code="SELECT * FROM users WHERE city IN ('NYC', 'LA', 'Chicago');" desc="Multiple values" />
              <CodeBlock code="SELECT * FROM users WHERE age > 18 AND city = 'NYC';" desc="Multiple conditions (AND)" />
              <CodeBlock code="SELECT * FROM users WHERE city = 'NYC' OR city = 'LA';" desc="Either condition (OR)" />
              <CodeBlock code="SELECT * FROM users WHERE NOT city = 'NYC';" desc="Negation" />
            </div>
          </div>

          {/* ORDER BY & GROUP BY */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <ArrowRight size={18} style={{ color: 'var(--color-accent)' }} />
              Sorting & Grouping
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="SELECT * FROM users ORDER BY name ASC;" desc="Sort ascending (A-Z)" />
              <CodeBlock code="SELECT * FROM users ORDER BY age DESC;" desc="Sort descending (Z-A)" />
              <CodeBlock code="SELECT city, COUNT(*) FROM users GROUP BY city;" desc="Group by city, count users" />
              <CodeBlock code="SELECT city, AVG(age) FROM users GROUP BY city;" desc="Group and calculate average" />
              <CodeBlock code="SELECT city, COUNT(*) FROM users GROUP BY city HAVING COUNT(*) > 5;" desc="Filter groups (after grouping)" />
            </div>
          </div>

          {/* JOINs */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <Table size={18} style={{ color: 'var(--color-accent)' }} />
              JOINs
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="SELECT * FROM orders JOIN users ON orders.user_id = users.id;" desc="Inner JOIN - matching rows only" />
              <CodeBlock code="SELECT * FROM orders LEFT JOIN users ON orders.user_id = users.id;" desc="Left JOIN - all orders, matching users" />
              <CodeBlock code="SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id;" desc="Right JOIN - all users, matching orders" />
              <CodeBlock code="SELECT * FROM orders FULL OUTER JOIN users ON orders.user_id = users.id;" desc="Full JOIN - all rows from both" />
              <CodeBlock code="SELECT * FROM users, orders WHERE users.id = orders.user_id;" desc="Old school join (comma + WHERE)" />
            </div>
          </div>

          {/* Aggregate Functions */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <Calculator size={18} style={{ color: 'var(--color-accent)' }} />
              Aggregate Functions
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="SELECT COUNT(*) FROM users;" desc="Count all rows" />
              <CodeBlock code="SELECT SUM(price) FROM orders;" desc="Sum of values" />
              <CodeBlock code="SELECT AVG(age) FROM users;" desc="Average of values" />
              <CodeBlock code="SELECT MIN(age) FROM users;" desc="Minimum value" />
              <CodeBlock code="SELECT MAX(age) FROM users;" desc="Maximum value" />
            </div>
          </div>

          {/* Subqueries */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <Database size={18} style={{ color: 'var(--color-accent)' }} />
              Subqueries
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="SELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);" desc="Find older than average" />
              <CodeBlock code="SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);" desc="Find users with orders" />
              <CodeBlock code="SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) as total_orders FROM users;" desc="Correlated subquery" />
            </div>
          </div>

          {/* INSERT, UPDATE, DELETE */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <Info size={18} style={{ color: 'var(--color-accent)' }} />
              Modifying Data
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="INSERT INTO users (name, age) VALUES ('John', 25);" desc="Insert a new row" />
              <CodeBlock code="UPDATE users SET age = 26 WHERE name = 'John';" desc="Update rows (always use WHERE!)" />
              <CodeBlock code="DELETE FROM users WHERE age < 18;" desc="Delete rows (always use WHERE!)" />
            </div>
          </div>

          {/* CASE */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <BookOpen size={18} style={{ color: 'var(--color-accent)' }} />
              CASE (Conditional)
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="SELECT name, CASE WHEN age < 18 THEN 'Minor' WHEN age < 65 THEN 'Adult' ELSE 'Senior' END as category FROM users;" desc="Conditional categories" />
            </div>
          </div>

          {/* AS (Alias) */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-heading)' }}>
              <BookOpen size={18} style={{ color: 'var(--color-accent)' }} />
              Aliases
            </h3>
            <div className="grid gap-3">
              <CodeBlock code="SELECT name AS 'User Name', age AS 'User Age' FROM users;" desc="Rename columns in output" />
              <CodeBlock code="SELECT COUNT(*) as total_users FROM users;" desc="Alias for aggregate results" />
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-tertiary)]/10 flex items-center justify-center">
              <Info size={20} style={{ color: 'var(--color-tertiary)' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-heading)' }}>Quick Tips</h2>
          </div>
          
          <div className="feature-card p-5">
            <ul className="space-y-3 text-sm text-[var(--color-text)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                <span><strong className="text-[var(--color-heading)]">SQL is case-insensitive</strong> — SELECT, select, and SeLeCt all work the same</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                <span><strong className="text-[var(--color-heading)]">String values need quotes</strong> — Use 'text' not text</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                <span><strong className="text-[var(--color-heading)]">Column names don't need quotes</strong> — Use name not "name" (unless contains spaces)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                <span><strong className="text-[var(--color-heading)]">Always use WHERE with UPDATE/DELETE</strong> — Or you'll update/delete all rows!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                <span><strong className="text-[var(--color-heading)]">Semicolons are optional</strong> — But recommended to end statements</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Get Started */}
        <section>
          <div className="feature-card p-6 text-center">
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>Ready to practice?</h3>
            <p className="text-sm text-[var(--color-text)] mb-4">Start solving SQL problems or open the playground to experiment</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/practice" className="btn-primary px-6 py-2.5 text-sm">
                Go to Practice
              </Link>
              <Link href="/playground" className="btn-secondary px-6 py-2.5 text-sm">
                Open Playground
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CodeBlock({ code, desc }) {
  return (
    <div className="p-4 rounded-lg border border-[var(--color-divider)] bg-[var(--color-bg-elevated)]">
      <code className="block font-mono text-sm text-[var(--color-heading)] mb-2 break-all">{code}</code>
      <p className="text-xs text-[var(--color-text-muted)]">{desc}</p>
    </div>
  );
}
