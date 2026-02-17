import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, AlertCircle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResultTable = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-muted-foreground font-bold">No data.</p>;

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

const TestResults = ({ results, error, status }) => {
    const [activeTab, setActiveTab] = useState('results');
    const [activeCaseIndex, setActiveCaseIndex] = useState(0);

    // Reset active case when results change
    useEffect(() => {
        setActiveCaseIndex(0);
    }, [results]);

    const isMultiCase = Array.isArray(results) && results.length > 0;
    const currentResult = isMultiCase ? results[activeCaseIndex] : null;

    // Normalize result data
    const resultData = currentResult ? (currentResult.userResult || currentResult.data) : null;
    const resultError = currentResult ? (currentResult.error) : error;
    const resultStatus = currentResult ? (currentResult.passed !== undefined ? (currentResult.passed ? 'Passed' : 'Failed') : null) : null;
    const inputLabel = currentResult ? (currentResult.input || currentResult.testCaseInput || `Case ${activeCaseIndex + 1}`) : '';

    return (
        <div className="h-full flex flex-col bg-background border-t-[1.5px] border-border text-foreground font-mono">
            <div className="flex items-center border-b-[1.5px] border-border overflow-x-auto bg-muted">
                <button
                    onClick={() => setActiveTab('results')}
                    className={cn(
                        "px-4 py-2 text-sm font-bold flex items-center gap-2 border-r-[1.5px] border-border transition-colors shrink-0 uppercase",
                        activeTab === 'results'
                            ? "bg-foreground text-background"
                            : "bg-transparent text-foreground hover:bg-foreground/10"
                    )}
                >
                    <CheckCircle2 size={16} />
                    Test Results
                </button>
                <button
                    onClick={() => setActiveTab('console')}
                    className={cn(
                        "px-4 py-2 text-sm font-bold flex items-center gap-2 border-r-[1.5px] border-border transition-colors shrink-0 uppercase",
                        activeTab === 'console'
                            ? "bg-foreground text-background"
                            : "bg-transparent text-foreground hover:bg-foreground/10"
                    )}
                >
                    <Terminal size={16} />
                    Console
                </button>
                {status && (
                    <div className={cn(
                        "ml-auto mr-4 px-3 py-1 border-[1.5px] border-foreground text-xs font-bold uppercase shrink-0 shadow-[2px_2px_0px_0px_currentColor]",
                        status === 'Passed' ? "bg-green-500 text-white" :
                            status === 'Failed' ? "bg-destructive text-white" :
                                "bg-background text-foreground"
                    )}>
                        {status}
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col overflow-hidden bg-background">
                {activeTab === 'results' ? (
                    <>
                        {isMultiCase && (
                            <div className="flex border-b-[1.5px] border-border overflow-x-auto bg-muted">
                                {results.map((res, idx) => {
                                    const isPassed = res.passed === true;
                                    const isFailed = res.passed === false;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveCaseIndex(idx)}
                                            className={cn(
                                                "px-4 py-2 text-xs font-bold border-r-[1.5px] border-border hover:bg-foreground/10 transition-colors flex items-center gap-2 shrink-0 uppercase",
                                                activeCaseIndex === idx ? "bg-background text-foreground" : "text-muted-foreground"
                                            )}
                                        >
                                            {isPassed && <Check size={12} className="text-green-600" />}
                                            {isFailed && <X size={12} className="text-destructive" />}
                                            {res.input || res.testCaseInput || `Case ${idx + 1}`}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div className="flex-1 p-4 overflow-auto">
                            {resultError ? (
                                <div className="p-4 bg-red-100 border-[1.5px] border-destructive text-destructive flex items-start gap-3 shadow-[2px_2px_0px_0px_currentColor]">
                                    <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="font-bold uppercase">Error Execution</p>
                                        <p className="font-mono mt-1 whitespace-pre-wrap">{resultError}</p>
                                    </div>
                                </div>
                            ) : resultData ? (
                                <div className="space-y-6">
                                    {resultStatus && (
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1 border-[1.5px] border-foreground text-sm font-bold shadow-[2px_2px_0px_0px_currentColor] uppercase",
                                            resultStatus === 'Passed' ? "bg-green-500 text-white" : "bg-destructive text-white"
                                        )}>
                                            {resultStatus === 'Passed' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                            {resultStatus}
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="text-sm font-bold text-foreground mb-2 uppercase border-b-[1.5px] border-foreground inline-block">Your Output</h4>
                                        <ResultTable data={resultData} />
                                    </div>

                                    {currentResult?.expectedResult && (
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground mb-2 uppercase border-b-[1.5px] border-foreground inline-block">Expected Output</h4>
                                            <ResultTable data={currentResult.expectedResult} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 bg-background border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_currentColor]">
                                    <p className="font-bold text-foreground mb-2 uppercase">Ready to Run</p>
                                    <p className="text-sm opacity-80">Execute your query to see the results here.</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="p-4 font-mono text-sm text-foreground">
                        <p className="text-green-600 font-bold">$ System Ready...</p>
                        <p className="opacity-70">Waiting for query execution...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestResults;
