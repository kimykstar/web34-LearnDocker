import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '../types/quiz';
import { requestQuizData } from '../api/quiz';

export const useQuizData = (quizNumber: string) => {
    const [quizData, setQuizData] = useState<Quiz>({
        id: 0,
        title: '',
        content: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await requestQuizData(quizNumber, navigate);
            if (!data) return;

            setQuizData(data);
        };
        fetchQuizData();
    }, [quizNumber, navigate]);

    return {
        id: quizData.id,
        title: quizData.title,
        content: quizData.content,
    };
};
