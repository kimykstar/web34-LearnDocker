type QuizInputBoxProps = {
    answer: string;
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const QuizInputBox = ({ answer, setAnswer }: QuizInputBoxProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };
    return (
        <div className='w-[85%] flex justify-end'>
            <input
                className='flex justify-center w-60 h-8 rounded-lg border border-gray-300 mt-4 outline-none ml-1'
                type='text'
                onChange={handleChange}
                value={answer}
                placeholder='정답을 입력해주세요.'
            />
        </div>
    );
};

export default QuizInputBox;
