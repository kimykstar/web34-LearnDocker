import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import ImagePullPage from './components/ImagePullPage';
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
                </Routes>
            </div>
        </>
    );
};

export default App;
