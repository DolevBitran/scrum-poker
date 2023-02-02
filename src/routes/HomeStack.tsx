import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { CardStyleInterpolators } from '@react-navigation/stack';
import Header from '../components/Header';
import { Entypo } from '@expo/vector-icons';

import Home from '../views/Home';
import Table from '../views/Table';

const Stack = createNativeStackNavigator();
export const HOME_ROUTES = {
    HOME: 'Home',
    TABLE: 'Table',
}

export default function HomeStack() {

    return (
        <Stack.Navigator screenOptions={{
            headerLeft: () => null,
            // headerRight: () => null,
            header: () => <Header />,
            headerShown: true,
            // headerShadowVisible: false,
            headerStyle: {
                backgroundColor: '#fff'
            }

            // gestureEnabled: true,
            // gestureDirection: 'horizontal',
            // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            // cardStyleInterpolator: (current) => {
            //   return { cardStyle: { opacity: current.progress } }
            // },
            // cardStyle: {
            //     backgroundColor: "transparent"
            // }
        }}>
            <Stack.Screen name={HOME_ROUTES.HOME} component={Home} />
            <Stack.Screen name={HOME_ROUTES.TABLE} component={Table} />
        </Stack.Navigator>
    );
}