import { dockerImageInitStates, dockerContainerInitStates } from '../constant/sidebarStatus';
import { useState } from 'react';
import { SidebarProps } from '../types/sidebar';
import { updateSidebarState } from '../utils/sidebarUtils';

export const useSidebar = () => {
    const getSidebarInitState = (quizNum: number) => {
        updateSidebarState(dockerImageInitStates, quizNum - 1);

        if (4 <= quizNum && quizNum <= 10) {
            updateSidebarState(dockerContainerInitStates, quizNum - 1);
        }
        return {
            dockerImageStates: dockerImageInitStates,
            dockerContainerStates: dockerContainerInitStates,
        };
    };
    const { dockerImageStates, dockerContainerStates } = getSidebarInitState(
        Number(sessionStorage.getItem('quiz'))
    ) as SidebarProps;
    const [sidebarStates, setSidebarStates] = useState<SidebarProps>({
        dockerImageStates,
        dockerContainerStates,
    });
    return { sidebarStates, setSidebarStates };
};
