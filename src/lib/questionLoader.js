import question01 from '@/questions-bank/01.json';
import question02 from '@/questions-bank/02.json';
import question03 from '@/questions-bank/03.json';
import question04 from '@/questions-bank/04.json';

export const QUESTIONS = [
    question01,
    question02,
    question03,
    question04
];

export const getQuestionById = (id) => {
    // console.log(question01)
    if (!id) return null;
    const x = QUESTIONS.find(q => q.id === id);
    // console.log("the question is:", x)
    return x;
};
