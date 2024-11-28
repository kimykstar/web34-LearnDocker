import DockerVisualization from '../visualization/DockerVisualization';
import XTerminal from './XTerminal';
import useDockerVisualization from '../../hooks/useDockerVisualization';
import { useHostStatus } from '../../hooks/useHostStatus';

type VisualizationNodesProps = {
    eventSourceRef: React.MutableRefObject<EventSource | null>;
    showAlert: (alertMessage: string) => void;
};

export const VisualizationNodes = ({ eventSourceRef, showAlert }: VisualizationNodesProps) => {
    const visualizationProps = useDockerVisualization();
    const hostStatus = useHostStatus({
        setInitVisualization: visualizationProps.setInitVisualization,
        eventSourceRef,
    });

    return {
        visualization: <DockerVisualization {...visualizationProps} />,
        terminal: (
            <XTerminal
                updateVisualizationData={visualizationProps.updateVisualizationData}
                hostStatus={hostStatus}
                showAlert={showAlert}
            />
        ),
    };
};
