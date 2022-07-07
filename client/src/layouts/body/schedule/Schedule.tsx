import { useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import {RootState} from '../../../app/store';
import Year from '../../../components/accordion/Year';
import ButtonAddYear from '../../../components/button/ButtonAddYear';
import ButtonClear from '../../../components/button/ButtonClear';
import ButtonLoad from '../../../components/button/ButtonLoad';
import ButtonSave from '../../../components/button/ButtonSave';
import TotalUnits from './TotalUnits';
import PrintPrograms from './PrintPrograms';
import './Schedule.css';

const Schedule = () => {
    const yearIds = useSelector((state: RootState) => state.store.years.allIds);
    const YEAR_NAMES = ["1st","2nd","3rd","4th", "5th", "6th", "7th", "8th", "9th"];
    const printRef = useRef(null);

    return (
      <div id="left-side">
        <ul style={{justifyContent: 'space-between', margin: '1rem 0.5rem 1rem 1rem'}}>
          <li id="total-units"> <TotalUnits/> </li>
          <li>
            <ul>
              <li style={{marginRight: '1rem'}}> <ButtonSave/> </li>
              <li style={{marginRight: '1rem'}}> <ButtonLoad/> </li>
              <li> <ReactToPrint 
                    trigger={() => <button className="btn">Print</button>}
                    content={() => printRef.current}
                   />
              </li>
            </ul>
          </li>
        </ul>

        <div id="schedule" ref={printRef}>
          <PrintPrograms/>
          <div style={{display: 'none'}} className="printUnit"> <TotalUnits/> </div>
          {yearIds.map( (id,index) => (
            <Year key={id} 
              id={id}
              name={YEAR_NAMES[index] + " Year"} 
              index={index} 
            />
          ))}  
        </div> 

        <ul style={{justifyContent:'end', marginRight:'0.5rem'}}>
          <li style={{marginRight: '1rem'}}> <ButtonAddYear/> </li>  
          <li> <ButtonClear/> </li>    
        </ul>     
      </div>
    )
}

export default Schedule;