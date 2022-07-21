import { useState, ChangeEvent, MouseEvent} from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '../../app/store';
import ReactTooltip from 'react-tooltip';
import Axios from '../../api/Axios';
import Confetti from 'react-confetti';
import Message from '../message/Message';
import { fetchSchedule } from '../../api/FetchData';
import './ButtonSaveLoad.css';

const maxLength = 32;
const minLength = 8;
const scheduleNameNote = "Other users might be able to access and modify your schedule if the same name is used"
                        + ", so please try to use a unique name.";
const minLengthMessage = "Must contain at least " + minLength + " characters!";
const spaceMessage = "Cannot contain white spaces!"

function ButtonSaveLoad () {
    const [name, setName] = useState("");
    const [message, setMessage] = useState({content: "", status: 'idle', isSave: true});
    const status = useSelector((state: RootState) => state.store.status);

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handOnClickButton = (e: MouseEvent<HTMLButtonElement>, value: string) => {
        if(value === "save" && !message.isSave) 
            setMessage({content: "", status: 'idle', isSave: true});

        else if(value === "load" && message.isSave)
            setMessage({content: "", status: 'idle', isSave: false});
    }

    const dispatch = useDispatch();
    const store = useStore();

    const handleOnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        setTimeout(() => {
            if(name.length < minLength)
                setMessage({status:"failed", content: minLengthMessage, isSave: message.isSave})

            else if (/\s/g.test(name)) 
                setMessage({status:"failed", content: spaceMessage, isSave: message.isSave})

            else if(message.isSave) { // save 
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

    const handleOnConfettiComplete = () => {
        setMessage({status: "idle", content: "", isSave: message.isSave})
    }

    let messageContent;
    if(status !== "idle" && !message.isSave)
        messageContent = <Message status={status} content={(status === "succeeded")? "Loaded successfully!" : "Schedule not found!"}/>

    else if(message.status !== "idle" ) 
        messageContent = <Message status={message.status} content={message.content}/>
        
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
                    {message.isSave && <p style={{width: '100%'}}> {scheduleNameNote} </p>}
                    <input type="text"
                        id="scheduleName"
                        name="scheduleName"
                        maxLength={maxLength}
                        value = {name}
                        className = "schedule-name-input"
                        onChange = {handleInputChange}
                        placeholder="Schedule name"
                    />

                    <button className='btn' onClick={handleOnSubmit} style={{marginBottom: "0.8rem"}}> Submit </button>

                    <div style={{position: 'relative'}}> 
                        {messageContent}
                    </div>

                    {message.status === "succeeded" &&
                    <Confetti
                        width={240}
                        height={160}
                        recycle={false}
                        numberOfPieces={200}
                        tweenDuration={10000}
                        onConfettiComplete={handleOnConfettiComplete}
                    />}
                </div>
            </ReactTooltip>
        </div>
    )
}

export default ButtonSaveLoad;