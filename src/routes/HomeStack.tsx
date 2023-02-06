import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { getRoom } from '../../store/selectors/room.selector';

import Header from '../components/Header';
import Home from '../views/Home';
import Room from '../views/Room';

type HomeStackParamList = {
    Home: undefined;
    Room: { roomId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    const room = useSelector(getRoom)

    return (
        <Stack.Navigator screenOptions={{
            header: () => <Header />,
            headerShown: true,
            headerStyle: {
                backgroundColor: '#fff'
            }
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Room" component={Room} initialParams={{ roomId: room?.id }} />
        </Stack.Navigator>
    );
}