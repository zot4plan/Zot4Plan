import 'bootstrap/dist/css/bootstrap.min.css';
import required_ics from '../assets/icsrequirements';

const Requirements = () => {

    function check_tag(key, value)
    {
        if(required_ics[key])
        {
            return <li key={value}>{key}</li>
        }
        return <h6 key={value}>{key}</h6>
    }
    return (
        <ul>
            {Object.keys(required_ics).map((key, value) => (
                check_tag(key, value)
            ))}
        </ul>
    )
}

export default Requirements