import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, AlertCircle, Check, X } from 'lucide-react';
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
        <div className="h-full flex flex-col bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('results')}
                    className={cn(
                        "px-4 py-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors shrink-0",
                        activeTab === 'results'
                            ? "border-green-500 text-green-600 dark:text-green-400"
                            : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    )}
                >
                    <CheckCircle2 size={16} />
                    Test Results
                </button>
                <button
                    onClick={() => setActiveTab('console')}
                    className={cn(
                        "px-4 py-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors shrink-0",
                        activeTab === 'console'
                            ? "border-blue-500 text-blue-600 dark:text-blue-400"
                            : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    )}
                >
                    <Terminal size={16} />
                    Console
                </button>
                {status && (
                    <div className={cn(
                        "ml-auto mr-4 px-3 py-1 rounded-full text-xs font-bold uppercase shrink-0",
                        status === 'Passed' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                            status === 'Failed' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                    )}>
                        {status}
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                {activeTab === 'results' ? (
                    <>
                        {isMultiCase && (
                            <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto bg-zinc-50 dark:bg-zinc-900/50">
                                {results.map((res, idx) => {
                                    const isPassed = res.passed === true;
                                    const isFailed = res.passed === false;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveCaseIndex(idx)}
                                            className={cn(
                                                "px-4 py-2 text-xs font-medium border-r border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 shrink-0",
                                                activeCaseIndex === idx ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-500"
                                            )}
                                        >
                                            {isPassed && <Check size={12} className="text-green-500" />}
                                            {isFailed && <X size={12} className="text-red-500" />}
                                            {res.input || res.testCaseInput || `Case ${idx + 1}`}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div className="flex-1 p-4 overflow-auto">
                            {resultError ? (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-start gap-3">
                                    <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="font-semibold">Error Execution</p>
                                        <p className="font-mono mt-1">{resultError}</p>
                                    </div>
                                </div>
                            ) : resultData ? (
                                <div className="space-y-4">
                                    {resultStatus && (
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium",
                                            resultStatus === 'Passed' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        )}>
                                            {resultStatus === 'Passed' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                            {resultStatus}
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Your Output</h4>
                                        <ResultTable data={resultData} />
                                    </div>

                                    {currentResult?.expectedResult && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Expected Output</h4>
                                            <ResultTable data={currentResult.expectedResult} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                                    <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Run your code to see results</p>
                                    <p>The query results will appear here after execution.</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="p-4 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                        <p>$ Ready to execute SQL queries...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestResults;
