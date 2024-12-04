import { Container } from '../../types/visualization';

type ContainerPopoverProps = {
    container: Container;
};

const ContainerPopover = ({ container }: ContainerPopoverProps) => {
    const { id, name, image, status } = container;
    return (
        <>
            ID: {id}
            <br />
            Container Name: {name}
            <br />
            Container Image: {image}
            <br />
            Container Status: {status}
        </>
    );
};
export default ContainerPopover;
