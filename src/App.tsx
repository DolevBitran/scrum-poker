import React, { useCallback, useRef } from 'react';
import { Dimensions, I18nManager, Platform } from 'react-native';

import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import HomeStack from './routes/HomeStack';
import ClientConfiguration from './config/ClientConfiguration';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useDispatch } from 'react-redux';
import { Dispatch, store } from '../store';


SplashScreen.preventAutoHideAsync()

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

if (Platform.OS !== 'web') {
  I18nManager.allowRTL(false)
  I18nManager.forceRTL(false)
  I18nManager.swapLeftAndRightInRTL(false)
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default WrappedApp

function App() {
  const navigationContainerRef = useRef<NavigationContainerRef<{
    Home: React.FC;
    Room: React.FC;
  }>>(null)

  const dispatch = useDispatch<Dispatch>();

  React.useEffect(() => {
    if (navigationContainerRef.current) {
      dispatch.room.init(navigationContainerRef.current)
    }
  }, [navigationContainerRef.current])

  const config = {
    screens: {
      Home: '',
      Room: 'room/:roomId',
    },
  };

  const linking = {
    prefixes: ['http://localhost:19006', 'scrum://'],
    config,
  };

  const [fontsLoaded] = useFonts({
    'Rubik-200': require('../assets/fonts/Rubik/Rubik-Black.ttf'),
    'Rubik-300': require('../assets/fonts/Rubik/Rubik-Light.ttf'),
    'Rubik': require('../assets/fonts/Rubik/Rubik-Regular.ttf'),
    'Rubik-500': require('../assets/fonts/Rubik/Rubik-Medium.ttf'),
    'Rubik-600': require('../assets/fonts/Rubik/Rubik-SemiBold.ttf'),
    'Rubik-700': require('../assets/fonts/Rubik/Rubik-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      console.log('fonts loaded')
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  onLayoutRootView()


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking} ref={navigationContainerRef}>
        {fontsLoaded && <HomeStack />}
      </NavigationContainer>
      <ClientConfiguration />
    </GestureHandlerRootView>
  );
}