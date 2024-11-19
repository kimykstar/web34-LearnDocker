import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import ImagePullPage from './components/ImagePullPage';
import WhatIsDockerPage from './components/DockerPage';
import WhatIsDockerImagePage from './components/DockerImagePage';
import DockerContainerLifeCyclePage from './components/DockerContainerLifeCyclePage';
import DockerContainerPage from './components/DockerContainerPage';
import ErrorPage from './components/ErrorPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Header />
            <div className='flex font-pretendard'>
                <Sidebar />
                <div className='ml-[17rem] mt-16 flex-row m-10 p-10 w-full'>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/what-is-docker' element={<WhatIsDockerPage />} />
                        <Route path='/what-is-docker-image' element={<WhatIsDockerImagePage />} />
                        <Route path='/image/quiz/1' element={<ImagePullPage />} />
                        <Route path='/what-is-docker-container' element={<DockerContainerPage />} />
                        <Route
                            path='/what-is-container-lifecycle'
                            element={<DockerContainerLifeCyclePage />}
                        />
                        <Route path='/error/:id' element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default App;
