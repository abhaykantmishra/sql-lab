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

        const savedCode = localStorage.getItem('playground_sql');
        if (savedCode) {
            setCode(savedCode);
        }
    }, []);

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

        console.log(`Uploading data to table ${tableName}`);

        const headers = Object.keys(data[0]);
        const tableHeaders = headers.map(h => {
            let headerName = h.replace(" ", "_")
            headerName = headerName.replace(/[^a-zA-Z0-9_]/g, "")
            headerName = headerName.toLowerCase()
            return headerName
        })
        const createTableSql = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableHeaders.map(h => `${h} TEXT`).join(', ')});`;

        try {
            const initialSql = createTableSql + '\n' + '\n'
                + "-- Change the above data type of table as you want default is TEXT for all" + '\n'
                + "-- You can also add constraints on columns" + '\n'
                + "-- You dont need to change data types of values in `INSERT INTO` statements below" + '\n'
                + "-- Run the query to get the table info" + '\n'
            setCode(initialSql);

            const insertStatements = [];

            data?.forEach(row => {
                const values = headers.map(h => {
                    const val = row[h];
                    if (val === null || val === undefined) return 'NULL';
                    return `'${String(val).replace(/'/g, "''")}'`;
                });
                insertStatements.push(`INSERT INTO ${tableName} (${tableHeaders.join(', ')}) VALUES (${values.join(', ')});`);
            });

            let insertUiStatements = "";
            data?.slice(0, 10)?.forEach(row => {
                const values = headers.map(h => {
                    const val = row[h];
                    if (val === null || val === undefined) return 'NULL';
                    return `'${String(val).replace(/'/g, "''")}'`;
                });
                insertUiStatements += `INSERT INTO ${tableName} (${tableHeaders.join(', ')}) VALUES (${values.join(', ')});\n`;
            });

            const batchSql = insertStatements.join('\n');

            const finalUISql = initialSql + '\n' + insertUiStatements + '\n' +
                "-- Check the table info" + '\n' +
                `SELECT name as column,type FROM pragma_table_info('${tableName}');` + '\n'
            setError(null);
            setResults(null);

            const finalSql = initialSql + '\n' + batchSql + '\n' +
                "-- Check the table info" + '\n' +
                `SELECT name as column,type FROM pragma_table_info('${tableName}');` + '\n'

            setCode(finalSql);

        } catch (err) {
            console.error("Upload failed:", err);
            setError(err.message)
            throw err;
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
        
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col bg-[var(--color-bg)] text-[var(--color-heading)] font-mono">
            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={50} minSize={20}>
                        <div className="h-full flex flex-col border-r border-[var(--color-divider)]">
                            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-divider)] bg-[var(--color-bg-elevated)]">
                                <div className="flex items-center gap-2 text-sm font-semibold uppercase text-[var(--color-heading)]">
                                    <Database size={16} style={{ color: 'var(--color-accent)' }} />
                                    <span>SQL Editor</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CsvUploader onDataUpload={handleDataUpload} />
                                </div>
                            </div>
                            <div className="flex-1 relative bg-[var(--color-bg-elevated)]">
                                <CodeEditor code={code} setCode={setCode} onRunQuery={handleRun} onSave={handleSave} status={isEngineReady ? "ready" : "loading"} />
                            </div>
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-[var(--color-divider)] hover:bg-[var(--color-accent)] transition-colors cursor-col-resize flex items-center justify-center" />

                    <Panel defaultSize={50} minSize={20}>
                        <div className="h-full overflow-hidden bg-[var(--color-bg-elevated)]">
                            <QueryResults results={results} error={error}
                                children={
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleGetTables}
                                            disabled={!isEngineReady || isRunning}
                                            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-divider)] hover:bg-[var(--color-bg)] hover:border-[var(--color-divider-dark)] text-[var(--color-heading)] text-sm font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Show Tables
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="p-2 text-[var(--color-text)] hover:text-[var(--color-heading)] hover:bg-[var(--color-bg)] rounded-lg transition-all"
                                            title="Reset Editor"
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                        <button
                                            onClick={handleRun}
                                            disabled={!isEngineReady || isRunning}
                                            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-heading)] text-[var(--color-bg)] border border-[var(--color-heading)] text-sm font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Play size={16} className={isRunning ? "animate-pulse fill-[var(--color-bg)]" : "fill-[var(--color-bg)]"} />
                                            {isRunning ? 'Running...' : 'Run'}
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
