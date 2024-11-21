import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Quiz } from '../../types/quiz';
import { requestQuizData } from '../../api/quiz';
import DockerVisualization from '../visualization/DockerVisualization';
import QuizDescription from '../quiz/QuizDescription';
import QuizTextArea from '../quiz/QuizTextarea';
import QuizButtons from '../quiz/QuizButtons';
import useDockerVisualization from '../../hooks/useDockerVisualization';

const TextAreaQuizPage = () => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const {
        images,
        containers,
        animation,
        dockerOperation,
        updateVisualizationData,
        handleAnimationComplete,
        setInitVisualization,
    } = useDockerVisualization();
    const quizNum = useLocation().pathname.split('/').slice(-1)[0] as string;

    useEffect(() => {
        setInitVisualization();
    }, []);

    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await requestQuizData(quizNum, navigate);

            if (!data) {
                return;
            }

            setQuizData(data);
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
                    images={images}
                    containers={containers}
                    onAnimationComplete={handleAnimationComplete}
                />
            </section>
            <QuizTextArea updateVisualizationData={updateVisualizationData} />
            <QuizButtons />
        </div>
    );
};
export default TextAreaQuizPage;
