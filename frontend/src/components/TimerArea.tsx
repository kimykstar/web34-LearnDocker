import { Timer } from './Timer';
import StopButton from './StopButton';

type TimerAreaProps = {
    expirationTime: number;
    setMaxAge: React.Dispatch<React.SetStateAction<number>>;
};

const TimerArea = ({ expirationTime, setMaxAge }: TimerAreaProps) => {
    return (
        <div className='p-2'>
            <span className='w-full text-gray-400 text-sm flex justify-center align-middle'>
                남은 학습시간
            </span>
            <Timer expirationTime={expirationTime} setMaxAge={setMaxAge} />
            <StopButton setMaxAge={setMaxAge} />
        </div>
    );
};

export default TimerArea;
