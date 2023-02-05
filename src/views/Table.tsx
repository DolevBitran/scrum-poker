import React from 'react';
import { StyleSheet, View, Dimensions, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import BottomSheet from '../components/BottomSheet';
import SEATS from '../Seats';
import { Card, Guest } from '../../store/models/room.model';
import { useTransition, animated, config, SpringValue } from '@react-spring/native';
import { BottomSheetRefProps } from '../components/BottomSheet/BottomSheet';
import { useSelector, useDispatch } from 'react-redux';
import { getDeck, getRoom, getSelectedCardIndex } from '../../store/selectors/room.selector';
import { Dispatch } from '../../store';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Table() {
    const bottomSheetRef = React.useRef<BottomSheetRefProps>(null)
    const dispatch = useDispatch<Dispatch>()
    const room = useSelector(getRoom)
    const roomSelectedCardIndex = useSelector(getSelectedCardIndex)
    const guests = room.guests

    bottomSheetRef.current?.scrollTo(0.3)
    const [size, setSize] = React.useState<{ width: number, height: number }>({ width: 0, height: 0 })

    const [transitions, transitionAPI] = useTransition(guests, () => ({
        from: { opacity: 0 },
        enter: { opacity: 1, config: { ...config.molasses, duration: 100 } },
        leave: { opacity: 0, config: { ...config.molasses, duration: 100 } },
    }))

    const onLayout = (event: LayoutChangeEvent) => {
        if (!size.width) {
            const { width, height } = event.nativeEvent.layout;
            setSize({ width, height })
        }
    };

    const UserElement = ({ guest, controller, index, style }: { guest: Guest, controller: any, index: number, style: { opacity: SpringValue<number> } }) => {
        const pos = SEATS[Math.max(guests.length, index + 1)][index]

        const [transform] = React.useState([
            { translateX: pos.right ? size.width / 2 : -size.width / 2 },
            { translateY: pos.bottom ? size.height / 10 : - size.height / 2 }
        ])

        React.useEffect(() => {
            if (transform[0].translateX) {
                controller.ctrl.start()
            }
        }, [transform])

        return <animated.View
            key={index}
            style={[styles.userWrapper, style, { ...pos, transform }]}
            onLayout={onLayout}
        >
            <Text style={styles.userName}>{guest.name}</Text>
            <View style={styles.userScoreWrapper}>
                <Text style={styles.userScore}>{1}</Text>
            </View>
        </animated.View>
    }

    const onVote = async (voteValue: number) => {
        dispatch.room.vote(voteValue);

    }
    const CardsContainer = () => {
        const deck = useSelector(getDeck)
        if (!deck) {
            return null
        }
        const cards = deck.map((card: Card, index: number) => {
            const selectedCardStyle = index === roomSelectedCardIndex ? styles.selectedCard : null
            return (
                <View style={{ width: windowWidth / 5 }} key={index}>
                    <TouchableOpacity style={[{ padding: 20, backgroundColor: "orange" }, selectedCardStyle]} onPress={() => onVote(index)} >
                        <Text>{card.displayName}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
        return (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", flexWrap: 'wrap' }}>
                {cards}
            </View>
        )

    }
    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.innerTable}>
                    <View style={styles.innerLine}>
                        <View style={[styles.innerLine, styles.innerLineSmall]}>
                            <Text style={styles.innerText}>Scrum Poker</Text>
                        </View>
                    </View>
                </View>
                {transitions((style, guest, controller, index) => <UserElement style={style} guest={guest} controller={controller} index={index} />)}
            </View>
            <BottomSheet ref={bottomSheetRef} snapPoints={[0.2, 0.3, 1]}>
                <CardsContainer />
            </BottomSheet>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: windowHeight * 0.05,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        writingDirection: 'ltr',
        overflow: 'hidden',
    },
    table: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c8d1df',
        width: windowHeight * 0.35,
        height: windowHeight * 0.6,
        borderRadius: windowHeight * 0.2
    },
    innerTable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a5b4cb',
        width: '88%',
        height: '93%',
        borderRadius: windowHeight * 0.2
    },
    innerLine: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '92%',
        height: '96%',
        borderRadius: windowHeight * 0.2,
        borderColor: '#c8d1df',
        borderWidth: 1,
    },
    innerLineSmall: {
        borderRadius: windowHeight * 0.2,
        borderColor: '#c8d1df',
        width: '98%',
        height: '99%',
    },
    innerText: {
        width: 290,
        fontSize: 48,
        transform: [{ rotate: '-90deg' }],
        color: '#d3dae6'
    },
    userWrapper: {
        position: 'absolute',
        // top: '50%',
        // left: '50%',
        //@ts-ignore
        // transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        alignItems: 'center',
        overflow: 'visible',
    },
    userName: {
        marginBottom: windowHeight * 0.005,
        fontSize: windowHeight * 0.02,
        color: '#4B536A',
        textAlign: 'center',
        fontWeight: '500'
    },
    userScoreWrapper: {
        width: windowHeight * 0.05,
        height: windowHeight * 0.05,
        borderRadius: 12,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 50px 0px rgba(0, 0, 0, 0.2)',
        shadowColor: '#0000005d',
        elevation: 5,
    },
    userScore: {
        fontSize: windowHeight * 0.02,
        color: '#4B536A',
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: 'green'
    }
});




        // {/* Join Card */}
        // <LinearGradient
        //   // colors={['rgb(255, 241, 235)', 'rgb(172, 224, 249)']}
        //   colors={['#AFAFAF', '#AFAFAF']}
        //   start={[0.01, 0.01]}
        //   end={[0.2, 0.6]}
        //   locations={[0.1, 0.9]}
        //   style={styles.joinContainer}>
        //   <Text style={styles.joinHeader}>Join an existing room</Text>
        //   <View style={styles.searchRow}>
        //     <View style={styles.joinInputWrapper}>
        //       {/* @ts-ignore */}
        //       <TextInput style={[styles.joinTextInput, Platform.select({
        //         web: { outlineWidth: 0 }
        //       })]} placeholder='ex: 324566' placeholderTextColor='lightgray' />
        //     </View>
        //     <TouchableOpacity>
        //       <Text style={styles.joinText}>Join</Text>
        //     </TouchableOpacity>
        //   </View>
        // </LinearGradient>

        // {/* Lottie Test */}
        // <Lottie
        //   //@ts-ignore
        //   animationRef={animationRef}
        //   style={{ width: windowWidth * 0.8 }}
        //   source={require('../assets/lottie/planning.json')}
        //   autoPlay
        //   loop
        // />