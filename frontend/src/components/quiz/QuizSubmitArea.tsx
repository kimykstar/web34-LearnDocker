import { useState } from 'react';
import QuizButtons from './QuizButtons';
import QuizInputBox from './QuizInputBox';
import { SidebarElementsProps } from '../../types/sidebar';

type QuizSubmitAreaProps = {
    quizNumber: number;
    showInput: boolean;
    showAlert: (message: string) => void;
    sidebarStates: SidebarElementsProps;
    setSidebarStates: React.Dispatch<React.SetStateAction<SidebarElementsProps>>;
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
        <div className='flex flex-col gap-3 flex-none'>
            {showInput && <QuizInputBox answer={answer} setAnswer={setAnswer} />}
            <QuizButtons
                quizNumber={quizNumber}
                answer={answer}
                showAlert={showAlert}
                sidebarStates={sidebarStates}
                setSidebarStates={setSidebarStates}
            />
        </div>
    );
};
