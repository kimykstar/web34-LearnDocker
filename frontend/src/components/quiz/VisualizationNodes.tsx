import DockerVisualization from '../visualization/DockerVisualization';
import XTerminal from './XTerminal';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDockerVisualization from '../../hooks/useDockerVisualization';
import { HostStatus, HOST_STATUS } from '../../constant/hostStatus';
import { requestHostStatus } from '../../api/quiz';

export const VisualizationNodes = () => {
    const navigate = useNavigate();
    const [hostStatus, setHostStatus] = useState<HostStatus>(HOST_STATUS.STARTING);
    const pollingRef = useRef<boolean>(true);
    const pollingIntervalRef = useRef<number | null>(null);
    const visualizationProps = useDockerVisualization();

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
        const pollingHostStatus = async () => {
            await checkHostStatus();

            if (pollingRef.current) {
                pollingIntervalRef.current = setInterval(checkHostStatus, 1000);
            } else {
                visualizationProps.setInitVisualization();
            }
        };

        pollingHostStatus();

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };
    }, [navigate]);

    return {
        visualization: <DockerVisualization {...visualizationProps} />,
        terminal: (
            <XTerminal
                updateVisualizationData={visualizationProps.updateVisualizationData}
                hostStatus={hostStatus}
            />
        ),
    };
};
