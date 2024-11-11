import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';

const App = () => {
    return (
        <>
            <Header />
            <div className='flex'>
                <Sidebar />
                <LandingPage />
            </div>
        </>
    );
};

export default App;
