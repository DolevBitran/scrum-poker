const UP_TO_4 = [
    { top: '0%', right: '50%' },
    { top: '95%', right: '50%' },
    { top: '47%', right: '0%' },
    { top: '47%', right: '100%' }
]

const UP_TO_6 = [
    { top: '0%', right: '50%' },
    { top: '31%', right: '0%' },
    { top: '31%', right: '100%' },
    { top: '65%', right: '100%' },
    { top: '65%', right: '0%' },
    { top: '95%', right: '50%' },
]

const UP_TO_8 = [
    { top: '0%', right: '50%' },
    { top: '20%', right: '6%' },
    { top: '47%', right: '0%' },
    { top: '75%', right: '6%' },
    { top: '20%', right: '94%' },
    { top: '47%', right: '100%' },
    { top: '75%', right: '94%' },
    { top: '95%', right: '50%' },
]

const UP_TO_12 = [
    { top: '0%', right: '34%' },
    { top: '16.6%', right: '6%' },
    { top: '37%', right: '0%' },
    { bottom: '37%', right: '0%' },
    { bottom: '16.6%', right: '6%' },
    { bottom: '0%', right: '34%' },
    { top: '0%', left: '34%' },
    { top: '16.6%', left: '6%' },
    { top: '37%', left: '0%' },
    { bottom: '37%', left: '0%' },
    { bottom: '16.6%', left: '6%' },
    { bottom: '0%', left: '34%' },
]

type ISeats = {
    [amount: number]: any;
}
const SEATS: ISeats = {
    1: UP_TO_4,
    2: UP_TO_4,
    3: UP_TO_4,
    4: UP_TO_4,
    5: UP_TO_6,
    6: UP_TO_6,
    7: UP_TO_8,
    8: UP_TO_8,
}

export default SEATS;