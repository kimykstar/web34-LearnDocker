import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHostContainer } from '../api/quiz';
import { LoaderCircle } from 'lucide-react';

const StartButton = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleButtonClick = async () => {
        setLoading(true);
        await createHostContainer(setLoading, navigate);
    };

    return (
        <div className=' bg-Moby-Blue py-4 m-4 rounded-lg'>
            <button
                className='w-full text-white text-xl flex items-center justify-center gap-2 disabled:opacity-70'
                onClick={handleButtonClick}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <LoaderCircle className='w-3 h-3 animate-spin' />
                        <span>loading</span>
                    </>
                ) : (
                    '시작하기'
                )}
            </button>
        </div>
    );
};

export default StartButton;
