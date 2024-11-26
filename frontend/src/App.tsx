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
import { Alert } from 'flowbite-react';
import { useAlert } from './hooks/useAlert';

const App = () => {
    const { openAlert, message, showAlert } = useAlert();

    useEffect(() => {
        AOS.init({
            duration: 500,
        });
    }, []);
    return (
        <div className='w-full overflow-x-hidden overflow-y-hidden'>
            <Alert
                color='failure'
                className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-500 ease-in-out ${
                    openAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                }`}
            >
                {message}
            </Alert>
            <Header />
            <div className='flex font-pretendard'>
                <Sidebar />
                <div className='ml-[17rem] mt-16 flex-row p-5 w-full z-0'>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/what-is-docker' element={<WhatIsDockerPage />} />
                        <Route path='/what-is-docker-image' element={<WhatIsDockerImagePage />} />
                        <Route path='/quiz/1' element={<TextAreaQuizPage showAlert={showAlert} />} />
                        <Route path='/quiz/2' element={<InputBoxQuizPage showAlert={showAlert} />} />
                        <Route path='/quiz/3' element={<TextAreaQuizPage showAlert={showAlert} />} />
                        <Route path='/what-is-docker-container' element={<DockerContainerPage />} />
                        <Route
                            path='/what-is-container-lifecycle'
                            element={<DockerContainerLifeCyclePage />}
                        />
                        <Route path='/quiz/4' element={<TextAreaQuizPage showAlert={showAlert} />} />
                        <Route path='/quiz/5' element={<InputBoxQuizPage showAlert={showAlert} />} />
                        <Route path='/quiz/6' element={<InputBoxQuizPage showAlert={showAlert} />} />
                        <Route path='/quiz/7' element={<InputBoxQuizPage showAlert={showAlert} />} />
                        <Route path='/quiz/8' element={<TextAreaQuizPage showAlert={showAlert} />} />
                        <Route path='/quiz/9' element={<TextAreaQuizPage showAlert={showAlert} />} />
                        <Route path='/error/:id' element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
