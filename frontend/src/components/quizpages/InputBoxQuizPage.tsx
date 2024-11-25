import { useEffect, useState } from 'react';
import { requestQuizData } from '../../api/quiz';
import { useLocation, useNavigate } from 'react-router-dom';
import DockerVisualization from '../visualization/DockerVisualization';
import { Quiz } from '../../types/quiz';
import QuizDescription from '../quiz/QuizDescription';
import QuizButtons from '../quiz/QuizButtons';
import XTerminal from '../quiz/XTerminal';
import QuizInputBox from '../quiz/QuizInputBox';
import useDockerVisualization from '../../hooks/useDockerVisualization';

const InputBoxQuizPage = () => {
    const navigate = useNavigate();
    const quizNum = useLocation().pathname.split('/').slice(-1)[0] as string;
    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const {
        elements,
        animation,
        dockerOperation,
        updateVisualizationData,
        handleAnimationComplete,
        setInitVisualization,
    } = useDockerVisualization();

    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await requestQuizData(quizNum, navigate);

            if (!data) {
                return;
            }

            setQuizData(data);
            setInitVisualization();
        };
        fetchQuizData();
    }, [navigate]);

    return (
        <div className='w-[calc(100vw-17rem)]'>
            <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>{quizData?.title}</h1>
            <section className='flex h-1/2'>
                <QuizDescription content={quizData?.content} />
                <DockerVisualization
                    animationState={animation}
                    dockerOperation={dockerOperation}
                    images={elements.images}
                    containers={elements.containers}
                    onAnimationComplete={handleAnimationComplete}
                />
            </section>
            <XTerminal updateVisualizationData={updateVisualizationData} />
            <QuizInputBox />
            <QuizButtons quizId={+quizNum} />
        </div>
    );
};

export default InputBoxQuizPage;
