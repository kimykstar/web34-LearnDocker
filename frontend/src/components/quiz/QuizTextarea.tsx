import { useTerminalInput } from '../../hooks/useTerminalInput';
import { QuizTextAreaProps } from '../../types/quiz';

const QuizTextArea = ({ updateVisualizationData }: QuizTextAreaProps) => {
    const { terminalInput, handleTerminalInput, handleTerminalEnter } = useTerminalInput();

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        //TODO: handleTerminalEnter가 실패하면 updateVisualizationData를 실행 할 필요가 없어 보입니다
        await handleTerminalEnter(event);
        await updateVisualizationData(event);
    };

    return (
        <section className='h-48 w-[83.5%] border rounded-lg border-gray-300 bg-gray-50 ml-4'>
            <textarea
                value={terminalInput}
                onChange={handleTerminalInput}
                onKeyDown={handleKeyDown}
                className='w-full h-full text-gray-700 rounded-lg bg-inherit resize-none focus:outline-none p-2'
            ></textarea>
        </section>
    );
};

export default QuizTextArea;
