import { QuizNodes } from './QuizNodes';
import { VisualizationNodes } from './VisualizationNodes';
import { QuizPageWrapper } from './QuizPageWrapper';

type QuizContentProps = {
    showAlert: (message: string) => void;
    quizId: string;
};

type QuizPageProps = {
    showAlert: (message: string) => void;
};

export const QuizContent = ({ showAlert, quizId }: QuizContentProps) => {
    const quizNodes = QuizNodes({ showAlert, quizId });

    const visualNodes = VisualizationNodes({ showAlert });

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

export const QuizPage = ({ showAlert }: QuizPageProps) => {
    return (
        <QuizPageWrapper showAlert={showAlert}>
            {(quizId) => <QuizContent showAlert={showAlert} quizId={quizId} />}
        </QuizPageWrapper>
    );
};
