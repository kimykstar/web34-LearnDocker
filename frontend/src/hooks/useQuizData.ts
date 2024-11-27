import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '../types/quiz';
import { requestQuizData } from '../api/quiz';

export const useQuizData = (quizId: string) => {
    const [quizData, setQuizData] = useState<Quiz>({
        id: 0,
        title: '',
        content: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await requestQuizData(quizId, navigate);
            if (!data) return;

            setQuizData(data);
        };
        fetchQuizData();
    }, [quizId, navigate]);

    return {
        id: quizData.id,
        title: quizData.title,
        content: quizData.content,
    };
};
