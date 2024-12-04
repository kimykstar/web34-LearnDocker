import { Image } from '../../types/visualization';

type ImagePopoverProps = {
    image: Image;
};

const ImagePopover = ({ image }: ImagePopoverProps) => {
    const { id, name } = image;
    return (
        <>
            ID: {id}
            <br />
            Image Name: {name}
            <br />
        </>
    );
};
export default ImagePopover;
