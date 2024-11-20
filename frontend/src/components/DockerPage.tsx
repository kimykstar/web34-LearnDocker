import architecture from '../assets/docker-architecture.webp';
const WhatIsDockerPage = () => {
    return (
        <>
            <h1 className='text-3xl font-bold' data-aos='zoom-in'>
                Docker란 무엇일까요?
            </h1>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='zoom-in'
            >
                <p className='text-black font-bold'>
                    Docker는 애플리케이션을 개발, 제공 및 실행하기 위한 개방형 플랫폼 입니다.
                    <br />
                    Docker사용자는 개발한 application을 infra로 부터 분리하여 빠르게 제공할 수 있고,
                    애플리케이션을 관리하는 것과 동일한 방식으로 인프라를 관리할 수 있습니다.
                    <br />
                    코드 전달, 테스트 및 배포를 위한 Docker의 방법론을 활용하면 코드 작성 후 배포의
                    시간을 줄일 수 있습니다.
                </p>
            </div>

            <h2 className='text-2xl font-bold mt-12' data-aos='zoom-in'>
                Docker는 어떻게 사용할 수 있나요?
            </h2>
            <div
                className='flex-auto bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='zoom-in'
            >
                <h3 className='text-xl font-bold'>빠르고 일관된 애플리케이션을 제공하고 싶을때</h3>
            </div>
            <div
                className='flex-auto bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='zoom-in'
            >
                <h3 className='text-xl font-bold'>반응형 배포 및 확장을 하고 싶을때</h3>
            </div>
            <div
                className='flex-auto bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='zoom-in'
            >
                <h3 className='text-xl font-bold'>
                    동일한 하드웨어에서 더 많은 작업을 수행 및 실행하고 싶을때
                </h3>
            </div>

            <h2 className='text-2xl font-bold mt-12' data-aos='zoom-in'>
                Docker의 Architecture
            </h2>
            <img className='mt-4' src={architecture} data-aos='fade-left'></img>

            <h3 className='text-2xl font-bold mt-12'>도커 데몬(Docker Daemon)</h3>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p>
                    도커 데몬은 Docker API요청에 대해서 listening합니다. 또한, Docker Objects에
                    해당하는 Container, Image, Network, volumn을 관리합니다.
                    <br />
                    또한, 도커 데몬은 다른 도커 데몬과 상호작용할 수 있습니다.
                </p>
            </div>
            <h3 className='text-2xl font-bold mt-12'>도커 클라이언트(Docker Client)</h3>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p>
                    도커 클라이언트는 많은 Docker사용자가 Docker와 상호작용 하기 위해 사용되는 주된
                    방법입니다.
                    <br />
                    docker run과 같은 도커 명령어를 입력하면 도커 클라이언트는 docker daemon에게
                    해당 명령을 전달합니다. Docker Client는 Docker API를 활용하며, 하나 이상의
                    Docker Daemon과 통신할 수 있습니다.
                </p>
            </div>

            <h3 className='text-2xl font-bold mt-12'>도커 레지스트리(Docker Registries)</h3>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p>
                    도커 레지스트리는 Docker Image들을 저장하고 있습니다. 대표적으로 누구나 사용할
                    수 있는 Docker Hub가 있습니다. <br />
                    Docker는 기본적으로 Docker Hub를 통해 이미지를 탐색하도록 설정되어 있습니다.
                    다른 말로 이야기하자면, 자신만의 사설 레지스트리를 만들고 활용할 수 있습니다.
                    <br />
                    docker pull이나 docker run의 명령의 경우 이미지를 가져와야 합니다. 필요한
                    이미지가 없는 경우 설정된 레지스트리로부터 해당 이미지를 가져옵니다.
                    <br />
                    자신이 만든 이미지는 docker push 명령을 통해 레지스트리에 등록할 수 있습니다.
                </p>
            </div>
            <h3 className='text-2xl font-bold mt-12'>도커 오브젝트(Docker Objects)</h3>
            <div
                className='bg-Moby-Blue mt-4 bg-opacity-15 rounded-lg shadow-md p-2'
                data-aos='fade-left'
            >
                <p>
                    Docker사용자는 Docker Object들을 생성 및 사용할 수 있습니다. <br />
                    Image, Container, Network, Volume, plugins 등등이 Docker Object에 포함됩니다.
                </p>
            </div>
        </>
    );
};

export default WhatIsDockerPage;
