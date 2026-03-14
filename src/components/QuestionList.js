import React from 'react';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

const QuestionList = ({ questions, currentQuestionId, onSelectQuestion }) => {
    return (
        <div className="h-full bg-[var(--color-bg-elevated)] border-r border-[var(--color-divider)] flex flex-col">
            <div className="p-3 border-b border-[var(--color-divider)] bg-[var(--color-bg)]">
                <h2 className="font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-heading)' }}>Questions</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {questions.map((q) => {
                    const isSelected = currentQuestionId === q.id;
                    return (
                        <button
                            key={q.id}
                            onClick={() => onSelectQuestion(q)}
                            className={cn(
                                "w-full text-left p-3 transition-all border-b border-[var(--color-divider)] flex items-start gap-2.5",
                                isSelected 
                                    ? "bg-[var(--color-heading)] text-[var(--color-bg)]" 
                                    : "bg-[var(--color-bg-elevated)] text-[var(--color-text)] hover:bg-[var(--color-bg)]"
                            )}
                        >
                            <div className="mt-0.5">
                                <Circle 
                                    size={14} 
                                    className={cn(
                                        "transition-colors",
                                        isSelected 
                                            ? "text-[var(--color-bg)]" 
                                            : "text-[var(--color-text-muted)]"
                                    )} 
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={cn(
                                    "font-medium text-[11px] mb-1 truncate leading-tight",
                                    isSelected ? "text-[var(--color-bg)]" : "text-[var(--color-heading)]"
                                )}>
                                    {q.id}. {q.title}
                                </div>
                                <div className={cn(
                                    "text-[10px] font-semibold mb-1.5 uppercase tracking-wide",
                                    q.difficulty === 'Easy' ? "difficulty-easy" :
                                        q.difficulty === 'Medium' ? "difficulty-medium" :
                                            "difficulty-hard"
                                )}>
                                    {q.difficulty}
                                </div>
                                {q.tags && q.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {q.tags.slice(0, 3).map((tag, idx) => (
                                            <span 
                                                key={idx} 
                                                className={cn(
                                                    "text-[9px] px-1.5 py-0.5 rounded-full font-medium transition-colors",
                                                    isSelected
                                                        ? "bg-[var(--color-bg)]/20 text-[var(--color-bg)]"
                                                        : "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20"
                                                )}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionList;
