import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestQuizAccessability } from '../../api/quiz';

type QuizPageWrapperProps = {
    children: (quizId: string) => React.ReactNode;
    showAlert: (message: string) => void;
};

export const QuizPageWrapper = ({ children, showAlert }: QuizPageWrapperProps) => {
    const { quizId } = useParams<{ quizId: string }>();
    const [validated, setvalidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const validateQuiz = async () => {
            const quizNumber = Number(quizId);

            if (Number.isNaN(quizNumber) || quizNumber < 1 || quizNumber > 9) {
                navigate('/error/404');
                return;
            }

            const accessable = await requestQuizAccessability(quizNumber);
            if (accessable) {
                showAlert('이전 퀴즈를 먼저 완료해주세요.');
                navigate('/');
                return;
            }

            setvalidated(true);
        };

        validateQuiz();
    }, [quizId, navigate, showAlert]);

    if (validated) {
        return null;
    }

    return <>{children(quizId as string)}</>;
};
