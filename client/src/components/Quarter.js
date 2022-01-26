import 'bootstrap/dist/css/bootstrap.min.css';
import {memo} from 'react';
import { useDrop } from 'react-dnd';
import CourseCard from './CourseCard';
import ItemTypes from '../assets/ItemTypes';

function Quarter({courses, quarter, onDrop, removeCourse}) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes,
    drop: (item, monitor) => onDrop(item, quarter),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })); 

  console.log(quarter);
  return (
    <div 
    ref={dropRef}
    style={{
      height:'172px',
      backgroundColor: isOver?"#90CAF9":"#FCFDFE",}}
    > 
      {courses.map((course, index) => 
        <CourseCard 
        className= {index>=1? "mt-1" :""} 
        key={course.id}
        item={course} 
        quarter={quarter}
        isDraggable={true} 
        removeCourse={removeCourse}
        buttonClass="full-button"
        > 
        </CourseCard> )}
    </div>
  );
}

const equalFn = function(prevQuarter, nextQuarter) {
  if(prevQuarter.courses.length !== nextQuarter.courses.length)
    return false;
  for(let i = 0; i < prevQuarter.courses.lenngth; i++){
    console.log(prevQuarter.courses[i] !== nextQuarter.courses[i])
    if(prevQuarter.courses[i] !== nextQuarter.courses[i])
      return false;
  }

  return true;
}

export default memo(Quarter, equalFn);