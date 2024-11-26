import { useParams } from 'react-router-dom';
import DockerVisualization from '../visualization/DockerVisualization';
import QuizDescription from '../quiz/QuizDescription';
import XTerminal from '../quiz/XTerminal';
import useDockerVisualization from '../../hooks/useDockerVisualization';
import { QuizSubmitArea } from './QuizSubmitArea';
import { CUSTOM_QUIZZES } from '../../constant/quiz';
import { useQuizData } from '../../hooks/useQuizData';
import { useHostStatus } from '../../hooks/useHostStatus';

type Props = {
    showAlert: (message: string) => void;
};

export const QuizPage = ({ showAlert }: Props) => {
    const params = useParams<{ quizNumber: string }>();
    const quizNumber = params.quizNumber ?? '';
    const { title, content } = useQuizData(quizNumber);
    const visualizationProps = useDockerVisualization();
    
    const hostStatus = useHostStatus({
        setInitVisualization: visualizationProps.setInitVisualization,
    });

    const isCustomQuiz = CUSTOM_QUIZZES.includes(+quizNumber);

    return (
        <div className='w-[calc(100vw-17rem)]'>
            <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>{title}</h1>
            <section className='flex h-1/2'>
                <QuizDescription content={content} />
                <DockerVisualization {...visualizationProps} />
            </section>
            <XTerminal
                updateVisualizationData={visualizationProps.updateVisualizationData}
                hostStatus={hostStatus}
            />
            <QuizSubmitArea quizId={+quizNumber} showInput={isCustomQuiz} showAlert={showAlert} />
        </div>
    );
};
