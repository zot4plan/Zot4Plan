import { useEffect, useState } from 'react'

function Clock() {
    const [ClockState, setClockState] = useState('');
    useEffect(() => {
        setInterval(() => setClockState((new Date()).toLocaleTimeString([], { timeStyle: "short" })),);
    },[]);

    return (
        <div className='virtual-cafe-button'>{ClockState}</div>
    )
}

export default Clock