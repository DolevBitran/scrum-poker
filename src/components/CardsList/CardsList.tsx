import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ICardsList {
    cards: ICard[],
    onDeletePressed: Function
}


const CardsList: React.FC<ICardsList> = ({ cards, onDeletePressed }) => {
    const cardsToRender = cards.map((card, index) => {
        return (
            <View key={index} style={styles.savedCard}>
                <Text>{`Value: ${card.value}`}</Text>
                <Text>{`Card Name: ${card.displayName}`}</Text>
                <TouchableOpacity style={{ width: 50 }} onPress={() => onDeletePressed(index)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    })

    return (
        <View>{cardsToRender}</View>
    );
}

const styles = StyleSheet.create({
    savedCard: {
        borderWidth: 1,
        backgroundColor: '##91807e'
    }
});

export default CardsList