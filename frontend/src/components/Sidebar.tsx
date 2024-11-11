import { useState } from 'react';
import dropDownImage from '../assets/dropDown.svg';
import StartButton from './StartButton';
import { Link } from 'react-router-dom';

const links = [
    { title: 'Home', path: '/' },
    { title: 'Docker란?', path: '/what-is-docker' },
];

const dockerImageLinks = [
    { title: 'Docker image란?', path: '/what-is-docker-image' },
    { title: 'image 가져오기', path: '/image/quiz/1' },
    { title: 'image 목록 확인하기', path: '/image/quiz/2' },
    { title: 'image 삭제하기', path: '/image/quiz/3' },
];

const dockerContainerLinks = [
    { title: 'Docker Container란?', path: '/what-is-docker-container' },
    { title: 'Container의 생명주기', path: '/what-is-container-lifecycle' },
    { title: 'Container 생성하기', path: '/container/quiz/1' },
    { title: 'Container 실행하기', path: '/container/quiz/2' },
    { title: 'Container 생성 및 실행하기', path: '/container/quiz/3' },
    { title: 'Container 목록 확인하기', path: '/container/quiz/4' },
    { title: 'Container 중지하기', path: '/container/quiz/5' },
    { title: 'Container 삭제하기', path: '/container/quiz/6' },
];

type SidebarSectionProps = {
    title: string;
    links: Array<{
        title: string;
        path: string;
    }>;
};

const SidebarSection = ({ title, links }: SidebarSectionProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <div className='m-4 flex items-center  border-b-2 border-gray-400 text-xl'>
                <p>{title}</p>
                <button onClick={toggleDropdown}>
                    <img
                        src={dropDownImage}
                        className={`transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
                        style={{ width: '2em', height: '2em' }}
                    />
                </button>
            </div>
            {isOpen && (
                <ul>
                    {links.map((link) => (
                        <li className='m-4 hover:text-Moby-Blue' key={link.path}>
                            <Link to={link.path}>{link.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

const Sidebar = () => {
    return (
        <nav className='flex flex-col text-Off-Black h-[calc(100vh-4rem)] w-[17rem] font-pretendard bg-gray-100'>
            <div className='flex-grow'>
                {links.map((link) => (
                    <p
                        className='m-4 pb-2 border-b-2 border-gray-400 text-xl hover:text-Moby-Blue'
                        key={link.path}
                    >
                        <Link to={link.path}>{link.title}</Link>
                    </p>
                ))}
                <SidebarSection title='Docker Image 학습' links={dockerImageLinks} />
                <SidebarSection title='Docker Container 학습' links={dockerContainerLinks} />
            </div>
            <StartButton />
        </nav>
    );
};

export default Sidebar;
