import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResultTable = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-[var(--color-text-muted)] font-medium">No data returned.</p>;

    const columns = Object.keys(data[0]);

    return (
        <div className="overflow-x-auto rounded-lg border border-[var(--color-divider)] bg-[var(--color-bg-elevated)]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className="p-3 border-b border-[var(--color-divider)] bg-[var(--color-bg)] font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-heading)' }}>
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="hover:bg-[var(--color-bg)] transition-colors">
                            {columns.map((col, j) => (
                                <td key={j} className="p-3 border-b border-[var(--color-divider)] font-mono text-sm" style={{ color: 'var(--color-text)' }}>
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-2 border-t border-[var(--color-divider)] bg-[var(--color-bg)] text-xs font-mono font-medium text-right" style={{ color: 'var(--color-text-muted)' }}>
                {data.length} ROWS
            </div>
        </div>
    );
};

const QueryResults = ({ results, error, children }) => {
    return (
        <div className="h-full flex flex-col bg-[var(--color-bg-elevated)] border-t border-[var(--color-divider)] text-[var(--color-heading)] font-mono">
            <div className="flex items-center justify-between border-b border-[var(--color-divider)] bg-[var(--color-bg)] px-4 py-2.5">
                <h3 className="text-sm font-semibold text-[var(--color-heading)] flex items-center gap-2">
                    <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} />
                    Query Results
                </h3>
                {children}
            </div>
            <div className="flex-1 p-4 overflow-auto bg-[var(--color-bg)]">
                {error ? (
                    <div className="p-4 rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 flex items-start gap-3">
                        <AlertCircle className="shrink-0 mt-0.5" size={18} style={{ color: 'var(--color-error)' }} />
                        <div>
                            <p className="font-semibold uppercase" style={{ color: 'var(--color-error)' }}>Execution Error</p>
                            <p className="font-mono mt-1 text-sm" style={{ color: 'var(--color-text)' }}>{error}</p>
                        </div>
                    </div>
                ) : results ? (
                    <div className="space-y-4">
                        <div>
                            <ResultTable data={results} />
                        </div>
                    </div>
                ) : (
                    <div className="p-4 rounded-lg border border-[var(--color-divider)] bg-[var(--color-bg-elevated)]">
                        <p className="font-medium text-[var(--color-heading)] mb-2 uppercase text-sm">Ready to run</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Execute a query to see results here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QueryResults;
