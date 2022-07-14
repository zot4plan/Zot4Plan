import {useState, memo, MouseEvent} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import ReactTooltip from "react-tooltip";

import CourseCard from './CourseCard'
import Error from '../icon/Error';

interface CourseButtonType {
    id: string;
    sectionId: string;
    showUnit: boolean;
    isCrossed: boolean;
    isWarning: boolean;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');

    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function CourseButton({id, sectionId, showUnit, isCrossed, isWarning}: CourseButtonType) {
    //const [show, setShow] = useState(false);
    const units = useSelector((state: RootState) => state.store.courses[id] === undefined? 0 : state.store.courses[id].data.units);
    let colors = useSelector((state: RootState) => state.store.depts.byIds[removeLastWord(id)]);

    if(colors === undefined)
        colors = ['#AFD3E9', '#70ADD7', '#3688BF'];

    let warningSpan;
    let color = colors[2];
    let textColor = 'white';

    if (isWarning) {
        warningSpan = 
            <span className='course-warning' data-tip data-for='prereqTip' > <Error/>
                <ReactTooltip id="prereqTip" place="top" effect="solid">
                    Missing prerequisites
                </ReactTooltip>
            </span>
                                   
    } else if (isCrossed) {
        color = '#D3D3D3'
        textColor = 'black'
    }
    
    /*function handleOnClick( e: MouseEvent<HTMLDivElement> ) {
        e.stopPropagation();
        e.preventDefault();
       // setShow(!show)
       console.log(id)
    }*/

    return ( 
        <div className="course-btn"
            //onClick={handleOnClick} 
            style={{backgroundColor: color}}
            data-tip={id} data-for={sectionId}
        >
            <p className='course-id' 
              style={{textDecoration: isCrossed? "line-through":"none", color: textColor}}
            > 
                {id}
            </p>
            {isWarning && warningSpan}
            {showUnit && !isWarning && <p className='unit'>{units + ' units'}</p>}
        </div>
        
        /*show && <CourseCard id={id} isShow={show} color={colors[1]} boxShadowColor={colors[0]} closeCard={handleOnClick}/> */
    )
}

export default memo(CourseButton)