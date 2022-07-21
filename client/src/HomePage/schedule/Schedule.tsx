import { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import {RootState} from '../../app/store';
import Year from '../../components/accordion/Year';
import ButtonAddYear from '../../components/button/ButtonAddYear';
import ButtonClear from '../../components/button/ButtonClear';
import ButtonSaveLoad from '../../components/button/ButtonSaveLoad';
import TotalUnits from './TotalUnits';
import PrintPrograms from './PrintPrograms';
import Chalkboard from '../../assets/images/chalkboard.png';
import './Schedule.css';

function Schedule() {
    const yearIds = useSelector((state: RootState) => (state.store.years.allIds), shallowEqual);
    const YEAR_NAMES = ["1st","2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
    const printRef = useRef(null);

    return (
        <div id="left-side">
            <ul style={{justifyContent: 'space-between', margin: '1rem 0.5rem 1rem 1rem'}}>
                <li > 
                    <ul style={{justifyContent: 'end'}}>
                        <li className="margin-right-1"> <ButtonAddYear/> </li>  
                        <li className="margin-right-1"> <ButtonClear/> </li>    
                    </ul>     
                </li>
                <li>
                    <ul>
                        <li className="margin-right-1"> <ButtonSaveLoad/> </li>
                        <li> 
                            <ReactToPrint 
                            trigger={() => <button className="btn">Print</button>}
                            content={() => printRef.current}/>
                        </li>
                    </ul>
                </li>
            </ul>

            <div id="schedule" ref={printRef}>
                <div className="print">
                    <PrintPrograms/>
                    <div className="printUnit"> <TotalUnits/> </div>
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
                    <div className='unit-text'> <TotalUnits/> </div>
                </div>
            </div>   
        </div>
    )
}

export default Schedule;