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
import { checkSolution } from '@/lib/sqlEngine';
import { cn } from '@/lib/utils';

const Workspace = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [code, setCode] = useState("-- Write your SQL query here\nSELECT * FROM users;");
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
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
        // console.log("run");
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
        // console.log("submit")
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
        setCurrentQuestion(question);
    }, []);

    return (
        <div className="h-[calc(100vh-4rem)] my-1 w-full bg-[var(--color-bg)] flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="h-12 border-b border-[var(--color-divider)] bg-[var(--color-bg-elevated)] flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowQuestionList(!showQuestionList)}
                        className={cn(
                            "p-2 rounded-lg border border-[var(--color-divider)] text-[var(--color-text)] hover:text-[var(--color-heading)] hover:border-[var(--color-divider-dark)] transition-all",
                            showQuestionList ? "bg-[var(--color-bg)] text-[var(--color-heading)]" : ""
                        )}
                        title="Toggle Question List"
                    >
                        <List size={18} />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRun}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-divider)] hover:bg-[var(--color-bg)] hover:border-[var(--color-divider-dark)] text-[var(--color-heading)] text-sm font-semibold rounded-lg transition-all"
                    >
                        <Play size={16} className="fill-[var(--color-heading)]" />
                        <span>Run</span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-heading)] text-[var(--color-bg)] border border-[var(--color-heading)] text-sm font-semibold rounded-lg hover:opacity-90 transition-all"
                    >
                        <CheckCheck size={16} />
                        Submit
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex max-h-[calc(100vh-4rem)]">
                {showQuestionList && (
                    <div className="absolute lg:relative z-50 w-72 shrink-0 max-h-[calc(100vh-5rem)] h-full border-r border-[var(--color-divider)] bg-[var(--color-bg-elevated)]">
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
                        <Panel defaultSize={40} minSize={20} className="bg-[var(--color-bg-elevated)]">
                            <ProblemDescription question={currentQuestion} />
                        </Panel>

                        <PanelResizeHandle className="w-1 bg-[var(--color-divider)] hover:bg-[var(--color-accent)] transition-colors cursor-col-resize flex items-center justify-center" />

                        {/* Right Panel: Editor & Results */}
                        <Panel minSize={30}>
                            <PanelGroup direction="vertical">
                                {/* Top: Code Editor */}
                                <Panel defaultSize={60} minSize={20} className="bg-[#1E1E2E] border-b border-[var(--color-divider)]">
                                    <CodeEditor code={code} setCode={setCode} onRunQuery={handleRun} />
                                </Panel>

                                <PanelResizeHandle className="h-1 bg-[var(--color-divider)] hover:bg-[var(--color-accent)] transition-colors cursor-row-resize flex items-center justify-center" />

                                {/* Bottom: Test Results */}
                                <Panel minSize={20} className="bg-[var(--color-bg-elevated)]">
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
