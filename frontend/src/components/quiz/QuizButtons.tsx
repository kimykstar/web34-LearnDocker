import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestQuizAccessability, requestSubmitResult } from '../../api/quiz';

type QuizButtonsProps = {
    quizId: number;
    answer: string;
};

const QuizButtons = ({ quizId, answer }: QuizButtonsProps) => {
    const [submitResult, setSubmitResult] = useState('default');
    const navigate = useNavigate();

    const handleSubmitButtonClick = async () => {
        const submitResponse = await requestSubmitResult(quizId, answer, navigate);
        if (!submitResponse) {
            return;
        }

        if (submitResponse.quizResult === 'SUCCESS') {
            setSubmitResult('SUCCESS');
        } else {
            setSubmitResult('FAIL');
        }

        // TODO: submitResult의 상태에 따라 모달창을 띄워줘야 한다.
        // 아래 console.log는 테스트 용도, 나중에 삭제해야 함
        // 여기서 해줄 작업은 없고, 아래 jsx를 return해줄 때 모달창 띄우는 코드를 추가해야 할 듯 합니다.

        // default가 나오는 이유는 setState가 비동기적으로 실행 되기 때문입니다.
        // useEffect를 사용하거나 바뀐값을 변수에 담고 변수값을 console.log로 보여줘도 될 것 같아요
        // 일단 아직 결정된 사항이 없어서 주석에 적기만 하겠습니다.
        console.log(submitResult);
    };

    const handlePrevButtonClick = async () => {
        if (quizId === 1) {
            alert('처음 문제입니다');
            return;
        }

        if (quizId === 4) {
            navigate('/what-is-container-lifecycle');
            return;
        }

        navigate(`/quiz/${quizId - 1}`);
    };

    const handleNextButtonClick = async () => {
        if (quizId > 8) {
            alert('마지막 문제입니다');
            return;
        }
        
        if (quizId === 3) {
            navigate('/what-is-docker-container');
            return;
        }

        const isAccessable = await requestQuizAccessability(quizId + 1);
        if (!isAccessable) {
            alert('아직 풀 수 없습니다');
            return;
        }

        navigate(`/quiz/${quizId + 1}`);
    };

    return (
        <section className='w-[85%] flex justify-end'>
            <button
                className='text-lg text-white rounded-lg bg-gray-300 hover:bg-gray-400 py-2 px-4 my-4 mx-1'
                onClick={handlePrevButtonClick}
            >
                이전
            </button>
            <button
                className='text-lg text-white rounded-lg bg-sky-400 hover:bg-sky-500 py-2 px-4 m-4'
                onClick={handleNextButtonClick}
            >
                다음
            </button>
            <button
                onClick={handleSubmitButtonClick}
                className='text-xl text-white rounded-lg bg-Moby-Blue hover:bg-blue-800 py-2 px-4 m-4'
            >
                채점하기
            </button>
        </section>
    );
};

export default QuizButtons;
