const LandingPage = () => {
    return (
        <div className='p-4 font-pretendard'>
            <section className='flex flex-col'>
                <h1 className='font-bold text-3xl text-Dark-Blue mb-3'>
                    LearnDocker에 온 것을 환영합니다!
                </h1>
                <h2 className='font-semibold text-xl text-Dark-Blue mb-2'>
                    Docker에 대해서 알고 싶으신가요?
                </h2>
                <p className='font-medium text-sm text-gray-800'>
                    LearnDocker는 사용자별 격리된 도커 환경을 제공합니다
                </p>
                <p className='font-medium text-sm text-gray-800'>
                    도커의 주요 개념들을 학습하면서 docker 명령어들을 학습해보세요
                </p>
                <p className='font-medium text-sm text-gray-800'>
                    시각화된 도커 환경이 여러분의 학습을 도울 것입니다
                </p>
            </section>
        </div>
    );
};

export default LandingPage;
