import { dockerImageInitStates, dockerContainerInitStates } from '../constant/sidebarStatus';
import { useState } from 'react';
import { SidebarProps } from '../types/sidebar';

export const useSidebar = () => {
    const getSidebarInitState = (quizNum: number) => {
        if (1 <= quizNum && quizNum <= 3) {
            dockerImageInitStates.forEach((imageState) => {
                const pageType = imageState.pageType;
                if (pageType === 'quiz') {
                    const currentQuizNum = Number(imageState.path.slice(-1));
                    if (currentQuizNum < quizNum) imageState.solved = true;
                }
            });

            return {
                dockerImageStates: dockerImageInitStates,
                dockerContainerStates: dockerContainerInitStates,
            };
        }
        if (4 <= quizNum && quizNum <= 8) {
            dockerImageInitStates.forEach((imageState) => {
                const pageType = imageState.pageType;
                if (pageType === 'quiz') {
                    const currentQuizNum = Number(imageState.path.slice(-1));
                    if (currentQuizNum < quizNum) imageState.solved = true;
                }
            });
            dockerContainerInitStates.forEach((containerState) => {
                const pageType = containerState.pageType;
                if (pageType === 'quiz') {
                    const currentQuizNum = Number(containerState.path.slice(-1));
                    if (currentQuizNum < quizNum) containerState.solved = true;
                }
            });

            return {
                dockerImageStates: dockerImageInitStates,
                dockerContainerStates: dockerContainerInitStates,
            };
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
