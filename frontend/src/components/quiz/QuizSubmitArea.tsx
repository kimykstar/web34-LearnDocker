import { useState } from 'react';
import QuizButtons from './QuizButtons';
import QuizInputBox from './QuizInputBox';

type QuizSubmitAreaProps = {
    quizNumber: number;
    showInput: boolean;
    showAlert: (message: string) => void;
};

export const QuizSubmitArea = ({ quizNumber, showInput, showAlert }: QuizSubmitAreaProps) => {
    const [answer, setAnswer] = useState('');

    return (
        <div className='flex flex-col gap-3 flex-none'>
            {showInput && <QuizInputBox answer={answer} setAnswer={setAnswer} />}
            <QuizButtons quizNumber={quizNumber} answer={answer} showAlert={showAlert} />
        </div>
    );
};
