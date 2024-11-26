import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DockerVisualization from '../visualization/DockerVisualization';
import QuizDescription from '../quiz/QuizDescription';
import XTerminal from '../quiz/XTerminal';
import useDockerVisualization from '../../hooks/useDockerVisualization';
import { QuizSubmitArea } from './QuizSubmitArea';
import { CUSTOM_QUIZZES } from '../../constant/quiz';
import { useQuizData } from '../../hooks/useQuizData';
import { HostStatus, HOST_STATUS } from '../../constant/hostStatus';
import { requestHostStatus } from '../../api/quiz';

type Props = {
    showAlert: (message: string) => void;
};

export const QuizPage = ({ showAlert }: Props) => {
    const navigate = useNavigate();
    const params = useParams<{ quizNumber: string }>();
    const quizNumber = params.quizNumber ?? '';
    const { title, content } = useQuizData(quizNumber);
    const [hostStatus, setHostStatus] = useState<HostStatus>(HOST_STATUS.STARTING);
    const pollingRef = useRef<boolean>(true);
    const pollingIntervalRef = useRef<number | null>(null);
    const visualizationProps = useDockerVisualization();

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
        const pollingHostStatus = async () => {
            await checkHostStatus();

            if (pollingRef.current) {
                pollingIntervalRef.current = setInterval(checkHostStatus, 1000);
            } else {
                visualizationProps.setInitVisualization();
            }
        };

        pollingHostStatus();

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };
    }, [navigate]);

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
