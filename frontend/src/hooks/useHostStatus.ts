import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestHostStatus } from '../api/quiz';
import { HostStatus, HOST_STATUS } from '../constant/hostStatus';

type UseHostStatusProps = {
    setInitVisualization: () => Promise<void>;
    eventSourceRef: React.MutableRefObject<EventSource | null>;
};

export const useHostStatus = ({ setInitVisualization, eventSourceRef }: UseHostStatusProps) => {
    const navigate = useNavigate();
    const [hostStatus, setHostStatus] = useState<HostStatus>(HOST_STATUS.STARTING);

    useEffect(() => {
        const updateHandlers = (eventSource: EventSource) => {
            eventSource.onmessage = (event) => {
                const updatedStatus = event.data;
                setHostStatus(updatedStatus);

                if (updatedStatus === HOST_STATUS.READY) {
                    setInitVisualization();
                    eventSource.close();
                    eventSourceRef.current = null;
                }
            };

            eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                eventSource.close();
                eventSourceRef.current = null;
            };
        };

        const initializeHostStatus = async () => {
            if (eventSourceRef.current) {
                updateHandlers(eventSourceRef.current);
                return;
            }

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
            eventSourceRef.current = eventSource;
            updateHandlers(eventSource);
        };

        initializeHostStatus();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return hostStatus;
};
