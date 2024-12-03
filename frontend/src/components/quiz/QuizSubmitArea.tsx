import { useState } from 'react';
import QuizButtons from './QuizButtons';
import QuizInputBox from './QuizInputBox';
import { SidebarProps } from '../../types/sidebar';

type QuizSubmitAreaProps = {
    quizNumber: number;
    showInput: boolean;
    showAlert: (message: string) => void;
    sidebarStates: SidebarProps;
    setSidebarStates: React.Dispatch<React.SetStateAction<SidebarProps>>;
};

export const QuizSubmitArea = ({
    quizNumber,
    showInput,
    showAlert,
    sidebarStates,
    setSidebarStates,
}: QuizSubmitAreaProps) => {
    const [answer, setAnswer] = useState('');

    return (
        <>
            {showInput && <QuizInputBox answer={answer} setAnswer={setAnswer} />}
            <QuizButtons
                quizNumber={quizNumber}
                answer={answer}
                showAlert={showAlert}
                sidebarStates={sidebarStates}
                setSidebarStates={setSidebarStates}
            />
        </>
    );
};
