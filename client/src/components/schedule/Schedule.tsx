import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store';
import { addYear, refreshState } from '../../features/StoreSlice';

import Year from './Year';
import TotalUnits from './TotalUnits';
import OutlineAdd from '../icons/OutlineAdd';
import Refresh from '../icons/Refresh';

import ReactTooltip from "react-tooltip";

const Schedule = () => {
    const yearIds = useSelector((state: RootState) => state.store.years.allIds);
    const dispatch = useDispatch();
  
    const addNewYear = ( e: { preventDefault: () => void; }) => {
      e.preventDefault();
      dispatch(addYear());
    }

    const refresh = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      dispatch(refreshState());
    }
    return (
      <div id="schedule" className="flex">
        {yearIds.map( (id,index) => (
          <Year key={id} yearId= {id} index={index} />
        ))}

        <div className='relative flex item-center justify-between'>
          <button className="outline-btn" 
            onClick={refresh}
            data-tip data-for='refreshTip'
          > 
            <Refresh/> 
          </button>
          <ReactTooltip id="refreshTip" place="left" effect="solid">
            Remove all courses
          </ReactTooltip>

          <button id="outline-add-btn" 
            className="outline-btn absolute" 
            onClick={addNewYear}
            data-tip data-for='addYearTip'
          > 
            <OutlineAdd/> 
          </button>
          <ReactTooltip id="addYearTip" place="top" effect="solid">
            Add year
          </ReactTooltip>

          <TotalUnits/>
        </div>
      </div>
    )
}

export default Schedule;