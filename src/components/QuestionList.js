import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

const QuestionList = ({ questions, currentQuestionId, onSelectQuestion }) => {
    return (
        <div className="h-full bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Questions</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {questions.map((q) => (
                    <button
                        key={q.id}
                        onClick={() => onSelectQuestion(q)}
                        className={cn(
                            "w-full text-left p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-100 dark:border-zinc-800/50 flex items-start gap-3",
                            currentQuestionId === q.id ? "bg-zinc-100 dark:bg-zinc-800" : ""
                        )}
                    >
                        <div className="mt-1">
                            {/* Placeholder for solved status */}
                            <Circle size={16} className="text-zinc-400" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm mb-1">{q.id}. {q.title}</div>
                            <div className={cn(
                                "text-xs font-medium mb-1",
                                q.difficulty === 'Easy' ? "text-green-600 dark:text-green-400" :
                                    q.difficulty === 'Medium' ? "text-yellow-600 dark:text-yellow-400" :
                                        "text-red-600 dark:text-red-400"
                            )}>
                                {q.difficulty}
                            </div>
                            {q.tags && q.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {q.tags.slice(0, 3).map((tag, idx) => (
                                        <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionList;
