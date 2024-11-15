type QuizDescriptionProps = {
    content: string | undefined;
};

const QuizDescription = ({ content }: QuizDescriptionProps) => {
    return (
        <div className='w-[33%] border rounded-lg border-gray-300 my-4 ml-4 mr-1 pl-4'>
            <h2 className='font-semibold text-2xl text-Dark-Blue pt-4 pb-2'>문제</h2>
            <p className='font-medium text-lg text-gray-800 whitespace-pre-wrap'>{content}</p>
        </div>
    );
};

export default QuizDescription;
