import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import DecksList from '../components/DecksList';
import CardsList from '../components/CardsList';
import { Dispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getDeckBeingBuilt, getAllDecks, getSelectedDeckIdx, getCardBeingCreated } from '../../store/selectors/decksManager.selector'
interface IDeckBuilderProps {
}


const DeckBuilder: React.FC<IDeckBuilderProps> = () => {
    const currentCard = useSelector(getCardBeingCreated)
    const allDecks = useSelector(getAllDecks);
    const dispatch = useDispatch<Dispatch>();
    const deckBeingBuilt = useSelector(getDeckBeingBuilt);
    const selectedDeckIdx = useSelector(getSelectedDeckIdx);
    const onSaveCardClicked = () => {
        dispatch.decksManager.saveCard(currentCard)
    }
    const setCardValue = (value: string) => {
        // const filteredValue = value.replace(/[^0-9]/g, '');
        // TODO: fix the regex showing non numeric value
        dispatch.decksManager.setCardBeingCreated({ ...currentCard, value })
    }
    const setCardDisplayName = (displayName: string) => {
        dispatch.decksManager.setCardBeingCreated({ ...currentCard, displayName })
    }
    const onSaveDeckClicked = () => {
        dispatch.decksManager.onSaveDeck();
    }
    const onCreateDeckClicked = () => {
        dispatch.decksManager.onCreateDeck();
    }
    const deleteDeck = (index: number) => {
        dispatch.decksManager.deleteDeck(index);
    }
    const setCurrentDeckName = (name: string) => {
        dispatch.decksManager.setDeckName(name);
    }
    const setSelectedDeck = (index: number) => {
        dispatch.decksManager.setSelectedDeck(index);
    }
    const deleteCard = (index: number) => {
        dispatch.decksManager.deleteCard(index);
    }

    return (
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 5, paddingVertical: 2, marginBottom: 10 }}>
            <TextInput placeholder="Card Name" style={styles.textInput} onChangeText={setCardDisplayName} />
            <TextInput placeholder="Card Value" style={styles.textInput} onChangeText={setCardValue} />
            <Text>deck builder</Text>
            <TouchableOpacity onPress={onSaveCardClicked} >
                <Text style={styles.buttonText}>Save Card</Text>
            </TouchableOpacity>
            <CardsList cards={deckBeingBuilt} onDeletePressed={deleteCard} />
            <TextInput placeholder="Deck Name" style={styles.textInput} onChangeText={setCurrentDeckName} />
            <TouchableOpacity onPress={onSaveDeckClicked} >
                <Text style={styles.buttonText}>Save Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCreateDeckClicked} >
                <Text style={styles.buttonText}>Create New Deck</Text>
            </TouchableOpacity>
            <Text>Saved Decks</Text>
            <DecksList decks={allDecks} onDeckPressed={setSelectedDeck} onDeletePressed={deleteDeck} selectedDeckIdx={selectedDeckIdx} />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: '40px',
        borderColor: '#2596be',
        borderWidth: 1
    },
    buttonText: {
        margin: '20px'
    }
});

export default DeckBuilder