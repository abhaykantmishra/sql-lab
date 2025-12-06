"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, RotateCcw, Database } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import QueryResults from '@/components/QueryResults';
import { initPersistantSqlEngine, runPersistentQuery } from '@/lib/sqlEngine';

export default function PlaygroundPage() {
    const [code, setCode] = useState("-- Write your SQL here\nSELECT 1;");
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [isEngineReady, setIsEngineReady] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    // Initialize Persistent Engine
    useEffect(() => {
        const init = async () => {
            try {
                await initPersistantSqlEngine();
                setIsEngineReady(true);
            } catch (e) {
                console.error("Failed to init persistent engine:", e);
                setError("Failed to initialize database engine.");
            }
        };
        init();

        // Load saved code
        const savedCode = localStorage.getItem('playground_sql');
        if (savedCode) {
            setCode(savedCode);
        }
    }, []);

    // Save code on change
    useEffect(() => {
        localStorage.setItem('playground_sql', code);
    }, [code]);


    const handleRun = async () => {
        console.log("Running query");
        if (!isEngineReady) return;
        console.log("Engine ready");
        setIsRunning(true);
        setError(null);
        setResults(null);

        try {
            const { results: queryResults, error: queryError } = await runPersistentQuery(code);
            if (queryError) {
                setError(queryError);
            } else {
                setResults(queryResults);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsRunning(false);
        }
    };




    const handleReset = () => {
        setCode("-- Write your SQL here\n");
        setResults(null);
        setError(null);
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={50} minSize={20}>
                        <div className="h-full flex flex-col">
                            <div className="flex-1 relative">
                                <CodeEditor code={code} setCode={setCode} onRunQuery={handleRun} status={isEngineReady ? "ready" : "loading"} />
                            </div>
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-blue-500 transition-colors" />

                    <Panel defaultSize={50} minSize={20}>
                        <div className="h-full overflow-hidden">
                            <QueryResults results={results} error={error} 
                                children= {
                                    <div className="flex items-center gap-2">
                                        <button
                                                onClick={handleReset}
                                            className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                                            title="Reset Editor"
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                        <button
                                            onClick={handleRun}
                                            disabled={!isEngineReady || isRunning}
                                            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                        >
                                            <Play size={16} className={isRunning ? "animate-pulse" : ""} />
                                            {isRunning ? 'Running...' : <>Run <span className='text-xs text-center border border-white p-0.5 rounded-10'>Ctrl+k</span></>}
                                        </button>
                                    </div>
                                }  
                            />
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}
