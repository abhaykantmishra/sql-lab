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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

        if (isMobile)
            setShowQuestionList(false);

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
        <div className="h-[calc(100vh-5rem)] my-1 w-full bg-background flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="h-10 border-b-[1.5px] border-border bg-background flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowQuestionList(!showQuestionList)}
                        className={cn(
                            "p-1.5 border-[1.5px] border-transparent hover:border-border hover:shadow-[2px_2px_0px_0px_currentColor] text-foreground transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
                            showQuestionList ? "bg-muted border-border shadow-[2px_2px_0px_0px_currentColor]" : ""
                        )}
                        title="Toggle Question List"
                    >
                        <List size={18} />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRun}
                        className="flex items-center gap-2 px-4 py-1.5 bg-background border-[1.5px] border-border hover:bg-muted text-foreground text-sm font-bold shadow-[2px_2px_0px_0px_currentColor] hover:shadow-[3px_3px_0px_0px_currentColor] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
                    >
                        <Play size={16} className="fill-foreground" />
                        {<>Run <span className='text-xs text-center border-[1.5px] border-border p-0.5 hidden md:flex flex-row gap-1 items-center bg-muted'> Ctrl+ <CornerDownLeft className='text-xs text-center w-3 h-3' /></span></>}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-1.5 bg-foreground border-[1.5px] border-foreground hover:opacity-90 text-background text-sm font-bold shadow-[2px_2px_0px_0px_currentColor] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
                    >
                        <CheckCheck size={16} />
                        Submit
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex max-h-[calc(100vh-5rem)]">
                {showQuestionList && (
                    <div className="absolute lg:relative z-50 w-72 shrink-0 max-h-[calc(100vh-6rem)] h-full border-r-[1.5px] border-border bg-background">
                        <QuestionList
                            questions={QUESTIONS}
                            currentQuestionId={currentQuestion?.id}
                            onSelectQuestion={handleSelectQuestion}
                        />
                    </div>
                )}

                <div className="md:flex-1 h-full w-full overflow-hidden">
                    <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
                        {/* Left Panel: Problem Description */}
                        <Panel defaultSize={40} minSize={20} className="bg-background">
                            <ProblemDescription question={currentQuestion} />
                        </Panel>

                        <PanelResizeHandle className="w-[1.5px] bg-border hover:bg-foreground transition-colors cursor-col-resize flex items-center justify-center">
                            <div className="h-8 w-1 bg-background"></div>
                        </PanelResizeHandle>

                        {/* Right Panel: Editor & Results */}
                        <Panel minSize={30}>
                            <PanelGroup direction="vertical">
                                {/* Top: Code Editor */}
                                <Panel defaultSize={60} minSize={20} className="bg-[#1e1e1e] border-b-[1.5px] border-border">
                                    <CodeEditor code={code} setCode={setCode} onRunQuery={handleRun} />
                                </Panel>

                                <PanelResizeHandle className="h-[1.5px] bg-border hover:bg-foreground transition-colors cursor-row-resize flex items-center justify-center">
                                    <div className="w-8 h-1 bg-background"></div>
                                </PanelResizeHandle>

                                {/* Bottom: Test Results */}
                                <Panel minSize={20} className="bg-background">
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
