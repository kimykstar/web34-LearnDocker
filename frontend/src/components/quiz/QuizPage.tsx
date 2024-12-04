import { QuizNodes } from './QuizNodes';
import { VisualizationNodes } from './VisualizationNodes';
import { QuizPageWrapper } from './QuizPageWrapper';

type QuizContentProps = {
    showAlert: (message: string) => void;
    eventSourceRef: React.MutableRefObject<EventSource | null>;
    quizId: string;
};

type QuizPageProps = {
    showAlert: (message: string) => void;
    eventSourceRef: React.MutableRefObject<EventSource | null>;
};

export const QuizContent = ({ showAlert, quizId, eventSourceRef }: QuizContentProps) => {
    const quizNodes = QuizNodes({ showAlert, quizId });

    const visualNodes = VisualizationNodes({ eventSourceRef, showAlert });

    return (
        <>
            {quizNodes.head}
            <div className='flex flex-col gap-3 h-[calc(100vh-10rem)] justify-between'>
                <div className='flex gap-3 flex-1'>
                    {quizNodes.description}
                    {visualNodes.visualization}
                </div>
                <div className='flex flex-col 2xl:flex-row gap-3 2xl:gap-5 flex-1'>
                    {visualNodes.terminal}
                    {quizNodes.submit}
                </div>
            </div>
        </>
    );
};

export const QuizPage = ({ showAlert, eventSourceRef }: QuizPageProps) => {
    return (
        <QuizPageWrapper showAlert={showAlert}>
            {(quizId) => (
                <QuizContent
                    showAlert={showAlert}
                    quizId={quizId}
                    eventSourceRef={eventSourceRef}
                />
            )}
        </QuizPageWrapper>
    );
};
