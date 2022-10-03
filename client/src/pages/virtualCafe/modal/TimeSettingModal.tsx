import { useState, ChangeEvent, FormEvent } from "react"
import Xmark from "../../../components/icon/Xmark"

interface TimeSettingProps {
    toggleTimeSetting: () => void;
    setTime: (studyTime: number, breakTime: number) => void;
}

function TimeSettingModal({ toggleTimeSetting, setTime }:TimeSettingProps) {
    const [studyTime, setStudyTime] = useState(0)
    const [breakTime, setBreakTime] = useState(0) 

    const handleOnChangeStudy = (event: ChangeEvent<HTMLInputElement>) => {
        if(typeof(event.target.value) === 'number')
            setStudyTime(event.target.value);
    }

    const handleOnChangeBreak = (event: ChangeEvent<HTMLInputElement>) => {
        if(typeof(event.target.value) === 'number')
            setBreakTime(event.target.value);
    }

    const setTimer = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setTime(studyTime, breakTime);
        setStudyTime(0);
        setBreakTime(0);
    }
  return (
    <div className="modal">
        <div className="modal-content">
            <form onSubmit={setTimer}>
                <div className="modal-top">
                    <button onClick={toggleTimeSetting}>
                        <Xmark/>
                    </button>
                    <h2>Timer Setting</h2>
                </div>
                <div style={{padding:"1rem"}}>
                    <label htmlFor="study"> Work Time (Minutes) </label> 
                    <br/>
                    <input 
                        type="number" 
                        id="study" 
                        name="study" 
                        required 
                        onChange={handleOnChangeStudy}
                    />
                </div>
                <div style={{paddingBottom:"1rem"}}>
                    <label style={{paddingBottom:"0.2rem"}} htmlFor="break"> Break Time (Minutes) </label> 
                    <br/>
                    <input 
                        type="number" 
                        id="break" 
                        name="break" 
                        required 
                        onChange={handleOnChangeBreak}
                    />
                </div>
                <div>
                    <input type="submit" value="Save"/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TimeSettingModal