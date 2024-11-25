import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './components/staticpages/LandingPage';
import WhatIsDockerPage from './components/staticpages/DockerPage';
import WhatIsDockerImagePage from './components/staticpages/DockerImagePage';
import DockerContainerLifeCyclePage from './components/staticpages/DockerContainerLifeCyclePage';
import DockerContainerPage from './components/staticpages/DockerContainerPage';
import ErrorPage from './components/ErrorPage';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { QuizPage } from './components/quiz/QuizPage';

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
        });
    }, []);

    return (
        <div className='w-full overflow-x-hidden overflow-y-hidden'>
            <Header />
            <div className='flex font-pretendard'>
                <Sidebar />
                <div className='ml-[17rem] mt-16 flex-row p-5 w-full z-0'>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />

                        <Route path='/what-is-docker' element={<WhatIsDockerPage />} />
                        <Route path='/what-is-docker-image' element={<WhatIsDockerImagePage />} />
                        <Route path='/what-is-docker-container' element={<DockerContainerPage />} />
                        <Route
                            path='/what-is-container-lifecycle'
                            element={<DockerContainerLifeCyclePage />}
                        />

                        <Route path='/quiz/:quizNumber' element={<QuizPage />} />

                        <Route path='/error/:id' element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
