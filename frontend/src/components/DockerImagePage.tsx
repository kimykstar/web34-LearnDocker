const WhatIsDockerImagePage = () => {
    return (
        <div className='w-full' data-aos='fade-left'>
            <div className='flex-col'>
                <h1 className='text-3xl font-bold'>Docker Image란 무엇일까요?</h1>
                <div className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'>
                    <p className='text-black'>Image에 대한 내용이 들어갑니다.</p>
                </div>
            </div>
            <div className='flex-col w-full mt-12'>
                <h1 className='text-3xl font-bold'>Docker Image명령어</h1>
                <span className='block mt-4'>
                    Docker에서 Image를 조작하는 명령에 대해서 알아봅시다!
                </span>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>1. 이미지 가져오기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>
                            docker pull [Image ID | Image Name]
                        </span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Docker Image를 Docker Registry로부터 가져와 local에 저장합니다.
                    </span>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>2. 이미지 확인하기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>docker images</span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Local에 저장된 Docker Image들의 목록을 한번에 확인할 수 있습니다.
                    </span>
                    <div className='rounded-md w-full border border-black p-4 mt-4'>
                        <span className='text-sm font-bold'>
                            docker inspect [Image Name | Image ID]
                        </span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Local에 저장된 Docker Image중 특정 Image의 정보를 확인할 수 있습니다.
                    </span>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>3. 이미지 삭제하기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>
                            docker rmi [Image ID | Image Name]
                        </span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Local에 저장된 특정 Docker Image를 삭제합니다.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default WhatIsDockerImagePage;
