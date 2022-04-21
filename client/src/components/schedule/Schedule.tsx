import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';

import Year from '../accordion/YearAccordion';

import TotalUnits from '../info/TotalUnits';
import RefreshButton from '../button/RefreshButton';
import AddYearButton from '../button/AddYearButton';

const Schedule = () => {
    const yearIds = useSelector((state: RootState) => state.store.years.allIds);

    return (
      <div id="schedule" className="flex">
        {yearIds.map( (id,index) => (
          <Year key={id} yearId= {id} index={index} isLast={index === yearIds.length - 1}/>
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