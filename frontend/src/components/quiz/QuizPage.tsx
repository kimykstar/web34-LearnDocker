import { QuizNodes } from './QuizNodes';
import { VisualizationNodes } from './VisualizationNodes';
import { QuizPageWrapper } from './QuizPageWrapper';
import { SidebarProps } from '../../types/sidebar';

type QuizContentProps = {
    showAlert: (message: string) => void;
    eventSourceRef: React.MutableRefObject<EventSource | null>;
    quizId: string;
    sidebarStates: SidebarProps;
    setSidebarStates: React.Dispatch<React.SetStateAction<SidebarProps>>;
};

type QuizPageProps = {
    showAlert: (message: string) => void;
    eventSourceRef: React.MutableRefObject<EventSource | null>;
    sidebarStates: SidebarProps;
    setSidebarStates: React.Dispatch<React.SetStateAction<SidebarProps>>;
};

export const QuizContent = ({
    showAlert,
    quizId,
    eventSourceRef,
    sidebarStates,
    setSidebarStates,
}: QuizContentProps) => {
    const quizNodes = QuizNodes({
        showAlert,
        quizId,
        sidebarStates,
        setSidebarStates,
    });

    const visualNodes = VisualizationNodes({ eventSourceRef, showAlert });

    return (
        <div className='w-[calc(100vw-17rem)]'>
            {quizNodes.head}
            <section className='flex h-1/2'>
                {quizNodes.description}
                {visualNodes.visualization}
            </section>
            {visualNodes.terminal}
            {quizNodes.submit}
        </div>
    );
};

export const QuizPage = ({
    showAlert,
    eventSourceRef,
    sidebarStates,
    setSidebarStates,
}: QuizPageProps) => {
    return (
        <QuizPageWrapper showAlert={showAlert}>
            {(quizId) => (
                <QuizContent
                    showAlert={showAlert}
                    quizId={quizId}
                    eventSourceRef={eventSourceRef}
                    sidebarStates={sidebarStates}
                    setSidebarStates={setSidebarStates}
                />
            )}
        </QuizPageWrapper>
    );
};
