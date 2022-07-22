import { useState, ChangeEvent, MouseEvent} from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { fetchSchedule } from '../../api/FetchData';
import { RootState } from '../../app/store';
import Axios from '../../api/Axios';
import Confetti from 'react-confetti';
import Message from '../message/Message';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import './ButtonSaveLoad.css';

const maxLength = 32;
const minLength = 8;
const scheduleNameNote = "Other users might be able to access and modify your schedule if the same name is used"
                        + ", so please try to use a unique name.";
const minLengthMessage = "Must contain at least " + minLength + " characters!";
const spaceMessage = "Cannot contain white spaces!";

interface SaveLoadType {
    anchorEl: HTMLElement | null;
    id: string | null;
    message: string;
    status: string;
}

function ButtonSaveLoad () {
    const [name, setName] = useState("");
    const status = useSelector((state: RootState) => state.store.status);
    const [element, setElement] = useState<SaveLoadType>({anchorEl: null, id: null, message: "", status: 'idle'});
  
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        const id = event.currentTarget.getAttribute("data-value");
        if(element.id === id)
            setElement({anchorEl: null, id: null, message: "", status: 'idle'})
        else 
            setElement({anchorEl: event.currentTarget, id: id, message: "", status: 'idle'});
    };  

    const open = Boolean(element.anchorEl);
    const popperId = open ? "save_load" : undefined;

    const handleClickAway = () => {
        setElement({anchorEl: null, id: element.id, message: "", status: "idle"});
    };  

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const dispatch = useDispatch();
    const store = useStore();

    const handleOnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        setTimeout(() => {
            if(name.length < minLength)
                setElement(prevState => ({...prevState, status:"failed", message: minLengthMessage}));

            else if (/\s/g.test(name)) 
                setElement(prevState=> ({...prevState, status:"failed", message: spaceMessage}));

            else if(element.id === "save") { // save 
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
                        setElement(prevState => ({...prevState, status: "succeeded", message: "Saved successfully!"}))
                    }).catch(() => {
                        setElement(prevState => ({...prevState, status: "failed", message: "Failed to save schedule"}))
                    })
                }
                else
                    setElement(prevState => ({...prevState, status: "failed", message: "Please add courses before saving!!!"}))
            }
            else { // load
                dispatch(fetchSchedule(name));
                setElement(prevState => ({...prevState, status: "idle", message: ""}))
            }
        }, 500);
    }

    const handleOnConfettiComplete = () => {
        setElement(prevState => ({...prevState, status: "idle", message: ""}))
    }

    let messageContent;

    if(status !== "idle" && element.id === "load")
        messageContent = <Message status={status} content={(status === "succeeded")? "Loaded successfully!" : "Schedule not found!"}/>

    else if(element.status !== "idle" ) 
        messageContent = <Message status={element.status} content={element.message}/>
        
    return (
        <>
            <div className="relative flex-container">    
                <button className='btn margin-right-1' 
                    data-value="save"
                    aria-label="Save Schedule"
                    onClick={handleClick}> Save </button> 

                <button className='btn' 
                    data-value="load"
                    aria-label='Load Schedule'
                    onClick={handleClick}> Load </button>
            </div>
            <ClickAwayListener 
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAway}
            >
                <PopperUnstyled id={popperId} open={open} anchorEl={element.anchorEl} role="presentation">
                    <div className="flex-container flexColumn popup">
                        {element.id === "save" && <p> {scheduleNameNote} </p>}

                        <input type="text"
                            id="scheduleName"
                            name="scheduleName"
                            maxLength={maxLength}
                            value = {name}
                            className = "schedule-name-input"
                            onChange = {handleInputChange}
                            placeholder="Schedule name"
                        />

                        <button className='btn' onClick={handleOnSubmit}> Submit </button>

                        <div style={{position: 'relative'}}> 
                            {messageContent}
                        </div>

                        {element.status === "succeeded" &&
                            <Confetti
                                width={240}
                                height={160}
                                recycle={false}
                                numberOfPieces={200}
                                tweenDuration={10000}
                                onConfettiComplete={handleOnConfettiComplete}
                            />}
                    </div>
                </PopperUnstyled>
            </ClickAwayListener>
        </>
    )
}

export default ButtonSaveLoad;