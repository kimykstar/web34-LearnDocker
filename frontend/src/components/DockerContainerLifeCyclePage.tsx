import lifeCylceImage from '../assets/containerLifeCycle.png';

const DockerContainerLifeCyclePage = () => {
    return (
        <div className='w-full'>
            <h1 className='text-3xl font-bold'>Container생명주기에 대해서 알아볼까요?</h1>
            <img src={lifeCylceImage} className='mt-4'></img>
            <div className='mt-10'>
                <h2 className='text-2xl font-bold'>Container의 상태</h2>
                <h3 className='text-xl font-bold mt-4'>1. Created</h3>
                <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                    <p>
                        도커 이미지로부터 도커 컨테이너가 생성된 상태이며 컨테이너가 실행된 상태는
                        아닙니다.
                    </p>
                </div>
                <h3 className='text-xl font-bold mt-10'>2. Running</h3>
                <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                    <p>컨테이너가 실행중인 상태입니다.</p>
                </div>
                <h3 className='text-xl font-bold mt-10'>3. Stopped</h3>
                <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                    <p>
                        컨테이너의 실행이 중지된 상태로 컨테이너의 모든 프로세스가 종료되고,
                        컨테이너가 더 이상 실행되지 않습니다.
                    </p>
                </div>
                <h3 className='text-xl font-bold mt-10'>4. Paused</h3>
                <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                    <p>
                        컨테이너 내부의 모든 프로세스가 CPU와 메모리 사용을 중지하지만, 컨테이너
                        자체는 실행 상태를 유지합니다.
                    </p>
                </div>
                <h3 className='text-xl font-bold mt-10'>5. Deleted</h3>
                <div className='bg-Moby-Blue mt-2 bg-opacity-15 rounded-lg p-2'>
                    <p>
                        Docker컨테이너의 공식적 상태는 아니지만, 컨테이너가 삭제된 경우의 상태에
                        해당합니다.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default DockerContainerLifeCyclePage;
