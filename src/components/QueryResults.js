import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResultTable = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-muted-foreground font-bold">No data returned.</p>;

    const columns = Object.keys(data[0]);

    return (
        <div className="overflow-x-auto border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_currentColor] bg-background">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className="p-2 border-b-[1.5px] border-foreground bg-foreground font-bold text-background uppercase text-xs tracking-wider">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="hover:bg-foreground hover:text-background group transition-colors">
                            {columns.map((col, j) => (
                                <td key={j} className="p-2 border-b border-foreground/50 font-mono text-sm border-r border-foreground/50 last:border-r-0 border-dashed group-hover:border-background/50">
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-2 border-t-[1.5px] border-foreground bg-background text-foreground text-xs font-mono font-bold text-right">
                {data.length} ROWS
            </div>
        </div>
    );
};

const QueryResults = ({ results, error, children }) => {
    return (
        <div className="h-full flex flex-col bg-background border-t-[1.5px] border-border text-foreground font-mono">
            <div className="flex items-center justify-between border-b-[1.5px] border-border bg-muted px-4 py-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase">
                    <CheckCircle2 size={16} className="text-foreground" />
                    Query Results
                </h3>
                {children}
            </div>
            <div className="flex-1 p-4 overflow-auto bg-background">
                {error ? (
                    <div className="p-4 bg-red-100 border-[1.5px] border-destructive text-destructive flex items-start gap-3 shadow-[2px_2px_0px_0px_currentColor]">
                        <AlertCircle className="shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="font-bold uppercase">Execution Error</p>
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
                    <div className="p-4 bg-background border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_currentColor]">
                        <p className="font-bold text-foreground mb-2 uppercase">Ready to run</p>
                        <p className="text-sm opacity-80">Execute a query to see results here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QueryResults;
