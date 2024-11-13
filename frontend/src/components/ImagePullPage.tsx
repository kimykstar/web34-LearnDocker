import { useState } from 'react';
import axios from 'axios';
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
    const [images, setImages] = useState<Image[]>([]);
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

    return (
        <div className='font-pretendard w-[calc(100vw-17rem)] p-4'>
            <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>image 가져오기</h1>
            <section className='flex flex-row h-1/2'>
                <div className='flex flex-col w-[33%] border rounded-lg border-gray-300 my-4 ml-4 mr-1 pl-4'>
                    <h2 className='font-semibold text-2xl text-Dark-Blue pt-4 pb-2'>문제</h2>
                    <p className='font-medium text-lg text-gray-800'>
                        이미지를 가져오는 docker 명령어를 입력하세요. <br />
                        지원하는 이미지는 다음과 같습니다. <br />
                        hello-world <br />
                        nginx <br />
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
