import { Quiz, Visualization } from '../types/quiz';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

const handleErrorResponse = (error: unknown, navigate: NavigateFunction) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            navigate(`/error/${error.response.status}`);
        } else if (error.request) {
            console.error('요청이 전송되었지만, 응답이 수신되지 않았습니다: ', error.request);
        } else {
            console.error(
                '오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다: ',
                error.message
            );
        }
    } else {
        console.error('unknown error');
    }
};

export const requestQuizData = (
    setQuizData: React.Dispatch<React.SetStateAction<Quiz | null>>,
    navigate: NavigateFunction
) => {
    axios
        .get('http://localhost:3000/quiz/1')
        .then((response) => {
            setQuizData(response.data);
        })
        .catch((error) => {
            handleErrorResponse(error, navigate);
        });
};

export const requestVisualizationData = (
    setVisualizationData: React.Dispatch<React.SetStateAction<Visualization | null>>,
    navigate: NavigateFunction
) => {
    axios
        .get('http://localhost:3000/sandbox/elements')
        .then((response) => {
            setVisualizationData(response.data);
        })
        .catch((error) => {
            handleErrorResponse(error, navigate);
        });
};
