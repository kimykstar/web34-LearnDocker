import { useState } from 'react';
import QuizButtons from './QuizButtons';
import QuizInputBox from './QuizInputBox';
import { CUSTOM_QUIZZES } from '../../constant/quiz';

type QuizSubmitAreaProps = {
    quizId: number;
};

const QuizSubmitArea = ({ quizId }: QuizSubmitAreaProps) => {
    const [answer, setAnswer] = useState('');

    return (
        <>
            {CUSTOM_QUIZZES.includes(quizId) ? (
                <QuizInputBox answer={answer} setAnswer={setAnswer} />
            ) : null}
            <QuizButtons quizId={quizId} answer={answer} />
        </>
    );
};

export default QuizSubmitArea;
