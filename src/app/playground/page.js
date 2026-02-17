"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, RotateCcw, Database, CornerDownLeft } from 'lucide-react';
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
    // useEffect(() => {
    //     localStorage.setItem('playground_sql', code);
    // }, [code]);

    // On save save code to localstorage
    const handleSave = () => {
        try {
            localStorage.setItem('playground_sql', code);
        } catch (error) {
            console.error(error)
        }
    }

    const handleRun = async () => {
        console.log("Running query");
        if (!isEngineReady) return;
        console.log("Engine ready");
        setIsRunning(true);
        setError(null);
        setResults(null);

        try {
            // console.log("sql:", sql)
            // let query = !sql ? code : sql;
            // console.log("query:", query)
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
        setResults(null);
        setError(null);
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
                + "-- Change the above data type of table as you want default is TEXT for all" + '\n'
                + "-- You can also add constraints on columns" + '\n'
                + "-- You dont need to change data types of values in `INSERT INTO` statements below" + '\n'
                + "-- Run the query to get the table info" + '\n'
            // +"SELECT name as column,type FROM pragma_table_info('" + tableName + "');" + '\n'
            setCode(initialSql);

            // 2. Insert Data - TODO: Batch Insert
            const insertStatements = [];
            // insertStatements.push('BEGIN TRANSACTION;');

            data?.forEach(row => {
                const values = headers.map(h => {
                    const val = row[h];
                    if (val === null || val === undefined) return 'NULL';
                    // Escape single quotes
                    return `'${String(val).replace(/'/g, "''")}'`;
                });
                insertStatements.push(`INSERT INTO ${tableName} (${tableHeaders.join(', ')}) VALUES (${values.join(', ')});`);
            });

            let insertUiStatements = "";
            // console.log(Array(data).slice(0,10))
            data?.slice(0, 10)?.forEach(row => {
                const values = headers.map(h => {
                    const val = row[h];
                    if (val === null || val === undefined) return 'NULL';
                    // Escape single quotes
                    return `'${String(val).replace(/'/g, "''")}'`;
                });
                insertUiStatements += `INSERT INTO ${tableName} (${tableHeaders.join(', ')}) VALUES (${values.join(', ')});\n`;
            });

            // insertStatements.push('COMMIT;');
            // on ui only showing max 10 rows for inserting other will be inserted in background


            const batchSql = insertStatements.join('\n');

            // some check at last
            const finalUISql = initialSql + '\n' + insertUiStatements + '\n' +
                "-- Check the table info" + '\n' +
                `SELECT name as column,type FROM pragma_table_info('${tableName}');` + '\n'
            // + `SELECT * FROM ${tableName} limit 10;` + '\n'
            setError(null);
            setResults(null);

            const finalSql = initialSql + '\n' + batchSql + '\n' +
                "-- Check the table info" + '\n' +
                `SELECT name as column,type FROM pragma_table_info('${tableName}');` + '\n'

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
        setResults(null);
        setError(null);
        try {
            const { results: queryResults, error: queryError } = await runPersistentQuery("SELECT name FROM sqlite_master WHERE type='table';");
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
        setSql(null)
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col bg-background text-foreground font-mono">

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={50} minSize={20}>
                        <div className="h-full flex flex-col border-r-[1.5px] border-border">
                            <div className="flex items-center justify-between px-4 py-2 border-b-[1.5px] border-border bg-background">
                                <div className="flex items-center gap-2 text-sm font-bold uppercase text-foreground">
                                    <Database size={16} />
                                    <span>SQL Editor</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CsvUploader onDataUpload={handleDataUpload} />
                                </div>
                            </div>
                            <div className="flex-1 relative bg-background">
                                <CodeEditor code={code} setCode={setCode} onRunQuery={handleRun} onSave={handleSave} status={isEngineReady ? "ready" : "loading"} />
                            </div>
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-[1.5px] bg-border hover:bg-foreground transition-colors cursor-col-resize flex items-center justify-center">
                        <div className="h-8 w-1 bg-background"></div>
                    </PanelResizeHandle>

                    <Panel defaultSize={50} minSize={20}>
                        <div className="h-full overflow-hidden bg-background">

                            <QueryResults results={results} error={error}
                                children={
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleGetTables}
                                            disabled={!isEngineReady || isRunning}
                                            className="flex items-center gap-2 px-4 py-1.5 bg-background border-[1.5px] border-foreground hover:bg-muted text-foreground text-sm font-bold shadow-[2px_2px_0px_0px_currentColor] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Show Tables
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="p-1.5 text-foreground hover:bg-muted border-[1.5px] border-transparent hover:border-foreground transition-all active:translate-x-[1px] active:translate-y-[1px]"
                                            title="Reset Editor"
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                        <button
                                            onClick={handleRun}
                                            disabled={!isEngineReady || isRunning}
                                            className="flex items-center gap-2 px-4 py-1.5 bg-foreground border-[1.5px] border-foreground hover:opacity-90 text-background text-sm font-bold shadow-[2px_2px_0px_0px_currentColor] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Play size={16} className={isRunning ? "animate-pulse fill-background" : "fill-background"} />
                                            {isRunning ? 'Running...' : <>Run <span className='text-xs text-center border-[1.5px] border-background p-0.5 flex flex-row justify-center items-center bg-transparent gap-1'>Ctrl+ <CornerDownLeft className='text-xs text-center w-3 h-3' /> </span></>}
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
