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
import TextAreaQuizPage from './components/quizpages/TextAreaQuizPage';
import InputBoxQuizPage from './components/quizpages/InputBoxQuizPage';

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
                <div className='ml-[17rem] mt-16 flex-row m-10 p-10 w-full h-[calc(100vh-4rem)] z-0'>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/what-is-docker' element={<WhatIsDockerPage />} />
                        <Route path='/what-is-docker-image' element={<WhatIsDockerImagePage />} />
                        <Route path='/quiz/1' element={<TextAreaQuizPage />} />
                        <Route path='/quiz/2' element={<InputBoxQuizPage />} />
                        <Route path='/quiz/3' element={<TextAreaQuizPage />} />
                        <Route path='/what-is-docker-container' element={<DockerContainerPage />} />
                        <Route
                            path='/what-is-container-lifecycle'
                            element={<DockerContainerLifeCyclePage />}
                        />
                        <Route path='/quiz/4' element={<TextAreaQuizPage />} />
                        <Route path='/quiz/5' element={<InputBoxQuizPage />} />
                        <Route path='/quiz/6' element={<InputBoxQuizPage />} />
                        <Route path='/quiz/7' element={<InputBoxQuizPage />} />
                        <Route path='/quiz/8' element={<TextAreaQuizPage />} />
                        <Route path='/quiz/9' element={<TextAreaQuizPage />} />
                        <Route path='/error/:id' element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
