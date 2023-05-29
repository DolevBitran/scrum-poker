import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface IDecksListProps {
    onDeckPressed: Function,
    onDeletePressed: Function,
    selectedDeckIdx: number | null,
    decks: IDeck[]

}


const DecksList: React.FC<IDecksListProps> = ({ decks, onDeckPressed, onDeletePressed, selectedDeckIdx }) => {
    const decksToRender = decks.map((deck, index) => {
        return (
            <TouchableOpacity style={[styles.decks, index === selectedDeckIdx ? styles.selectedDeck : null]} onPress={() => onDeckPressed(index)} key={index}>
                <Text>{`name: ${deck.name}`}</Text>
                <Text>{`length: ${deck.cards.length}`}</Text>
                <TouchableOpacity style={{ width: 50 }} onPress={() => onDeletePressed(index)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </TouchableOpacity >
        )
    })
    return <View>{decksToRender}</View>
}

const styles = StyleSheet.create({
    decks: {
        display: 'flex',
        borderWidth: 1
    },
    selectedDeck: {
        backgroundColor: '#c22c1b'
    }
});

export default DecksList