type PageTypeProps = {
    type: string;
};

const PageType = ({ type }: PageTypeProps) => {
    return (
        <span className='inline-flex items-center justify-center text-[10px] text-gray-500 h-6 border border-gray-300 rounded-md bg-gray-100 shadow-sm px-1 py-0.5'>
            {type}
        </span>
    );
};

export default PageType;
