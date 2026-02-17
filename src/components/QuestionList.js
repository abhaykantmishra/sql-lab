import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

const QuestionList = ({ questions, currentQuestionId, onSelectQuestion }) => {
    return (
        <div className="h-full bg-background border-r-[1.5px] border-border flex flex-col">
            <div className="p-4 border-b-[1.5px] border-border bg-muted">
                <h2 className="font-bold text-foreground uppercase tracking-wider">Questions</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {questions.map((q) => (
                    <button
                        key={q.id}
                        onClick={() => onSelectQuestion(q)}
                        className={cn(
                            "w-full text-left p-4 hover:bg-muted/20 transition-all border-b-[1.5px] border-border flex items-start gap-3 group",
                            currentQuestionId === q.id ? "bg-foreground text-background hover:bg-foreground hover:text-background" : "bg-background text-foreground"
                        )}
                    >
                        <div className="mt-1">
                            {/* Placeholder for solved status */}
                            <Circle size={16} className={cn("transition-colors", currentQuestionId === q.id ? "text-background" : "text-muted-foreground group-hover:text-foreground")} />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-sm mb-1">{q.id}. {q.title}</div>
                            <div className={cn(
                                "text-xs font-bold mb-1 uppercase transition-colors",
                                q.difficulty === 'Easy' ? "text-green-600" :
                                    q.difficulty === 'Medium' ? "text-blue-600" :
                                        "text-red-600"
                            )}>
                                {q.difficulty}
                            </div>
                            {q.tags && q.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {q.tags.slice(0, 3).map((tag, idx) => (
                                        <span key={idx} className={cn(
                                            "text-[10px] px-1.5 py-0.5 border-[1.5px] font-bold uppercase transition-colors",
                                            currentQuestionId === q.id
                                                ? "border-background text-background"
                                                : "bg-transparent border-foreground text-foreground group-hover:border-foreground/70"
                                        )}>
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
