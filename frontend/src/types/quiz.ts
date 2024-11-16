export type Quiz = {
    id: number;
    title: string;
    content: string | undefined;
};

export type QuizResult = {
    quizResult: 'SUCCESS' | 'FAIL';
};

export type QuizTextAreaProps = {
    updateVisualizationData: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};
