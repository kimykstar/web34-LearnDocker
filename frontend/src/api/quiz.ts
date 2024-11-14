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
        .get('http://localhost:3000/api/quiz/1')
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
        .get('http://localhost:3000/api/sandbox/elements')
        .then((response) => {
            setVisualizationData(response.data);
        })
        .catch((error) => {
            handleErrorResponse(error, navigate);
        });
};

export const createHostContainer = (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction
) => {
    axios
        .post('http://localhost:3000/api/sandbox/start')
        .then(() => {
            setLoading(false);
        })
        .catch((error) => {
            handleErrorResponse(error, navigate);
        });
};

export const reqeustSubmitResult = (
    setSubmitResult: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
) => {
    axios
        .post('http://localhost:3000/api/quiz/1/submit')
        .then((response) => {
            // TODO: 백엔드와 협의하여 응답 데이터 구조를 정의해야 한다.
            // 현재는 { quizResult: 'SUCCESS' | 'FAIL' | 'ERROR' }로 가정
            // console.log는 테스트 용도, 나중에 삭제해야 함
            const result = response.data;
            console.log(result);

            if (result?.quizResult === 'SUCCESS') {
                setSubmitResult('SUCCESS');
            } else if (result?.quizResult === 'FAIL') {
                setSubmitResult('FAIL');
            } else {
                setSubmitResult('ERROR');
            }
        })
        .catch((error) => {
            handleErrorResponse(error, navigate);
        });
};
