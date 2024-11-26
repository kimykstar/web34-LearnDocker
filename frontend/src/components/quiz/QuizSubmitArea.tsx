import { useState } from 'react';
import QuizButtons from './QuizButtons';
import QuizInputBox from './QuizInputBox';
import { CUSTOM_QUIZZES } from '../../constant/quiz';

type QuizSubmitAreaProps = {
    quizId: number;
    showAlert: (message: string) => void;
};

const QuizSubmitArea = ({ quizId, showAlert }: QuizSubmitAreaProps) => {
    const [answer, setAnswer] = useState('');

    return (
        <>
            {CUSTOM_QUIZZES.includes(quizId) ? (
                <QuizInputBox answer={answer} setAnswer={setAnswer} />
            ) : null}
            <QuizButtons quizId={quizId} answer={answer} showAlert={showAlert} />
        </>
    );
};

export default QuizSubmitArea;
