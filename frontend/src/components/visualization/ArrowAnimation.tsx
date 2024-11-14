import { Arrow } from './Arrow';
import { MoveRight, MoveDownRight, MoveLeft } from 'lucide-react';
import { AnimationProps, DOCKER_OPERATIONS } from '../../types/visualization';

export const ArrowAnimation = ({ isVisible, onComplete, dockerOperation }: AnimationProps) => {
    switch (dockerOperation) {
        case DOCKER_OPERATIONS.IMAGE_PULL:
            return (
                <>
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFirst' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSecond' : ''}
                        icon={MoveDownRight}
                        gridColumn={4}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative left-4 animate-showAndHideThird' : ''}
                        icon={MoveRight}
                        gridColumn={6}
                        gridRow={4}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative left-4 animate-showAndHideFourth' : ''}
                        icon={MoveLeft}
                        gridColumn={6}
                        gridRow={4}
                        isVisible={isVisible}
                        onAnimationEnd={onComplete}
                    />
                </>
            );

        case DOCKER_OPERATIONS.IMAGE_DELETE:
            return (
                <>
                    <Arrow
                        className={isVisible ? 'animate-showAndHideFirst' : ''}
                        icon={MoveRight}
                        gridColumn={2}
                        gridRow={3}
                        isVisible={isVisible}
                    />
                    <Arrow
                        className={isVisible ? 'relative top-28 animate-showAndHideSecond' : ''}
                        icon={MoveDownRight}
                        gridColumn={4}
                        gridRow={3}
                        isVisible={isVisible}
                        onAnimationEnd={onComplete}
                    />
                </>
            );

        default:
            return null;
    }
};
