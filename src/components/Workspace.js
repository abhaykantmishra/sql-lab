"use client";
import React, { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ProblemDescription from './ProblemDescription';
import CodeEditor from './CodeEditor';
import TestResults from './TestResults';
import QuestionList from './QuestionList';
import { Play, CheckCheck, List, CornerDownLeft } from 'lucide-react';
import { getQuestionById } from '@/lib/questionLoader';
import { QUESTIONS } from '@/questions-bank/questions-list';
import { runQuery, checkSolution } from '@/lib/sqlEngine';
import { cn } from '@/lib/utils';

const Workspace = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [code, setCode] = useState("-- Write your SQL query here\nSELECT * FROM users;");
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null); // 'Passed' | 'Failed' | null
    const [showQuestionList, setShowQuestionList] = useState(true);

    const handleRun = async () => {
        console.log("run");
        setStatus('Running...');

        const { passed, results, error } = await checkSolution(
            currentQuestion.testCases,
            code
        );

        if (error) {
            setError(error);
            setResults(null);
            setStatus('Failed');
        } else {
            setError(null);
            setResults(results);
            setStatus(passed ? 'Passed' : 'Failed');
        }
    };

    const handleSubmit = async () => {
        console.log("submit")
        setStatus('Running...');
        const { passed, results, error } = await checkSolution(
            currentQuestion.testCases,
            code
        );

        if (error) {
            setError(error);
            setResults(null);
            setStatus('Failed');
        } else {
            setError(null);
            // Pass all results to TestResults
            setResults(results);
            setStatus(passed ? 'Passed' : 'Failed');
        }
    };

    const handleSelectQuestion = (question) => {
        const q = getQuestionById(question.id);
        setCurrentQuestion(q);
        setCode("-- Write your SQL query here\n");
        setResults(null);
        setError(null);
        setStatus(null);
    };

    useEffect(() => {
        const question = getQuestionById(1);
        // console.log(question)
        setCurrentQuestion(question);
    }, []);

    return (
        <div className="h-[calc(100vh-5rem)] my-1 w-full bg-zinc-950 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="h-8 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowQuestionList(!showQuestionList)}
                        className={cn(
                            "p-2 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors",
                            showQuestionList ? "bg-zinc-800 text-zinc-100" : ""
                        )}
                        title="Toggle Question List"
                    >
                        <List size={15} />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRun}
                        className="flex items-center gap-2 px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded text-sm font-medium transition-colors"
                    >
                        <Play size={16} className="fill-zinc-100" />
                        {<>Run <span className='text-xs text-center border border-white p-0.5 rounded-10 hidden md:flex flex-row'> Ctrl+ <CornerDownLeft className='text-xs text-center w-4 h-4' /></span></>}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
                    >
                        <CheckCheck size={16} />
                        Submit
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex">
                {showQuestionList && (
                    <div className="w-64 shrink-0 h-full border-r border-zinc-800 hidden md:block">
                        <QuestionList
                            questions={QUESTIONS}
                            currentQuestionId={currentQuestion?.id}
                            onSelectQuestion={handleSelectQuestion}
                        />
                    </div>
                )}

                <div className="flex-1 h-full overflow-hidden">
                    <PanelGroup direction="horizontal">
                        {/* Left Panel: Problem Description */}
                        <Panel defaultSize={40} minSize={20}>
                            <ProblemDescription question={currentQuestion} />
                        </Panel>

                        <PanelResizeHandle className="w-1.5 bg-zinc-900 hover:bg-zinc-700 transition-colors cursor-col-resize" />

                        {/* Right Panel: Editor & Results */}
                        <Panel minSize={30}>
                            <PanelGroup direction="vertical">
                                {/* Top: Code Editor */}
                                <Panel defaultSize={60} minSize={20}>
                                    <CodeEditor code={code} setCode={setCode} onRunQuery={handleRun} />
                                </Panel>

                                <PanelResizeHandle className="h-1.5 bg-zinc-900 hover:bg-zinc-700 transition-colors cursor-row-resize" />

                                {/* Bottom: Test Results */}
                                <Panel minSize={20}>
                                    <TestResults results={results} error={error} status={status} />
                                </Panel>
                            </PanelGroup>
                        </Panel>
                    </PanelGroup>
                </div>
            </div>
        </div>
    );
};

export default Workspace;
