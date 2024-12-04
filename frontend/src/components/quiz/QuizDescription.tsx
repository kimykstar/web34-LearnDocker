type QuizDescriptionProps = {
    content: string | undefined;
};

const QuizDescription = ({ content }: QuizDescriptionProps) => {
    return (
        <div className='w-[45%] border rounded-lg border-gray-300 p-4'>
            <h2 className='font-semibold text-2xl text-Dark-Blue py-2'>문제</h2>
            <p className='font-medium text-lg text-gray-800 whitespace-pre-wrap'>{content}</p>
        </div>
    );
};

export default QuizDescription;
