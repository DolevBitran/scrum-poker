import React from 'react';
import { View, Text } from 'react-native';

interface IDeckBuilder {
    name: string;
    value: number;
}


const DeckBuilder: React.FC<IDeckBuilder> = () => {

    return (
        <View>
            <Text>deck builder</Text>
        </View>
    );
}

export default DeckBuilder