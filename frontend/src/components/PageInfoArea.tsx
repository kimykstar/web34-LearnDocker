import { Link } from 'react-router-dom';
import PageType from './PageType';
import { Tooltip } from 'flowbite-react';

type PageInfoAreaProps = {
    pageType: string;
    path: string;
    title: string;
};
const PageInfoArea = ({ pageType, path, title }: PageInfoAreaProps) => {
    const quizNum = Number(path.slice(-1));
    const currentQuizNum = Number(sessionStorage.getItem('quiz'));

    const canResolve = () => {
        return pageType === 'quiz' && quizNum <= currentQuizNum;
    };
    return (
        <div className='flex'>
            <PageType pageType={pageType} />
            {canResolve() ? (
                <Link to={path}>{title}</Link>
            ) : (
                <Tooltip
                    content={
                        currentQuizNum === 0
                            ? '학습 시작 버튼을 눌러주세요.'
                            : '아직은 풀 수 없습니다.'
                    }
                    trigger='hover'
                >
                    <Link to={path} onClick={(e) => e.preventDefault()}>
                        {title}
                    </Link>
                </Tooltip>
            )}
        </div>
    );
};
export default PageInfoArea;
