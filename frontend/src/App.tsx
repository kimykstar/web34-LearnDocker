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
import { useEffect, useRef, useState } from 'react';
import { QuizPage } from './components/quiz/QuizPage';
import { Alert } from 'flowbite-react';
import { useAlert } from './hooks/useAlert';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TimerModal } from './components/modals/TimerModal';

const queryClient = new QueryClient();

const App = () => {
    const { openAlert, message, showAlert } = useAlert();
    const eventSourceRef = useRef<EventSource | null>(null);
    const [openTimerModal, setOpenTimerModal] = useState(false);
    const startButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        AOS.init({
            duration: 500,
        });
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            return '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
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
                    <Sidebar
                        startButtonRef={startButtonRef}
                        setOpenTimerModal={setOpenTimerModal}
                    />
                    <div className='ml-[17rem] mt-16 px-12 py-6 w-full h-[calc(100vh-4rem)] z-0 overflow-y-auto'>
                        <Routes>
                            <Route
                                path='/'
                                element={<LandingPage startButtonRef={startButtonRef} />}
                            />

                            <Route path='/what-is-docker' element={<WhatIsDockerPage />} />
                            <Route
                                path='/what-is-docker-image'
                                element={<WhatIsDockerImagePage />}
                            />
                            <Route
                                path='/what-is-docker-container'
                                element={<DockerContainerPage />}
                            />
                            <Route
                                path='/what-is-container-lifecycle'
                                element={<DockerContainerLifeCyclePage />}
                            />
                            <Route
                                path='/quiz/:quizId'
                                element={
                                    <QuizPage
                                        showAlert={showAlert}
                                        eventSourceRef={eventSourceRef}
                                    />
                                }
                            />
                            <Route path='/error/:id' element={<ErrorPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
            <TimerModal openTimerModal={openTimerModal} setOpenTimerModal={setOpenTimerModal} />
        </QueryClientProvider>
    );
};

export default App;
