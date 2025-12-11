import question01 from '@/questions-bank/01.json';
import question02 from '@/questions-bank/02.json';
import question03 from '@/questions-bank/03.json';
import question04 from '@/questions-bank/04.json';
import question05 from '@/questions-bank/05.json';
import question06 from '@/questions-bank/06.json';
import question07 from '@/questions-bank/07.json';
import question08 from '@/questions-bank/08.json';
import question09 from '@/questions-bank/09.json';
import question10 from '@/questions-bank/10.json';
import question11 from '@/questions-bank/11.json';
import question12 from '@/questions-bank/12.json';
import question13 from '@/questions-bank/13.json';
import question14 from '@/questions-bank/14.json';
import question15 from '@/questions-bank/15.json';
import question16 from '@/questions-bank/16.json';
import question17 from '@/questions-bank/17.json';
import question18 from '@/questions-bank/18.json';
import question19 from '@/questions-bank/19.json';
import question20 from '@/questions-bank/20.json';
import question21 from '@/questions-bank/21.json';
import question22 from '@/questions-bank/22.json';
import question23 from '@/questions-bank/23.json';
import question24 from '@/questions-bank/24.json';
import question25 from '@/questions-bank/25.json';
import question26 from '@/questions-bank/26.json';
import question27 from '@/questions-bank/27.json';
import question28 from '@/questions-bank/28.json';
import question29 from '@/questions-bank/29.json';
import question30 from '@/questions-bank/30.json';
import question31 from '@/questions-bank/31.json';
import question32 from '@/questions-bank/32.json';
import question33 from '@/questions-bank/33.json';
import question34 from '@/questions-bank/34.json';
import question35 from '@/questions-bank/35.json';
import question36 from '@/questions-bank/36.json';
import question37 from '@/questions-bank/37.json';
import question38 from '@/questions-bank/38.json';
import question39 from '@/questions-bank/39.json';
import question40 from '@/questions-bank/40.json';
import question41 from '@/questions-bank/41.json';
import question42 from '@/questions-bank/42.json';
import question43 from '@/questions-bank/43.json';
import question44 from '@/questions-bank/44.json';
import question45 from '@/questions-bank/45.json';
import question46 from '@/questions-bank/46.json';
import question47 from '@/questions-bank/47.json';
import question48 from '@/questions-bank/48.json';
import question49 from '@/questions-bank/49.json';
import question50 from '@/questions-bank/50.json';
import question51 from '@/questions-bank/51.json';
import question52 from '@/questions-bank/52.json';
import question53 from '@/questions-bank/53.json';

export const QUESTIONS = [
    question01,
    question02,
    question03,
    question04,
    question05,
    question06,
    question07,
    question08,
    question09,
    question10,
    question11,
    question12,
    question13,
    question14,
    question15,
    question16,
    question17,
    question18,
    question19,
    question20,
    question21,
    question22,
    question23,
    question24,
    question25,
    question26,
    question27,
    question28,
    question29,
    question30,
    question31,
    question32,
    question33,
    question34,
    question35,
    question36,
    question37,
    question38,
    question39,
    question40,
    question41,
    question42,
    question43,
    question44,
    question45,
    question46,
    question47,
    question48,
    question49,
    question50,
    question51,
    question52,
    question53,
];

export const getQuestionById = (id) => {
    if (!id) return null;
    return QUESTIONS.find(q => q.id === id);
};
