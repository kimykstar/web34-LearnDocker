import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import ImagePullPage from './components/ImagePullPage';
import ErrorPage from './components/ErrorPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Header />
            <div className='flex'>
                <Sidebar />
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/image/quiz/1' element={<ImagePullPage />} />
                    <Route path='/error/:id' element={<ErrorPage />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
