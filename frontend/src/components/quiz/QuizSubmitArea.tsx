import { useState } from 'react';
import QuizButtons from './QuizButtons';
import QuizInputBox from './QuizInputBox';

type QuizSubmitAreaProps = {
    quizId: number;
    showInput: boolean;
    showAlert: (message: string) => void;
};

export const QuizSubmitArea = ({ quizId, showInput, showAlert }: QuizSubmitAreaProps) => {
    const [answer, setAnswer] = useState('');

    return (
        <>
            {showInput && <QuizInputBox answer={answer} setAnswer={setAnswer} />}
            <QuizButtons quizId={quizId} answer={answer} showAlert={showAlert} />
        </>
    );
};
