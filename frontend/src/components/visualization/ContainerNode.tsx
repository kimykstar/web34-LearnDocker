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
            <div className='-translate-y-20 -translate-x-8 flex flex-col items-center gap-2'>
                <span className='text-sm'>{label}</span>
                <Icon size={64} />
            </div>
            <div className='flex flex-col overflow-auto'>
                {containerData?.map(({ id, name, color }) => (
                    <div
                        className='border-4 rounded m-1 text-xs'
                        style={{
                            borderColor: color,
                        }}
                        key={id}
                    >
                        {name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContainerNode;
