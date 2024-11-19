import { useEffect, useState } from 'react';
import { HOUR, MINUTE, SECOND, MAX_TIME } from '../constant/timer';

const parseTime = (time: number) => {
    const hour = Math.floor(time / HOUR);
    time %= HOUR;
    const minute = Math.floor(time / MINUTE);
    time %= MINUTE;
    const second = Math.floor(time / 1000);

    return `${String(hour).padStart(2, '0')} : ${String(minute).padStart(2, '0')} : ${String(second).padStart(2, '0')}`;
};

type TimerProps = {
    expirationTime: number;
};

export const Timer = (props: TimerProps) => {
    const expriationTime = props.expirationTime || new Date().getTime() + MAX_TIME;
    const [leftTime, setLeftTime] = useState(expriationTime - new Date().getTime());
    useEffect(() => {
        const timer = setInterval(() => setLeftTime(leftTime - SECOND), SECOND);
        if (leftTime < 0) clearInterval(timer);

        return () => {
            clearInterval(timer);
        };
    }, [leftTime]);

    return (
        <>
            <span className='flex justify-center align-middle font-bold text-Moby-Blue text-3xl content-center mb-5'>
                {parseTime(leftTime)}
            </span>
        </>
    );
};
