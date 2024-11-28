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
