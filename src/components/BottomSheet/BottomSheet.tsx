import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSpringValue, animated } from '@react-spring/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 130;

type BottomSheetProps = {
    children?: React.ReactNode;
    snapPoints: any[];
    isDraggable?: boolean;
    style?: ViewStyle;
};

export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
    ({ children, snapPoints, isDraggable = true, style = {} }, ref) => {
        const translateY = useSpringValue(0)
        const active = useSpringValue(false);

        const scrollTo = useCallback((destination: number) => {
            'worklet';
            translateY.start(destination * -SCREEN_HEIGHT)
            context.set(destination * -SCREEN_HEIGHT)
            active.set(destination !== 0);
        }, []);

        const isActive = useCallback(() => {
            return active.goal;
        }, []);

        useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
            scrollTo,
            isActive,
        ]);


        function closest(needle: number, haystack: number[]) {
            return haystack.reduce((a, b) => {
                let aDiff = Math.abs(a - needle);
                let bDiff = Math.abs(b - needle);

                if (aDiff == bDiff) {
                    return a > b ? a : b;
                } else {
                    return bDiff < aDiff ? b : a;
                }
            });
        }

        const context = useSpringValue(0);
        const gesture = Gesture.Pan()
            .onStart(() => {
                if (isDraggable) {
                    context.set(translateY.goal);
                }
            })
            .onUpdate((event) => {
                if (isDraggable) {
                    translateY.set(event.translationY + context.goal);
                    translateY.set(Math.max(translateY.goal, MAX_TRANSLATE_Y));
                }
            })
            .onEnd(() => {
                if (isDraggable) {
                    const snap = closest(translateY.goal, snapPoints.map(e => e * -SCREEN_HEIGHT))
                    scrollTo(snap / -SCREEN_HEIGHT)
                }
            });

        return (
            <GestureDetector gesture={gesture}>
                <animated.View style={[styles.bottomSheetContainer, style, { transform: [{ translateY }] }]}>
                    {isDraggable && <View style={styles.line} />}
                    {children}
                </animated.View>
            </GestureDetector>
        );
    }
);

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
        boxShadow: '0px 14px 150px 0px rgba(0, 0, 0, 0.2)',
        shadowColor: '#000000',
        elevation: 15,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    },
});

export default BottomSheet;