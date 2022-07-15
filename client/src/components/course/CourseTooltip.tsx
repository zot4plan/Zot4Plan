import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { RootState } from '../../app/store';
import ReactTooltip from "react-tooltip";

import './Course.css';
import CourseCard from './CourseCard';

interface CourseTooltipType {
    id: string;
}
function CourseTooltip({id}: CourseTooltipType) {
    const color = useSelector((state:RootState) => {
        let dept = state.store.courses[id].data.department
        return state.store.depts.byIds[dept];
    })

    return (  
        <ReactTooltip 
            id={id}
            place="bottom" 
            effect="solid" 
            type="light"
            arrowColor={color[1]}
            event='click' globalEventOff='dblclick' clickable={true} isCapture={true}
            className="course-tooltip"
        >
            <CourseCard id={id} /> 
        </ReactTooltip>
    )
}

export default memo(CourseTooltip)