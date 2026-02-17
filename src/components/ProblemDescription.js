import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProblemDescription = ({ question }) => {
    if (!question) return <div className="p-6">Select a question</div>;

    return (
        <div className="h-full overflow-y-auto p-6 bg-background text-white scrollbar-thin scrollbar-thumb-foreground scrollbar-track-transparent">
            <div className="prose max-w-none prose-sm prose-p:font-mono prose-headings:font-bold prose-headings:uppercase prose-pre:bg-foreground prose-pre:text-background prose-pre:border-[1.5px] prose-pre:border-foreground prose-pre:rounded-none prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-strong:text-foreground prose-a:text-blue-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {question.markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default ProblemDescription;
