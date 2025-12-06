"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, RotateCcw, Database } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import QueryResults from '@/components/QueryResults';
import CsvUploader from '@/components/CsvUploader';
import { initPersistantSqlEngine, runPersistentQuery } from '@/lib/sqlEngine';

export default function PlaygroundPage() {
    const [code, setCode] = useState("-- Write your SQL here\nSELECT 1;");
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [isEngineReady, setIsEngineReady] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [availableTables, setAvailableTables] = useState(null);

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
            console.error(e)
            setError(e.message);
        } finally {
            setIsRunning(false);
        }
    };

    const handleDataUpload = async (tableName, data) => {
        if (!data || data.length === 0) return;

        console.log(`Uploading data to table ${tableName}`, data);

        // 1. Create Table
        const headers = Object.keys(data[0]);
        const tableHeaders = headers.map(h => {
            // remove space with underscore
            let headerName = h.replace(" ", "_")
            // remove special characters
            headerName = headerName.replace(/[^a-zA-Z0-9_]/g, "")
            // to lowercase
            headerName = headerName.toLowerCase()
            return headerName
        })
        const createTableSql = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableHeaders.map(h => `${h} TEXT`).join(', ')});`;

        try {
            // await runPersistentQuery(createTableSql);
            const initialSql = createTableSql + '\n' + '\n'
                    +"-- Change the above data type of table as you want default is TEXT for all" + '\n'
                    +"-- You can also add constraints on columns" + '\n'
                    +"-- If you have changed the data type of table then you also have to change them in below lines" + '\n'
            setCode(initialSql);

            // 2. Insert Data - TODO: Batch Insert
            const insertStatements = [];
            // insertStatements.push('BEGIN TRANSACTION;');

            data.forEach(row => {
                const values = headers.map(h => {
                    const val = row[h];
                    if (val === null || val === undefined) return 'NULL';
                    // Escape single quotes
                    return `'${String(val).replace(/'/g, "''")}'`;
                });
                insertStatements.push(`INSERT INTO ${tableName} (${tableHeaders.join(', ')}) VALUES (${values.join(', ')});`);
            });

            // insertStatements.push('COMMIT;');

            const batchSql = insertStatements.join('\n');
            // setCode(prev => ({...prev, insertStatements.join('\n')}));
            // setCode(prev => {
            //     return prev + '\n' + batchSql;
            // })

            // some check at last
            const finalSql = initialSql + '\n' + batchSql + '\n' + 
                "-- Check the table info" + '\n' +
                `SELECT name as column,type FROM pragma_table_info('${tableName}');` + '\n'
                // + `SELECT * FROM ${tableName} limit 10;` + '\n'
            setError(null);
            setResults(null);
            setCode(finalSql);
            
            // const { results, error } = await runPersistentQuery(batchSql);

            // if (error) {
            //     setError(error)
            // }else {
            //     setResults(results ?? "")
            // }

        } catch (err) {
            console.error("Upload failed:", err);
            setError(err.message)
            throw err; // Propagate to CsvUploader to show error
        }
    };

    const handleGetTables = async () => {
        setError(null);
        setResults(null);
        try {
            const {results: queryResults, error: queryError}  = await runPersistentQuery("SELECT name FROM sqlite_master WHERE type='table';");
            if (queryError) {
                setError(queryError);
            } else {
                setResults(queryResults);
            }
        } catch (error) {
            console.error(error)
            setError(error.message)
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
                            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                    <Database size={16} />
                                    <span>SQL Editor</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CsvUploader onDataUpload={handleDataUpload} />
                                </div>
                            </div>
                            <div className="flex-1 relative">
                                <CodeEditor code={code} setCode={setCode} onRunQuery={handleRun} status={isEngineReady ? "ready" : "loading"} />
                            </div>
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-blue-500 transition-colors" />

                    <Panel defaultSize={50} minSize={20}>
                        <div className="h-full overflow-hidden">

                            <QueryResults results={results} error={error}
                                children={
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleGetTables}
                                            disabled={!isEngineReady || isRunning}
                                            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                        >
                                            Show Tables 
                                        </button>
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
