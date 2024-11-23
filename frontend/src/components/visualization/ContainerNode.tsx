import { ContainerNodeProps } from '../../types/visualization';

const ContainerNode = ({
    label,
    icon: Icon,
    gridRow,
    gridColumn,
    containerData,
}: ContainerNodeProps) => {
    return (
        <div
            className='border-gray-300 border-2 relative'
            style={{
                gridRowStart: gridRow,
                gridColumnStart: gridColumn,
            }}
        >
            <div className='absolute -translate-y-20 -translate-x-8 flex flex-col items-center gap-2'>
                <span className='text-sm'>{label}</span>
                <Icon size={64} />
            </div>
            <div className='flex flex-col overflow-auto h-full'>
                {containerData?.map((element) => (
                    <div
                        className='relative border-4 rounded m-1 text-xs'
                        style={{
                            borderColor: element.color,
                        }}
                        key={element.id}
                    >
                        {Object.keys(element).includes('image') && (
                            <span className='absolute -top-1 -right-1  inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75 animate-ping'></span>
                        )}
                        {Object.keys(element).includes('image') && (
                            <span className='absolute -top-1 -right-1 inline-flex rounded-full h-2 w-2 bg-sky-500'></span>
                        )}
                        {element.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContainerNode;
