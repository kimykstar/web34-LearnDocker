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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 300,
        });
    }, []);
    return (
        <div className='w-full overflow-x-hidden'>
            <Header />
            <div className='flex font-pretendard'>
                <Sidebar />
                <div className='ml-[17rem] mt-16 flex-row m-10 p-10 w-full z-0'>
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
        </div>
    );
};

export default App;
