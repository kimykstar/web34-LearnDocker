import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DockerVisualization from '../visualization/DockerVisualization';
import QuizDescription from '../quiz/QuizDescription';
import XTerminal from '../quiz/XTerminal';
import useDockerVisualization from '../../hooks/useDockerVisualization';
import { QuizSubmitArea } from './QuizSubmitArea';
import { CUSTOM_QUIZZES } from '../../constant/quiz';
import { useQuizData } from '../../hooks/useQuizData';

export const QuizPage = () => {
    const params = useParams<{ quizNumber: string }>();
    const quizNumber = params.quizNumber ?? '';
    const { title, content } = useQuizData(quizNumber);
    const visualizationProps = useDockerVisualization();

    useEffect(() => {
        visualizationProps.setInitVisualization();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isCustomQuiz = CUSTOM_QUIZZES.includes(+quizNumber);

    return (
        <div className='w-[calc(100vw-17rem)]'>
            <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>{title}</h1>
            <section className='flex h-1/2'>
                <QuizDescription content={content} />
                <DockerVisualization {...visualizationProps} />
            </section>
            <XTerminal updateVisualizationData={visualizationProps.updateVisualizationData} />
            <QuizSubmitArea quizId={+quizNumber} showInput={isCustomQuiz} />
        </div>
    );
};
