import { Link } from 'react-router-dom';
import PageType from './PageType';

type PageInfoAreaProps = {
    pageType: string;
    path: string;
    title: string;
};
const PageInfoArea = ({ pageType, path, title }: PageInfoAreaProps) => {
    return (
        <div className='flex'>
            <PageType pageType={pageType} />
            <Link to={path}>{title}</Link>
        </div>
    );
};
export default PageInfoArea;
