import { useState, ChangeEvent, MouseEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedule } from '../../api/FetchData';
import { RootState } from '../../app/store';
import { resetStatus } from '../../features/StoreSlice';
import Confetti from 'react-confetti';
import Message from '../message/Message';
import './PopperSaveLoad.css';

const maxLength = 32;
const minLength = 8;
const minLengthMessage = "Must contain at least " + minLength + " characters!";
const spaceMessage = "Cannot contain white spaces!";
const succeeded = "Loaded successfully!";
const failed = "Schedule not found!";

function PopperLoad () {
    const [name, setName] = useState("");
    const [message, setMessage] = useState({status: "idle", content: ""});
    const loadStatus = useSelector((state: RootState) => state.store.status);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const dispatch = useDispatch();

    const handleOnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (/\s/g.test(name)) 
            setMessage({ status:"failed", content: spaceMessage});

        else if(name.length < minLength)
            setMessage({ status:"failed", content: minLengthMessage});

        else {
            dispatch(fetchSchedule(name));
            setMessage({status: "idle", content: ""});
        }
    }

    const handleOnConfettiComplete = () => {
        dispatch(resetStatus());
    }
        
    return (
    <>
        <div className="popper-card-before"/>

        <div className="flex-container flexColumn popup">
            <input type="text"
                id="loadName"
                name="loadName"
                maxLength={maxLength}
                value={name}
                className="schedule-name-input"
                onChange={handleInputChange}
                placeholder="Schedule name"
            />

            <button className='btn' style={{margin: '1rem 0rem'}}
                    onClick={handleOnSubmit}> Submit </button>

            {message.status !== "idle"  && <Message status={message.status} content={message.content}/>}
            
            {loadStatus !== "idle" && 
                <Message status={loadStatus} content={(loadStatus === "succeeded")? succeeded : failed}/>}

            {loadStatus === "succeeded" &&
                <Confetti
                    width={240}
                    height={160}
                    recycle={false}
                    numberOfPieces={200}
                    tweenDuration={10000}
                    onConfettiComplete={handleOnConfettiComplete}
                />}
        </div>  
    </>     
    )
}

export default PopperLoad;