import { useState, ChangeEvent, MouseEvent} from 'react';
import { useStore } from 'react-redux';
import { RootState } from '../../store/store';
import { addOrEditSchedule } from '../../controllers/HomeController';
import Confetti from 'react-confetti';
import Message from '../message/Message';
import './PopperSaveLoad.css';

const maxLength = 32;
const minLength = 8;
const scheduleNameNote = "Other users might be able to access and modify your schedule if the same name is used"
                        + ", so please try to use a unique name.";
const minLengthMessage = "Must contain at least " + minLength + " characters!";
const spaceMessage = "Cannot contain white spaces!";
const noCourses= "Please add courses before saving!!!";

function PopperSave () {
    const [name, setName] = useState("");
    const [message, setMessage] = useState({status: "idle", content: ""});
    const store = useStore();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleOnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (/\s/g.test(name)) 
            setMessage({ status:"failed", content: spaceMessage});

        else if(name.length < minLength)
            setMessage({ status:"failed", content: minLengthMessage});

        else   
            setTimeout(() => {
                const state:RootState = store.getState()

                if(state.course.totalUnits > 0) {
                    const years = state.course.years.allIds.map(id => 
                        state.course.years.byIds[id].map(id => 
                            state.course.sections[id]
                    ));
                    const schedule = {
                        selectedPrograms: state.programs.selectedPrograms,
                        addedCourses: state.programs.sections[state.programs.addedCourses],
                        years: years as string[][][],
                    };

                    addOrEditSchedule(name, schedule, setMessage);
                }
                else
                    setMessage({status: "failed", content: noCourses});
            }, 500);
    }

    const handleOnConfettiComplete = () => {
        setMessage({status: "idle", content: ""});
    }

    return (
    <>
        <div className="popper-card-before"/>

        <div className="flex-container flexColumn popup">
            <p style={{padding:'0.2rem 0.5rem', textAlign:'center', fontSize:'1.5rem'}}> {scheduleNameNote} </p>

            <input type="text"
                id="saveName"
                name="saveName"
                maxLength={maxLength}
                value = {name}
                className = "schedule-name-input"
                onChange = {handleInputChange}
                placeholder="Enter schedule name"
            />

            <button className='btn' style={{margin: '0.6rem 0rem'}}
                    onClick={handleOnSubmit}> Submit </button>

            {message.status !== "idle" && <Message status={message.status} content={message.content}/>}

            {message.status === "succeeded" &&
                <Confetti
                    width={240}
                    height={240}
                    recycle={false}
                    numberOfPieces={200}
                    tweenDuration={3000}
                    onConfettiComplete={handleOnConfettiComplete}
                />}
        </div>    
    </>   
    )
}

export default PopperSave;