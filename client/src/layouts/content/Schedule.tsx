import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';

import YearAccordion from '../../components/accordion/YearAccordion';

import TotalUnits from '../../components/info/TotalUnits';
import RefreshButton from '../../components/button/RefreshButton';
import AddYearButton from '../../components/button/AddYearButton';

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

        <div id='schedule-function-row'>
          <RefreshButton/>
          <AddYearButton/>
          <TotalUnits/>
        </div>
        
      </div>
    )
}

export default Schedule;