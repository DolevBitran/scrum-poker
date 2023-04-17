import { View, Text } from 'react-native';
import { NavigationContainer, NavigationContainerProps, NavigationContainerRef } from '@react-navigation/native';
import HomeStack from './routes/HomeStack';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../store';

interface INavgiationProps {
    fontsLoaded: Boolean
}

const Navigation: React.FC<INavgiationProps> = ({ fontsLoaded }) => {
    const navigationContainerRef = useRef<AppNavigationContainer>(null)
    const dispatch = useDispatch<Dispatch>();

    React.useEffect(() => {
        if (navigationContainerRef.current) {
            dispatch.app.initNavigator(navigationContainerRef.current);
        }
    }, [navigationContainerRef.current])

    const config = {
        screens: {
            Home: '',
            Room: 'room/:roomId',
            DeckBuilder: 'deckBuilder'
        },
    };

    const linking = {
        prefixes: ['http://localhost:19006', 'scrum://'],
        config,
    };

    return (
        <NavigationContainer linking={linking} ref={navigationContainerRef}>
            {fontsLoaded && <HomeStack />}
        </NavigationContainer >
    );
}

export { Navigation }