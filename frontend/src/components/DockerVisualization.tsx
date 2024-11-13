import { Laptop, Server, Container, Database, Cloud } from 'lucide-react';
import { BaseNode } from './BaseNode';
import ContainerNode from './ContainerNode';
import { DockerPullVisualizationProps } from '../types/types';

const DockerPullVisualization = ({ containers, images }: DockerPullVisualizationProps) => {
    const initBaseNodes = [
        {
            label: 'client',
            icon: Laptop,
            gridColumn: 1,
            gridRow: 3,
        },
        {
            label: 'docker engine',
            icon: Server,
            gridColumn: 2,
            gridRow: 3,
        },

        {
            label: 'registry',
            icon: Cloud,
            gridColumn: 5,
            gridRow: 4,
        },
    ];

    return (
        <div className='grid grid-cols-5 grid-rows-5 w-[50%] border rounded-lg border-gray-300 my-4 ml-1'>
            {initBaseNodes.map(({ label, icon, gridRow, gridColumn }) => (
                <BaseNode
                    key={label}
                    label={label}
                    icon={icon}
                    gridColumn={gridColumn}
                    gridRow={gridRow}
                />
            ))}
            <ContainerNode
                key='containers'
                label='containers'
                icon={Container}
                gridRow={2}
                gridColumn={4}
                containerData={containers}
            />
            <ContainerNode
                key='images'
                label='images'
                icon={Database}
                gridRow={4}
                gridColumn={4}
                containerData={images}
            />
        </div>
    );
};

export default DockerPullVisualization;
