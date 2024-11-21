import { Quiz, QuizResult } from '../types/quiz';
import { Visualization } from '../types/visualization';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

const PROXY_HOST = import.meta.env.VITE_PROXY_HOST;
const PROXY_PORT = import.meta.env.VITE_PROXY_PORT;

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
    return null;
};

export const requestQuizData = async (quizNumber: string, navigate: NavigateFunction) => {
    try {
        const response = await axios.get<Quiz>(
            `http://${PROXY_HOST}:${PROXY_PORT}/api/quiz/${quizNumber}`
        );
        return response.data;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const requestVisualizationData = async (navigate: NavigateFunction) => {
    try {
        const response = await axios.get<Visualization>(
            `http://${PROXY_HOST}:${PROXY_PORT}/api/sandbox/elements`
        );
        return response.data;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const createHostContainer = async (navigate: NavigateFunction) => {
    try {
        await axios.post(`http://${PROXY_HOST}:${PROXY_PORT}/api/sandbox/start`);
        return true;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const requestSubmitResult = async (quizNumber: string, navigate: NavigateFunction) => {
    try {
        const response = await axios.get<QuizResult>(
            `http://${PROXY_HOST}:${PROXY_PORT}/api/quiz/${quizNumber}/submit`
        );
        return response.data;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const requestCommandResult = async (
    command: string,
    navigate: NavigateFunction,
    customErrorCallback?: (error: unknown) => void
) => {
    try {
        const response = await axios.post<string>(
            `http://${PROXY_HOST}:${PROXY_PORT}/api/sandbox/command`,
            { command }
        );
        return response.data;
    } catch (error) {
        if (customErrorCallback !== undefined) {
            customErrorCallback(error);
        } else {
            handleErrorResponse(error, navigate);
        }
        return null;
    }
};
