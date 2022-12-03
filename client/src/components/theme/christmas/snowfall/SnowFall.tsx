import './SnowFall.css';

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface SnowFallProps {
    size: number;
}

function SnowFalls({size}: SnowFallProps) {
    let snows:JSX.Element[] = [];
    for(let i = 0; i < size; i++)
        snows.push(
            <div key={i} className="snowflake" 
                style={{
                    fontSize: random(14, 24) + 'px',
                    left: random(0, 25) * 4 +'%', 
                    animationDelay: random(0, size) * 200 + 'ms, ' + random(0, size) * 150 + 'ms'
                }}
            >
                ❄
            </div>)

    return (
        <div className="snowflakes">
            {snows}
        </div>
    )
}

export default SnowFalls;