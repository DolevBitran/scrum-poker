import React from 'react';
import LottieView, { AnimatedLottieViewProps as LottieViewProps } from 'lottie-react-native';

interface ILottieProps extends LottieViewProps {
    animationRef: React.MutableRefObject<LottieView>
}

const Lottie: React.FC<ILottieProps> = ({ animationRef, ...props }) => {
    return <LottieView ref={animationRef} {...props} />
}

export { Lottie };