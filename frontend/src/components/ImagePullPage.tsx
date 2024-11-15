import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '../types/quiz';
import { requestQuizData } from '../api/quiz';
import DockerVisualization from './visualization/DockerVisualization';
import QuizDescription from './quiz/QuizDescription';
import QuizTextArea from './quiz/QuizTextarea';
import QuizButtons from './quiz/QuizButtons';
import useDockerVisualization from '../hooks/useDockerVisualization';

const ImagePullPage = () => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const { images, animation, dockerOperation, updateVisualizationData, handleAnimationComplete } =
        useDockerVisualization();

    useEffect(() => {
        requestQuizData(setQuizData, navigate);
    }, [navigate]);

    return (
        <div className='w-[calc(100vw-17rem)] p-4'>
            {/*TODO: image 가져오기 같은 헤더도 url param으로 업데이트 필요 */}
            <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>image 가져오기</h1>
            <section className='flex h-1/2'>
                <QuizDescription content={quizData?.content} />
                <DockerVisualization
                    animationState={animation}
                    dockerOperation={dockerOperation}
                    images={images}
                    containers={undefined}
                    onAnimationComplete={handleAnimationComplete}
                />
            </section>
            <QuizTextArea updateVisualizationData={updateVisualizationData} />
            <QuizButtons />
        </div>
    );
};
export default ImagePullPage;
