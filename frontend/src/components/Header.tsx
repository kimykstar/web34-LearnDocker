import mainLogo from '../assets/logo.png';

const Header = () => {
    return (
        <header className='w-full h-16 bg-blue-600 flex items-center'>
            <a href='/'>
                <button className='ml-4 gap-2 flex items-center'>
                    <img src={mainLogo} alt='main logo' className='h-12 w-12' />
                    <h1 className='font-pretendard font-bold text-white text-2xl'>Learn Docker</h1>
                </button>
            </a>
        </header>
    );
};

export default Header;
