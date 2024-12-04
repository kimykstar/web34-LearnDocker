import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestQuizAccessability, requestSubmitResult } from '../../api/quiz';
import { QuizSubmitResultModal } from '../modals/QuizSubmitResultModal';
import { SubmitStatus } from '../../types/quiz';
import { HttpStatusCode } from 'axios';
import { SidebarProps } from '../../types/sidebar';
import { updateSidebarState } from '../../utils/sidebarUtils';

type QuizButtonsProps = {
    quizNumber: number;
    answer: string;
    showAlert: (message: string) => void;
    sidebarStates: SidebarProps;
    setSidebarStates: React.Dispatch<React.SetStateAction<SidebarProps>>;
};

const QuizButtons = ({
    quizNumber,
    answer,
    showAlert,
    sidebarStates,
    setSidebarStates,
}: QuizButtonsProps) => {
    const [submitResult, setSubmitResult] = useState<SubmitStatus>('FAIL');
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmitButtonClick = async () => {
        const submitResponse = await requestSubmitResult(quizNumber, answer, navigate);
        if (submitResponse == null) {
            return;
        }

        setSubmitResult(submitResponse.quizResult);
        setOpenModal(true);
    };

    const handlePrevButtonClick = async () => {
        if (quizNumber === 1) {
            showAlert('처음 문제입니다');
            return;
        }

        if (quizNumber === 4) {
            navigate('/what-is-container-lifecycle');
            return;
        }

        navigate(`/quiz/${quizNumber - 1}`);
    };

    const handleNextButtonClick = async (type: string) => {
        const { dockerImageStates, dockerContainerStates } = sidebarStates;

        const nextQuizNum = Number(sessionStorage.getItem('quiz')) + 1;
        if (quizNumber > 9) {
            showAlert('마지막 문제입니다.');
            return;
        }

        if (quizNumber === 3) {
            updateSidebarState(dockerImageStates, quizNumber);
            navigate('/what-is-docker-container');
            return;
        }

        if (type === 'modal' && 1 <= quizNumber && quizNumber <= 3) {
            updateSidebarState(dockerImageStates, quizNumber);
            setSidebarStates({ ...sidebarStates });
            sessionStorage.setItem('quiz', nextQuizNum.toString());
        }
        if (type === 'modal' && 4 <= quizNumber && quizNumber <= 10) {
            updateSidebarState(dockerContainerStates, quizNumber);
            setSidebarStates({ ...sidebarStates });
            sessionStorage.setItem('quiz', nextQuizNum.toString());
        }

        const accessStatus = await requestQuizAccessability(quizNumber + 1);
        if (!accessStatus) {
            return;
        }
        if (accessStatus === HttpStatusCode.Forbidden) {
            showAlert('아직 이동할 수 없습니다.');
            return;
        }

        navigate(`/quiz/${quizNumber + 1}`);
    };

    // const updateSidebarState = (states: Array<SidebarState>) => {
    //     states.forEach((state) => {
    //         const currentQuizNum = Number(state.path.slice(-1));
    //         if (state.pageType === 'quiz' && currentQuizNum === quizNumber) {
    //             state.solved = true;
    //         }
    //     });
    //     setSidebarStates({ ...sidebarStates });
    // };

    return (
        <section className='w-[85%] flex justify-end'>
            <button
                className='text-lg text-white rounded-lg bg-gray-300 hover:bg-gray-400 py-2 px-4 my-4 mx-1'
                onClick={handlePrevButtonClick}
            >
                이전
            </button>
            <button
                className='text-lg text-white rounded-lg bg-sky-400 hover:bg-sky-500 py-2 px-4 m-4'
                onClick={() => handleNextButtonClick('next')}
            >
                다음
            </button>
            <button
                onClick={handleSubmitButtonClick}
                className='text-xl text-white rounded-lg bg-Moby-Blue hover:bg-blue-800 py-2 px-4 m-4'
            >
                채점하기
            </button>
            <QuizSubmitResultModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                submitResult={submitResult}
                handleNextButtonClick={() => handleNextButtonClick('modal')}
            ></QuizSubmitResultModal>
        </section>
    );
};

export default QuizButtons;
