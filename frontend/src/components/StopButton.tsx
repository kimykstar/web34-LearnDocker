import { requestReleaseSession } from '../api/quiz';
import { useNavigate } from 'react-router-dom';

type StopButtonProps = {
    setMaxAge: React.Dispatch<React.SetStateAction<number>>;
};

const StopButton = ({ setMaxAge }: StopButtonProps) => {
    const navigate = useNavigate();

    const handleStopButtonClick = async () => {
        await requestReleaseSession(navigate);
        window.sessionStorage.removeItem('endDate');
        setMaxAge(0);
        sessionStorage.removeItem('quiz');
        navigate('/');
    };

    return (
        <>
            <button
                type='button'
                onClick={handleStopButtonClick}
                className='w-full rounded-xl text-white bg-red-500 text-xl flex items-center justify-center'
            >
                학습 종료
            </button>
        </>
    );
};

export default StopButton;
