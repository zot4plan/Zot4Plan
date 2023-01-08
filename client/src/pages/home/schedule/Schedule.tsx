import { forwardRef, Ref } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {RootState} from '../../../store/store';
import Year from '../../../components/accordion/Year';
import TotalUnits from './TotalUnits';
import PrintPrograms from './PrintPrograms';
import Chalkboard from '../../../assets/images/chalkboard.png';
// import Bells from '../../../components/theme/christmas/Bells';
import './Schedule.css';

const YEAR_NAMES = ["1st","2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

const Schedule = forwardRef((_, ref: Ref<HTMLDivElement>) => {
    const yearIds = useSelector((state: RootState) => (state.course.years.allIds), shallowEqual);
    return (
        <div id="left-side">
            <div id="schedule" ref={ref}>
                <PrintPrograms/>
                {yearIds.map((id, index) => 
                    <Year key={id} 
                        id={id}
                        name={YEAR_NAMES[index] + " Year"} 
                        index={index} 
                    />
                )}
                <div style={{position: 'relative'}}>
                    <img 
                        id='chalkboard' 
                        src={Chalkboard} 
                        alt="Chalkboard that displays unit count" 
                    />
                    <TotalUnits className='unit-text'/>   
                    {/* <Bells className='bells'/>  */}
                </div>       
                <TotalUnits className='print-units'/>            
            </div>   
        </div>
    )
});

export default Schedule;