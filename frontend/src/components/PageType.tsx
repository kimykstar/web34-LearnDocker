type PageTypeProps = {
    pageType: string;
};

const PageType = ({ pageType }: PageTypeProps) => {
    return (
        <span
            className={`inline-flex items-center justify-center text-[10px] border h-6 rounded-md px-1 py-0.5 ${pageType === 'quiz' ? 'text-blue-500 border-blue-300' : 'text-gray-500 border-gray-300 bg-gray-100 '}`}
        >
            {pageType}
        </span>
    );
};

export default PageType;
