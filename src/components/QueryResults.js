import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResultTable = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-zinc-500">No data returned.</p>;

    const columns = Object.keys(data[0]);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className="p-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-zinc-100">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                            {columns.map((col, j) => (
                                <td key={j} className="p-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-4 text-xs text-zinc-500">{data.length} rows returned.</p>
        </div>
    );
};

const QueryResults = ({ results, error, children }) => {
    return (
        <div className="h-full flex flex-col bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    Query Results
                </h3>
                {children}
            </div>
            <div className="flex-1 p-4 overflow-auto">
                {error ? (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-start gap-3">
                        <AlertCircle className="shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="font-semibold">Execution Error</p>
                            <p className="font-mono mt-1">{error}</p>
                        </div>
                    </div>
                ) : results ? (
                    <div className="space-y-4">
                        <div>
                            <ResultTable data={results} />
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Ready to run</p>
                        <p className="text-sm text-zinc-500">Execute a query to see results here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QueryResults;
