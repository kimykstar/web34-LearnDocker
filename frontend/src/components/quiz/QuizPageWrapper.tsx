import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestQuizAccessability } from '../../api/quiz';

type QuizPageWrapperProps = {
    children: (quizId: string) => React.ReactNode;
    showAlert: (message: string) => void;
};

export const QuizPageWrapper = ({ children, showAlert }: QuizPageWrapperProps) => {
    const { quizId } = useParams<{ quizId: string }>();
    const [isValidated, setIsValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const validateQuiz = async () => {
            const quizNumber = Number(quizId);

            if (Number.isNaN(quizNumber) || quizNumber < 1 || quizNumber > 9) {
                navigate('/error/404');
                return;
            }

            const isAccessable = await requestQuizAccessability(quizNumber);
            if (!isAccessable) {
                showAlert('이전 퀴즈를 먼저 완료해주세요.');
                navigate('/');
                return;
            }

            setIsValidated(true);
        };

        validateQuiz();
    }, [quizId, navigate, showAlert]);

    if (!isValidated) {
        return null;
    }

    return <>{children(quizId as string)}</>;
};
