import { ChangeEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchSchedule } from '../../api/FetchData';
import ReactTooltip from 'react-tooltip';

import './ButtonLoad.css'

function ButtonLoad () {
    const [name, setName] = useState("");
    const [message, setMessage] = useState({content: "", status: 'idle'});

    const dispatch = useDispatch();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleOnSubmit = ( e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(fetchSchedule(name));
    }

    return (
        <div className="flex-container" style={{position:'relative'}}>
            <button className='btn' 
                data-tip data-for='load'
                aria-label='Open upload file card'> Load </button>

            <ReactTooltip 
                id="load" 
                place="bottom" 
                effect="solid" 
                event='click' 
                globalEventOff='click' 
                clickable = {true}  
                type="light"
                borderColor='black'
            >
                <div onClick={e => e.stopPropagation()}>
                    <input type="text"
                        name="loadName"
                        value = {name}
                        onChange = {handleInputChange}
                    />

                    <button className='btn' onClick={handleOnSubmit}>
                        Submit
                    </button>
                </div>

                {message.status != "idle" && <p> {message.content} </p>}
            </ReactTooltip>
            
        </div>
    )
}

export default ButtonLoad;