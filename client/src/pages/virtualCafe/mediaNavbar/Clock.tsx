import {useEffect, useState} from 'react'

function Clock() {
    const [clockState, setClockState] = useState<string>('');

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleTimeString([], {timeStyle: "short"}));
        },);
    }, []);

  return (
    <div className='clock'>{clockState}</div>
  )
}

export default Clock