import { useState, ChangeEvent, MouseEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedule } from '../../api/FetchData';
import { RootState } from '../../app/store';
import { resetStatus } from '../../features/StoreSlice';
import Confetti from 'react-confetti';
import Message from '../message/Message';
import './PopperSaveLoad.css';

function PopperLoad () {
    const [name, setName] = useState("");
    const [message, setMessage] = useState({status: "idle", content: ""});
    const loadStatus = useSelector((state: RootState) => state.store.status);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const dispatch = useDispatch();

    

    const handleOnConfettiComplete = () => {
        dispatch(resetStatus());
    }
        
    return (
    <>
        <div className="popper-card-before"/>

        <div className="flex-container flexColumn popup">

            {message.status !== "idle"  && <Message status={message.status} content={message.content}/>}
            
            
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