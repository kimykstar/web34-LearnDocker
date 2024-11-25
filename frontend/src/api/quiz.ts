import { Terminal } from '@xterm/xterm';
import { Quiz, QuizResult } from '../types/quiz';
import { Visualization } from '../types/visualization';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { CUSTOM_QUIZZES } from '../constant/quiz';
import LoadingTerminal from '../utils/LoadingTerminal';
import { HostStatus } from '../constant/hostStatus';

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
        const response = await axios.get<Quiz>(`/api/quiz/${quizNumber}`);
        return response.data;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const requestVisualizationData = async (navigate: NavigateFunction) => {
    try {
        const response = await axios.get<Visualization>(`/api/sandbox/elements`);
        return response.data;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const createHostContainer = async (navigate: NavigateFunction) => {
    try {
        await axios.post(`/api/sandbox/start`);
        return true;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const requestSubmitResult = async (
    quizNumber: number,
    userAnswer: string,
    navigate: NavigateFunction
) => {
    if (CUSTOM_QUIZZES.includes(quizNumber)) {
        return requestCustomQuizResult(quizNumber, userAnswer, navigate);
    } else {
        return requestDockerQuizResult(quizNumber, navigate);
    }
};

const requestCustomQuizResult = async (
    quizNumber: number,
    userAnswer: string,
    navigate: NavigateFunction
) => {
    try {
        const response = await axios.get<QuizResult>(`/api/quiz/${quizNumber}/submit`, {
            params: {
                userAnswer,
            },
        });
        return response.data;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

const requestDockerQuizResult = async (quizNumber: number, navigate: NavigateFunction) => {
    try {
        const response = await axios.get<QuizResult>(`/api/quiz/${quizNumber}/submit`);
        return response.data;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const requestHostStatus = async (navigate: NavigateFunction) => {
    try {
        const response = await axios.get<HostStatus>(`/api/sandbox/hostStatus`);
        return response.data;
    } catch (error) {
        return handleErrorResponse(error, navigate);
    }
};

export const requestCommandResult = async (
    command: string,
    navigate: NavigateFunction,
    term: Terminal,
    customErrorCallback: (term: Terminal) => void
) => {
    const loadingTerminal = new LoadingTerminal(term);

    try {
        loadingTerminal.spinnerStart();
        const response = await axios.post<string>(`/api/sandbox/command`, { command });
        loadingTerminal.spinnerStop();
        return response.data;
    } catch (error) {
        loadingTerminal.spinnerStop();
        if (customErrorCallback) {
            customErrorCallback(term);
        } else {
            handleErrorResponse(error, navigate);
        }
        return null;
    }
};

export const requestQuizAccessability = async (quizId: number) => {
    try {
        await axios.get(`/api/quiz/${quizId}/access`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 403) {
                return false;
            }
        }
        throw error;
    }
    return true;
};
