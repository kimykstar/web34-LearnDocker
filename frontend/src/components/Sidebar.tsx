import { useState, useEffect } from 'react';
import dropDownImage from '../assets/dropDown.svg';
import StartButton from './StartButton';
import { SidebarSectionProps, SidebarProps } from '../types/sidebar';
import { requestExpirationTime } from '../api/timer';
import { ExpirationTime } from '../types/timer';
import TimerArea from './TimerArea';
import PageInfoArea from './PageInfoArea';
import { Check } from 'lucide-react';

const links = [
    { title: 'Home', path: '/', pageType: 'education' },
    { title: 'Docker란?', path: '/what-is-docker', pageType: 'education' },
];

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
                    {links.map((link) => {
                        return (
                            <li className='m-4 hover:text-Moby-Blue' key={link.path}>
                                <div className='flex justify-between'>
                                    <PageInfoArea
                                        path={link.path}
                                        title={link.title}
                                        pageType={link.pageType}
                                    />
                                    {link.pageType === 'quiz' && link.solved && (
                                        <Check className='ml-1 text-green-500' />
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

const Sidebar = ({ dockerImageStates, dockerContainerStates }: SidebarProps) => {
    const [maxAge, setMaxAge] = useState<number>(0);

    useEffect(() => {
        const fetchTime = async () => {
            const data = await requestExpirationTime();
            if (Object.keys(data).includes('endDate')) {
                const expirationData = data as ExpirationTime;
                const maxAge = new Date(expirationData.endDate).getTime();
                setMaxAge(maxAge);
            }
        };
        fetchTime();
    }, []);

    return (
        <nav className='fixed h-[calc(100vh-4rem)] w-[17rem] bg-gray-100 mt-16 flex flex-col justify-between'>
            <div className='flex-grow'>
                {links.map((link) => {
                    const { path, title, pageType } = link;
                    return (
                        <div
                            className='flex m-4 pb-2 border-b-2 border-gray-400 text-xl hover:text-Moby-Blue  justify-between'
                            key={path}
                        >
                            <PageInfoArea path={path} title={title} pageType={pageType} />
                        </div>
                    );
                })}
                <SidebarSection title='Docker Image 학습' links={dockerImageStates} />
                <SidebarSection title='Docker Container 학습' links={dockerContainerStates} />
            </div>
            {maxAge ? (
                <TimerArea expirationTime={maxAge} setMaxAge={setMaxAge} />
            ) : (
                <StartButton setMaxAge={setMaxAge} />
            )}
        </nav>
    );
};

export default Sidebar;
