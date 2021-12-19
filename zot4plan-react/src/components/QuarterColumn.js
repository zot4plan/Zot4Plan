import 'bootstrap/dist/css/bootstrap.min.css';
import { useDrop } from 'react-dnd';
import CourseCard from './CourseCard';
import ItemTypes from '../Assets/ItemTypes';
import { useState } from 'react';

function QuarterColumn() {
  const [courses, setCourses] = useState([]); 

  const onDrop = (item) => {
    if (!courses.find((course) => {return item.item.id === course.id})){
      courses.push(item.item);
      setCourses(courses);
    }
    item.item.taken = true;
    console.log(courses)
  }

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes,
    drop: (item, monitor) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })); 

  return (
    <div 
    ref={dropRef}
    style={{height:'200px',backgroundColor: isOver?"#90CAF9":"#BBDEFB",}}> 
      {courses.map((course) => 
        <CourseCard 
        key={course.id}
        item={course}
        index={course.id}
        > 
        </CourseCard> )}
    </div>
  );
}

export default QuarterColumn;