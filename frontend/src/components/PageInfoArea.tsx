import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

type PageInfoAreaProps = {
    pageType: string;
    solved?: boolean;
    path: string;
    title: string;
};
const PageInfoArea = ({ pageType, solved, path, title }: PageInfoAreaProps) => {
    return (
        <div className='flex'>
            <Link to={path}>{title}</Link>
            {pageType === 'quiz' && solved && <Check className='ml-1 text-green-500' />}
        </div>
    );
};
export default PageInfoArea;
