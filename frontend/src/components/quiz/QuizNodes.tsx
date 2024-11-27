import { useQuizData } from '../../hooks/useQuizData';
import { CUSTOM_QUIZZES } from '../../constant/quiz';
import QuizDescription from './QuizDescription';
import { QuizSubmitArea } from './QuizSubmitArea';

type Props = {
    showAlert: (message: string) => void;
    quizId: string;
};

export const QuizNodes = ({ showAlert, quizId }: Props) => {
    const { title, content } = useQuizData(quizId);

    const isCustomQuiz = CUSTOM_QUIZZES.includes(+quizId);

    return {
        head: <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>{title}</h1>,
        description: <QuizDescription content={content} />,
        submit: <QuizSubmitArea quizId={+quizId} showInput={isCustomQuiz} showAlert={showAlert} />,
    };
};
