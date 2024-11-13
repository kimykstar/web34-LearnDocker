import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Quiz, Visualization } from '../types/quiz';
import { requestQuizData, requestVisualizationData, reqeustSubmitResult } from '../api/quiz';
import DockerVisualization from './DockerVisualization';
import { Image, Container } from '../types/types';

const updateImageColors = (newImages: Image[], prevImages: Image[]) => {
    const colors = ['#FF6B6B', '#FFC107', '#4CAF50', '#2196F3', '#673AB7', '#E91E63'];

    const updatedImages = newImages.map((newImage, index) => {
        const prevImage = prevImages.find((img) => img.id === newImage.id);
        if (prevImage) {
            return prevImage;
        }

        return {
            ...newImage,
            // 이미지가 항상 순서대로 들어온다는 가정
            color: colors[index % colors.length],
        };
    });

    return updatedImages;
};

const ImagePullPage = () => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const [visualizationData, setVisualizationData] = useState<Visualization | null>(null);
    const [terminalInput, setTerminalInput] = useState('~$ ');
    const [images, setImages] = useState<Image[]>([]);
    const [submitResult, setSubmitResult] = useState('default');

    useEffect(() => {
        requestQuizData(setQuizData, navigate);
        requestVisualizationData(setVisualizationData, navigate);
        // TODO: visualizationData를 사용하는 코드 작성
        // 아래는 lint error를 해결하기 위한 임시 코드
        console.log('임시코드입니다', visualizationData);
    }, []);

    const handleTerminalInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const prefix = '~$ ';

        if (value.startsWith(prefix)) {
            setTerminalInput(value);
        } else {
            const userInput = value.slice(prefix.length);
            setTerminalInput(prefix + userInput);
        }
    };

    const handleTerminalEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
        }
    };

    // TODO: container 관련 상태 시각화 아직 못함
    const [containers, setContainers] = useState<Container[]>([]);

    // TODO: handleClick은 테스트 용도
    // 1. 나중에 명령창에서 엔터를 눌렀을때로 변경해야함
    // 2. url 변경 및 axios 반환 값(백엔드 api 명세서 보고) 수정 필요
    const handleClick = async () => {
        const newImages: Image[] = (
            await axios({ method: 'get', url: 'http://localhost:8080/visualization/images' })
        ).data;

        if (images.length === newImages.length) {
            return;
        }
        const updatedImages = updateImageColors(newImages, images);

        setImages(updatedImages);
    };

    const handleSubmitButtonClick = async () => {
        await reqeustSubmitResult(setSubmitResult, navigate);

        // TODO: submitResult의 상태에 따라 모달창을 띄워줘야 한다.
        // 아래 console.log는 테스트 용도, 나중에 삭제해야 함
        // 여기서 해줄 작업은 없고, 아래 jsx를 return해줄 때 모달창 띄우는 코드를 추가해야 할 듯 합니다.
        console.log(submitResult);
    };

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
                <DockerVisualization images={images} containers={containers} />
            </section>
            <section className='h-[30%] w-[83.5%] border rounded-lg border-gray-300 bg-gray-50 ml-4'>
                명령어 입력창
                {/* TODO: 테스트 용도 onClick */}
                <button
                    onClick={handleClick}
                    className='text-xl text-white rounded-lg bg-Moby-Blue hover:bg-blue-800 py-2 px-4 m-4'
                >
                    test 용도
                </button>
                <textarea
                    value={terminalInput}
                    onChange={handleTerminalInput}
                    onKeyDown={handleTerminalEnter}
                    className='w-full h-full text-gray-700 rounded-lg bg-inherit resize-none focus:outline-none p-2'
                ></textarea>
            </section>
            <section className='w-[85%] flex justify-end'>
                <button className='text-lg text-white rounded-lg bg-gray-400 hover:bg-gray-500 py-2 px-4 my-4 mx-1'>
                    이전
                </button>
                <button className='text-lg text-white rounded-lg bg-gray-400 hover:bg-gray-500 py-2 px-4 m-4'>
                    다음
                </button>
                <button
                    onClick={handleSubmitButtonClick}
                    className='text-xl text-white rounded-lg bg-Moby-Blue hover:bg-blue-800 py-2 px-4 m-4'
                >
                    채점하기
                </button>
            </section>
        </div>
    );
};

export default ImagePullPage;
