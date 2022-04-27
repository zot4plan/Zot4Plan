import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';

import Year from '../../components/accordion/YearAccordion';

import TotalUnits from '../../components/info/TotalUnits';
import RefreshButton from '../../components/button/RefreshButton';
import AddYearButton from '../../components/button/AddYearButton';

const Schedule = () => {
    const yearIds = useSelector((state: RootState) => state.store.years.allIds);
    const YEAR_NAMES = ["1st Year"," 2nd Year","3rd Year","4th Year", "5th Year", "6th Year", "7th Year", "8th Year", "9th Year"];

    return (
      <div id="schedule">
        {yearIds.map( (id,index) => (
          <Year key={id} 
            yearId={id}
            yearName={YEAR_NAMES[index]} 
            index={index} 
            isLast={index === yearIds.length - 1}/>
        ))}

        <div className='relative flex item-center justify-between' 
          style={{marginTop: '2rem'}}
        >
          <RefreshButton/>
          <AddYearButton/>
          <TotalUnits/>
        </div>
      </div>
    )
}

export default Schedule;