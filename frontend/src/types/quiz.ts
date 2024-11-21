export type Quiz = {
    id: number;
    title: string;
    content: string | undefined;
};

export type QuizResult = {
    quizResult: 'SUCCESS' | 'FAIL';
};

export type QuizTextAreaProps = {
    updateVisualizationData: () => Promise<void>;
};
