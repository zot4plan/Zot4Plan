import { useState, ChangeEvent} from 'react';
import { useStore } from 'react-redux';
import { RootState } from '../../app/store';
import ReactTooltip from 'react-tooltip';
import Axios from '../../api/Axios';

function ButtonSave () {
    const [name, setName] = useState("");
    const [message, setMessage] = useState({content: "", status: 'idle'});

    const store = useStore();

    const getSchedule = () => {
        let state:RootState = store.getState()
        let years = state.store.years.allIds.map(id => 
                        state.store.years.byIds[id].map(id => 
                            state.store.sections[id]
                    ));
        return {
            selectedPrograms: state.programs.selectedPrograms,
            addedCourses: state.programs.sections[state.programs.addedCourses],
            years: years as string[][][],
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setTimeout(() => {
            let schedule = getSchedule();
            Axios.post('/api/saveSchedule', {id: name, schedule: schedule}).then(response => {
                setMessage({status: "success", content: "saved!"})
            }).catch(() => {
                setMessage({status: "failed", content: "failed"})
            })
        }, 500);
        
    }

    return (
        <div className="relative flex-container">    
            <button 
                className='btn' 
                data-tip data-for='save'
                aria-label="download your plan as a JSON file"
            >   
                Save
            </button> 

            <ReactTooltip 
                id="save" 
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
                        name="saveName"
                        value = {name}
                        onChange = {handleInputChange}
                    />

                    <button className='btn' onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

                {message.status != "idle" && <p> {message.content} </p>}
            </ReactTooltip>
        </div>
    )
}

export default ButtonSave;