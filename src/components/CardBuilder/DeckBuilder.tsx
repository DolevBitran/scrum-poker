import React from 'react';
import { View, Text } from 'react-native';

interface IDeckBuilder {
    name: String,
    value: Number
}


const DeckBuilder: React.FC<IDeckBuilder> = () => {

    return (
        <View>
            <Text>deck builder</Text>
        </View>
    );
}

export { DeckBuilder }