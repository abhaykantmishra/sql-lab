import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, AlertCircle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResultTable = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-[var(--color-text-muted)] font-medium">No data.</p>;

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

const TestResults = ({ results, error, status }) => {
    const [activeTab, setActiveTab] = useState('results');
    const [activeCaseIndex, setActiveCaseIndex] = useState(0);

    useEffect(() => {
        setActiveCaseIndex(0);
    }, [results]);

    const isMultiCase = Array.isArray(results) && results.length > 0;
    const currentResult = isMultiCase ? results[activeCaseIndex] : null;

    const resultData = currentResult ? (currentResult.userResult || currentResult.data) : null;
    const resultError = currentResult ? (currentResult.error) : error;
    const resultStatus = currentResult ? (currentResult.passed !== undefined ? (currentResult.passed ? 'Passed' : 'Failed') : null) : null;
    const inputLabel = currentResult ? (currentResult.input || currentResult.testCaseInput || `Case ${activeCaseIndex + 1}`) : '';

    return (
        <div className="h-full flex flex-col bg-[var(--color-bg-elevated)] border-t border-[var(--color-divider)] text-[var(--color-heading)] font-mono">
            <div className="flex items-center border-b border-[var(--color-divider)] overflow-x-auto bg-[var(--color-bg)]">
                <button
                    onClick={() => setActiveTab('results')}
                    className={cn(
                        "px-4 py-2.5 text-sm font-semibold flex items-center gap-2 border-r border-[var(--color-divider)] transition-colors shrink-0",
                        activeTab === 'results'
                            ? "bg-[var(--color-heading)] text-[var(--color-bg)]"
                            : "bg-transparent text-[var(--color-text)] hover:text-[var(--color-heading)] hover:bg-[var(--color-bg-elevated)]"
                    )}
                >
                    <CheckCircle2 size={16} />
                    Test Results
                </button>
                <button
                    onClick={() => setActiveTab('console')}
                    className={cn(
                        "px-4 py-2.5 text-sm font-semibold flex items-center gap-2 border-r border-[var(--color-divider)] transition-colors shrink-0",
                        activeTab === 'console'
                            ? "bg-[var(--color-heading)] text-[var(--color-bg)]"
                            : "bg-transparent text-[var(--color-text)] hover:text-[var(--color-heading)] hover:bg-[var(--color-bg-elevated)]"
                    )}
                >
                    <Terminal size={16} />
                    Console
                </button>
                {status && (
                    <div className={cn(
                        "ml-auto mr-4 px-3 py-1 rounded-full text-xs font-semibold shrink-0",
                        status === 'Passed' ? "bg-[var(--color-success)]/10 text-[var(--color-success)]" :
                            status === 'Failed' ? "bg-[var(--color-error)]/10 text-[var(--color-error)]" :
                                "bg-[var(--color-bg-elevated)] text-[var(--color-text)]"
                    )}>
                        {status}
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-bg)]">
                {activeTab === 'results' ? (
                    <>
                        {isMultiCase && (
                            <div className="flex border-b border-[var(--color-divider)] overflow-x-auto bg-[var(--color-bg-elevated)]">
                                {results.map((res, idx) => {
                                    const isPassed = res.passed === true;
                                    const isFailed = res.passed === false;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveCaseIndex(idx)}
                                            className={cn(
                                                "px-4 py-2 text-xs font-medium border-r border-[var(--color-divider)] hover:bg-[var(--color-bg)] transition-colors flex items-center gap-2 shrink-0",
                                                activeCaseIndex === idx ? "bg-[var(--color-bg)] text-[var(--color-heading)]" : "text-[var(--color-text-muted)]"
                                            )}
                                        >
                                            {isPassed && <Check size={12} style={{ color: 'var(--color-success)' }} />}
                                            {isFailed && <X size={12} style={{ color: 'var(--color-error)' }} />}
                                            {res.input || res.testCaseInput || `Case ${idx + 1}`}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div className="flex-1 p-4 overflow-auto">
                            {resultError ? (
                                <div className="p-4 rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 flex items-start gap-3">
                                    <AlertCircle className="shrink-0 mt-0.5" size={18} style={{ color: 'var(--color-error)' }} />
                                    <div>
                                        <p className="font-semibold uppercase" style={{ color: 'var(--color-error)' }}>Error Execution</p>
                                        <p className="font-mono mt-1 whitespace-pre-wrap text-sm" style={{ color: 'var(--color-text)' }}>{resultError}</p>
                                    </div>
                                </div>
                            ) : resultData ? (
                                <div className="space-y-5">
                                    {resultStatus && (
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold",
                                            resultStatus === 'Passed' ? "bg-[var(--color-success)]/10 text-[var(--color-success)]" : "bg-[var(--color-error)]/10 text-[var(--color-error)]"
                                        )}>
                                            {resultStatus === 'Passed' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                            {resultStatus}
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-2 uppercase tracking-wide">Your Output</h4>
                                        <ResultTable data={resultData} />
                                    </div>

                                    {currentResult?.expectedResult && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-2 uppercase tracking-wide">Expected Output</h4>
                                            <ResultTable data={currentResult.expectedResult} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 rounded-lg border border-[var(--color-divider)] bg-[var(--color-bg-elevated)]">
                                    <p className="font-medium text-[var(--color-heading)] mb-2 uppercase text-sm">Ready to Run</p>
                                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Execute your query to see the results here.</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="p-4 font-mono text-sm text-[var(--color-text)]">
                        <p className="font-medium" style={{ color: 'var(--color-success)' }}>$ System Ready...</p>
                        <p className="opacity-70">Waiting for query execution...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestResults;
