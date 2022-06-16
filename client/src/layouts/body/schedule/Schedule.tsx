import { useSelector } from 'react-redux';
import {RootState} from '../../../app/store';

import YearAccordion from '../../../components/accordion/Year';

import TotalUnits from './TotalUnits';
import RefreshButton from './ButtonRefresh';
import AddYearButton from './ButtonAddYear';

import './Schedule.css';

const Schedule = () => {
    const yearIds = useSelector((state: RootState) => state.store.years.allIds);
    const YEAR_NAMES = ["1st","2nd","3rd","4th", "5th", "6th", "7th", "8th", "9th"];

    return (
      <div id="schedule">
        {yearIds.map( (id,index) => (
          <YearAccordion key={id} 
            id={id}
            name={YEAR_NAMES[index] + " Year"} 
            index={index} 
          />
        ))}

        <div id='function-row'>

          <div id="refresh-btn">
            <RefreshButton/>
          </div>
          
          <div id="add-year-btn" >
            <AddYearButton/>
          </div>
          
          <div id="total-units">
            <TotalUnits/>
          </div>
      
        </div>
        
      </div>
    )
}

export default Schedule;