import React, { useEffect, useState } from 'react'
import '../styles/global.css'
import { useWindowDimensions } from 'react-native';

//create your forceUpdate hook
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}

const ClientConfiguration = () => {
    // const [_, rerender] = useState();
    const forceUpdate = useForceUpdate();
    const { width, height } = useWindowDimensions()
    console.log('render')
    useEffect(() => {
        forceUpdate()
    }, [width, height])
}

export default ClientConfiguration