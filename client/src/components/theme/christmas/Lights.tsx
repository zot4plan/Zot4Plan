import './Lights.css';

function Lights () {
    let lights:JSX.Element[] = [];
    for(let i = 0; i < 40; i++)
        lights.push(<li key={i} className={"light-" + (i % 4 + 1)}></li>)
    return (
        <ul className="lightrope">
            {lights}
        </ul>
    )
}

export default Lights;