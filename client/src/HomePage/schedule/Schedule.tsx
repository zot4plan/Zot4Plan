import { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {RootState} from '../../app/store';
import ButtonsList from './ButtonsList';
import Year from '../../components/accordion/Year';
import TotalUnits from './TotalUnits';
import PrintPrograms from './PrintPrograms';
import Chalkboard from '../../assets/images/chalkboard.png';
import './Schedule.css';

function Schedule() {
    const yearIds = useSelector((state: RootState) => (state.store.years.allIds), shallowEqual);
    const YEAR_NAMES = ["1st","2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
    const printRef = useRef(null);

    const printContent = () => printRef.current;

    return (
        <div id="left-side">
            <ButtonsList printContent={printContent}/>

            <div id="schedule" ref={printRef}>
                <div className="print">
                    <PrintPrograms/>
                    <div className="printUnit"> 
                        <p> Total Units:</p>
                        <TotalUnits/> 
                    </div>
                </div>

                {yearIds.map((id,index) => 
                    <Year key={id} 
                        id={id}
                        name={YEAR_NAMES[index] + " Year"} 
                        index={index} 
                    />
                )}

                <div style={{position: 'relative'}}>
                    <img id='chalkboard' src={Chalkboard} alt="Chalkboard that displays unit count" />
                    <div className='unit-text'> 
                        <p> Total Units:</p>
                        <TotalUnits/> 
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default Schedule;