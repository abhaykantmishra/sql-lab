import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProblemDescription = ({ question }) => {
    if (!question) return <div className="p-6">Select a question</div>;

    return (
        <div className="h-full overflow-y-auto p-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
            <div className="prose dark:prose-invert max-w-none prose-sm prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-pre:text-zinc-900 dark:prose-pre:text-zinc-100">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {question.markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default ProblemDescription;
