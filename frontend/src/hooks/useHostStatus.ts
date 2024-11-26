import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestHostStatus } from '../api/quiz';
import { HostStatus, HOST_STATUS } from '../constant/hostStatus';

type UseHostStatusProps = {
    setInitVisualization: () => Promise<void>;
};

export const useHostStatus = ({ setInitVisualization }: UseHostStatusProps) => {
    const navigate = useNavigate();
    const [hostStatus, setHostStatus] = useState<HostStatus>(HOST_STATUS.STARTING);

    useEffect(() => {
        let cleanupSSE: () => void | undefined;

        const initializeHostStatus = async () => {
            const initialStatus = await requestHostStatus(navigate);

            if (!initialStatus) {
                return;
            }

            setHostStatus(initialStatus);

            if (initialStatus === HOST_STATUS.READY) {
                setInitVisualization();
                return;
            }

            // STARTING 상태일 때만 SSE
            const eventSource = new EventSource('/api/sandbox/hostStatus/stream');

            eventSource.onmessage = (event) => {
                const updatedStatus = event.data;
                setHostStatus(updatedStatus);

                if (updatedStatus === HOST_STATUS.READY) {
                    setInitVisualization();
                    eventSource.close();
                }
            };

            eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                eventSource.close();
            };

            cleanupSSE = () => {
                eventSource.close();
            };
        };

        initializeHostStatus();

        return () => {
            if (cleanupSSE) {
                cleanupSSE();
            }
        };
    }, [navigate]);

    return hostStatus;
};
