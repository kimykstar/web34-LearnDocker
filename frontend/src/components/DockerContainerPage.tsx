const DockerContainerPage = () => {
    return (
        <div className='w-full'>
            <div className='flex-col'>
                <h1 className='text-3xl font-bold'>Docker Container란 무엇일까요?</h1>
                <div className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'>
                    <p className='text-black'>container에 대한 내용이 들어갑니다.</p>
                </div>
            </div>
            <div className='flex-col w-full mt-12'>
                <h1 className='text-3xl font-bold'>Docker Container명령어</h1>
                <span className='block mt-4'>
                    Docker에서 Container를 조작하는 명령에 대해서 알아봅시다!
                </span>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>1. 컨테이너 생성</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>
                            docker create [option] [Image ID | Image Name] [명령어]
                        </span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Image Name 혹은 Image ID에 해당하는 컨테이너를 생성합니다.
                    </span>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>2. 컨테이너 실행</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>
                            docker start [Container Name | Container ID]
                        </span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Container Name 혹은 Container ID에 해당하는 컨테이너를 실행합니다.
                    </span>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>3. 컨테이너 생성 및 실행</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>
                            docker run [option] [Image ID | Image Name]
                        </span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Container Name 혹은 Container ID에 해당하는 컨테이너를 생성 및 실행합니다.
                    </span>
                    <span className='block text-sm font-bold ml-6'>
                        * docker create, docker start를 한번에 실행하는 것과 동일한 동작을 하나의
                        명령어를 통해 실행할 수 있습니다.
                    </span>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>4. 컨테이너 재실행</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>
                            docker restart [Container Name | Container ID]
                        </span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Running상태에 해당하는 특정 컨테이너를 재실행 합니다.
                    </span>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>5. 컨테이너 확인하기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>docker ps [option]</span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        로컬에 존재하는 컨테이너들의 목록을 확인합니다.
                    </span>
                    <span className='block text-sm font-bold ml-6'>
                        * option설정에 따라 살펴볼 수 있는 Container의 목록이 달라집니다.
                    </span>
                </div>
                <div className='flex-col mt-6'>
                    <h2 className='text-2xl font-bold'>6. 컨테이너 삭제하기</h2>
                    <div className='rounded-md w-full border border-black p-4 mt-2'>
                        <span className='text-sm font-bold'>
                            docker rm [Container Name | Container ID]
                        </span>
                    </div>
                    <span className='block mt-2 ml-4'>
                        Container Name 혹은 Container ID에 해당하는 컨테이너를 삭제합니다.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DockerContainerPage;
