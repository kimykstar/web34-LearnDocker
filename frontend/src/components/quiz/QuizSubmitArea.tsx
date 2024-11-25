import { useState } from 'react';
import QuizButtons from './QuizButtons';
import QuizInputBox from './QuizInputBox';

type QuizSubmitAreaProps = {
    quizId: number;
    showInput: boolean;
};

export const QuizSubmitArea = ({ quizId, showInput }: QuizSubmitAreaProps) => {
    const [answer, setAnswer] = useState('');

    return (
        <>
            {showInput && <QuizInputBox answer={answer} setAnswer={setAnswer} />}
            <QuizButtons quizId={quizId} answer={answer} />
        </>
    );
};
