import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestHostStatus } from '../api/quiz';
import { HostStatus, HOST_STATUS } from '../constant/hostStatus';

type UseHostStatusProps = {
    setInitVisualization: () => Promise<void>;
};

export const useHostStatus = ({ setInitVisualization }: UseHostStatusProps) => {
    const navigate = useNavigate();
    const [hostStatus, setHostStatus] = useState<HostStatus>(HOST_STATUS.STARTING);
    const pollingRef = useRef<boolean>(true);
    const pollingIntervalRef = useRef<number | null>(null);

    const checkHostStatus = async () => {
        const response = await requestHostStatus(navigate);

        if (!response) {
            return;
        }

        setHostStatus(response);

        if (response === HOST_STATUS.READY) {
            pollingRef.current = false;
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        }
    };

    useEffect(() => {
        const initializeHostStatus = async () => {
            await checkHostStatus();

            if (pollingRef.current) {
                pollingIntervalRef.current = setInterval(checkHostStatus, 1000);
            } else {
                setInitVisualization();
            }
        };

        initializeHostStatus();

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return hostStatus;
};
