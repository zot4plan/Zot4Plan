import { useRef } from 'react'

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface FlyingBatsProps {
    setAnimationEnd: () => void;
}

function FlyingBats({setAnimationEnd}: FlyingBatsProps) {
    const count = useRef(0);
    const handleOnAnimationEnd = () => {
        count.current += 1;
        if(count.current === 12) {
            count.current = 0;
            setAnimationEnd();
        }
    }

    let bats:JSX.Element[] = [];
    for(let i = 0; i < 12; i++)
        bats.push(
            <div key={i} className="snowflake" 
                onAnimationEnd={handleOnAnimationEnd}
                style={{
                    left: random(0, 20) * 4 +'%', 
                    animationDelay: random(0, 10) * 200 + 'ms, ' + random(0, 10) * 150 + 'ms'
            }}>
                <img src="https://media1.giphy.com/media/0xR7MUO0hJfWtco7C6/giphy.gif" alt='flying bat'/> 
            </div>)

    return (
        <div className="snowflakes">
            {bats}
        </div>
    )
}

export default FlyingBats;