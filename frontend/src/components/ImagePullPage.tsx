import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz, Visualization } from '../types/quiz';
import { requestQuizData, requestVisualizationData } from '../api/quiz';

const ImagePullPage = () => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const [visualizationData, setVisualizationData] = useState<Visualization | null>(null);

    useEffect(() => {
        requestQuizData(setQuizData, navigate);
        requestVisualizationData(setVisualizationData, navigate);
        console.log(visualizationData); // lint error를 해결하기 위한 임시 코드
    }, []);

    return (
        <div className='font-pretendard w-[calc(100vw-17rem)] p-4'>
            <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>image 가져오기</h1>
            <section className='flex h-1/2'>
                <div className='w-[33%] border rounded-lg border-gray-300 my-4 ml-4 mr-1 pl-4'>
                    <h2 className='font-semibold text-2xl text-Dark-Blue pt-4 pb-2'>문제</h2>
                    <p className='font-medium text-lg text-gray-800 whitespace-pre-wrap'>
                        {quizData?.content}
                    </p>
                </div>
                <div className='w-[50%] border rounded-lg border-gray-300 my-4 ml-1'></div>
            </section>
            <section className='h-[30%] w-[83.5%] border rounded-lg border-gray-300 bg-gray-50 ml-4'>
                명령어 입력창
            </section>
            <section className='w-[85%] flex justify-end'>
                <button className='text-lg text-white rounded-lg bg-gray-400 hover:bg-gray-500 py-2 px-4 my-4 mx-1'>
                    이전
                </button>
                <button className='text-lg text-white rounded-lg bg-gray-400 hover:bg-gray-500 py-2 px-4 m-4'>
                    다음
                </button>
                <button className='text-xl text-white rounded-lg bg-Moby-Blue hover:bg-blue-800 py-2 px-4 m-4'>
                    채점하기
                </button>
            </section>
        </div>
    );
};

export default ImagePullPage;
