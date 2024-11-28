import { useQuizData } from '../../hooks/useQuizData';
import { CUSTOM_QUIZZES } from '../../constant/quiz';
import QuizDescription from './QuizDescription';
import { QuizSubmitArea } from './QuizSubmitArea';

type Props = {
    showAlert: (message: string) => void;
    quizId: string;
};

export const QuizNodes = ({ showAlert, quizId }: Props) => {
    const { title, content, isPending, isError } = useQuizData(quizId);
    const quizNumber = +quizId;
    const isCustomQuiz = CUSTOM_QUIZZES.includes(quizNumber);

    if (isPending) {
        return {
            head: <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>로딩 중...</h1>,
            description: <QuizDescription content={'퀴즈를 불러오는 중입니다...'} />,
            submit: null,
        };
    }

    if (isError) {
        return {
            head: <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>오류 발생</h1>,
            description: <QuizDescription content={'퀴즈를 불러오는데 실패했습니다.'} />,
            submit: null,
        };
    }

    return {
        head: <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>{title}</h1>,
        description: <QuizDescription content={content} />,
        submit: (
            <QuizSubmitArea
                quizNumber={quizNumber}
                showInput={isCustomQuiz}
                showAlert={showAlert}
            />
        ),
    };
};
