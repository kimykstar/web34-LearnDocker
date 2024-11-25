import { useEffect, useState, useRef } from 'react';
import { requestQuizData } from '../../api/quiz';
import { useLocation, useNavigate } from 'react-router-dom';
import DockerVisualization from '../visualization/DockerVisualization';
import { Quiz } from '../../types/quiz';
import QuizDescription from '../quiz/QuizDescription';
import XTerminal from '../quiz/XTerminal';
import useDockerVisualization from '../../hooks/useDockerVisualization';
import QuizSubmitArea from '../quiz/QuizSubmitArea';
import { HostStatus, HOST_STATUS } from '../../constant/hostStatus';
import { requestHostStatus } from '../../api/quiz';

const InputBoxQuizPage = () => {
    const navigate = useNavigate();
    const quizNum = useLocation().pathname.split('/').slice(-1)[0] as string;
    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const [hostStatus, setHostStatus] = useState<HostStatus>(HOST_STATUS.STARTING);
    const pollingRef = useRef<boolean>(true);
    const pollingIntervalRef = useRef<number | null>(null);
    const {
        images,
        containers,
        animation,
        dockerOperation,
        updateVisualizationData,
        handleAnimationComplete,
        setInitVisualization,
    } = useDockerVisualization();

    const checkHostStatus = async () => {
        const response = await requestHostStatus(navigate);

        if (!response) {
            return;
        }

        setHostStatus(response);

        if (response === HOST_STATUS.READY) {
            pollingRef.current = false;
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        }
    };

    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await requestQuizData(quizNum, navigate);

            if (!data) {
                return;
            }

            setQuizData(data);

            await checkHostStatus();

            if (pollingRef.current) {
                pollingIntervalRef.current = setInterval(checkHostStatus, 1000);
            } else {
                setInitVisualization();
            }
        };

        fetchQuizData();

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };
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
            <XTerminal updateVisualizationData={updateVisualizationData} hostStatus={hostStatus} />
            <QuizSubmitArea quizId={+quizNum} />
        </div>
    );
};

export default InputBoxQuizPage;
