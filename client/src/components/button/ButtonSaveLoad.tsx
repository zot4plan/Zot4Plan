import { useState, ChangeEvent, MouseEvent} from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '../../app/store';
import ReactTooltip from 'react-tooltip';
import Axios from '../../api/Axios';
import Confetti from 'react-confetti';
import Message from '../message/Message';
import { fetchSchedule } from '../../api/FetchData';

function ButtonSave () {
    const [name, setName] = useState("");
    const [message, setMessage] = useState({content: "", status: 'idle', isSave: true});
    const status = useSelector((state: RootState) => state.store.status);
    const maxLength = 32;

    const dispatch = useDispatch();
    const store = useStore();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleOnClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    }

    const handOnClickButton = (e: MouseEvent<HTMLButtonElement>, value: string) => {
        if(value === "save" && !message.isSave) 
            setMessage({content: "", status: 'idle', isSave: true});

        else if(value === "load" && message.isSave)
            setMessage({content: "", status: 'idle', isSave: false});
    }

    const handleOnSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setTimeout(() => {
            if(name.length < 10)
                setMessage({status: "failed", content: "Input must contain at least 10 characters!", isSave: message.isSave})

            else if (/\s/g.test(name)) 
                setMessage({status: "failed", content: "Input cannot contain white spaces!", isSave: message.isSave})

            else if(message.isSave){ // save 
                const state:RootState = store.getState()

                if(state.store.totalUnits > 0) {
                    const years = state.store.years.allIds.map(id => 
                        state.store.years.byIds[id].map(id => 
                            state.store.sections[id]
                    ));
                    const schedule = {
                        selectedPrograms: state.programs.selectedPrograms,
                        addedCourses: state.programs.sections[state.programs.addedCourses],
                        years: years as string[][][],
                    };

                    Axios.post('/api/saveSchedule', {id: name, schedule: schedule}).then(() => {
                        setMessage({status: "succeeded", content: "Saved successfully!", isSave: message.isSave})
                    }).catch(() => {
                        setMessage({status: "failed", content: "Failed to save schedule", isSave: message.isSave})
                    })
                }
                else
                    setMessage({status: "failed", content: "Please add courses before saving!!!", isSave: message.isSave})
            }
            else { // load
                dispatch(fetchSchedule(name));
                setMessage({status: "idle", content: "", isSave: message.isSave})
            }
        }, 500);
    }

    return (
        <div className="relative flex-container" onClick={handleOnClick}>    
            <button className='btn margin-right-1'
                data-tip data-for='save_load'
                aria-label="Save Schedule"
                onClick={(e) => handOnClickButton(e, "save")}> Save </button> 

            <button className='btn' 
                data-tip data-for='save_load'
                aria-label='Load Schedule'
                onClick={(e) => handOnClickButton(e, "load")}> Load </button>

            <ReactTooltip 
                id="save_load" 
                place="bottom" 
                effect="solid" 
                type="light"
                event='click' globalEventOff='dblclick' clickable={true} isCapture={true}
                border={true} 
                borderColor='#307ABB' 
                className='popup'
            >
                <div className="flex-container flexColumn" onClick={handleOnClick}>
                    <label htmlFor="scheduleName" style={{width: '100%'}}> Enter schedule name: </label>
                    <input type="text"
                        id="scheduleName"
                        name="scheduleName"
                        maxLength={maxLength}
                        value = {name}
                        className = "username-input"
                        onChange = {handleInputChange}
                    />

                    <button className='btn' onClick={handleOnSubmit} style={{marginBottom: "0.8rem"}}> Submit </button>

                    <div style={{position: 'relative'}}> 
                        {message.status !== "idle" && 
                            <Message status={message.status} content={message.content}/>}

                        {status !== "idle" && !message.isSave &&
                            <Message status={status} 
                                    content={(status === "succeeded")? "Load successfully!" : "Cannot find your schedule!"}/>}
                    </div>

                    {message.status === "succeeded" && message.isSave &&
                    <Confetti
                        width={240}
                        height={100}
                        recycle={false}
                        numberOfPieces={200}
                        tweenDuration={10000}
                        onConfettiComplete= {() => setMessage({status: "idle", content: "", isSave: message.isSave})}
                    />}
                </div>
            </ReactTooltip>
        </div>
    )
}

export default ButtonSave;