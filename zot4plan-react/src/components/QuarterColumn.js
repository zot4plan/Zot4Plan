import 'bootstrap/dist/css/bootstrap.min.css';
import { useDrop } from 'react-dnd';
import CourseCard from './CourseCard';
import ItemTypes from '../assets/ItemTypes';

function QuarterColumn({courses, quarter, onDrop}) {

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes,
    drop: (item, monitor) => onDrop(item.item, quarter),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })); 

  console.log(courses)

  return (
    <div 
    ref={dropRef}
    style={{
      height:'172px',
      backgroundColor: isOver?"#90CAF9":"#FCFDFE",}}
    > 
      {courses.map((course) => 
        <CourseCard 
        key={course.id}
        item={course}
        index={course.id}
        buttonClass="full-button"
        > 
        </CourseCard> )}
    </div>
  );
}

export default QuarterColumn;