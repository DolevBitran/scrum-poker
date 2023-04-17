import { SpringValue } from '@react-spring/native';
import React from 'react';

export type IGuestProps = {
    guest: IGuest;
    controller: any;
    index: number;
    style: { opacity: SpringValue<number> };
}

const Guest: React.FC<IGuestProps> = ({ guest, style, controller, index }) => {
    // for some reason, animation doesn't work when Guest component is written outside of Table
    return null
}

export { Guest };