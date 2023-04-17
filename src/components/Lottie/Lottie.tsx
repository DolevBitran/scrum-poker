import React from 'react';
import LottieView, { LottieComponentProps as LottieViewProps, LottieRef } from 'lottie-react';

interface ILottieProps extends Omit<LottieViewProps, 'animationData'> {
    source: LottieViewProps['animationData'];
    animationRef?: LottieRef | undefined;
}

const Lottie: React.FC<ILottieProps> = ({ source, animationRef, ...props }) => {
    return <LottieView lottieRef={animationRef} animationData={source} {...props} />
}

export { Lottie };