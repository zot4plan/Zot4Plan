import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import CourseCard from './CourseCard';
import { useDrop } from 'react-dnd';
import ItemTypes from '../assets/ItemTypes';
import './style.css'

function AdditionalCourses ({courses, onDrop, removeCourse, addCourses}) {
   console.log("additional");
    const [, dropRef] = useDrop(() => ({
        accept: ItemTypes,
        drop: (item, ) => onDrop(item, 0),
      })); 
    
    return (
        <div className="requirement mt-4" ref = {dropRef} >
           <h5>Additional Courses:</h5> 
                <Row xs={3} md={4} className="mt-2"> {addCourses.map(course => (<Col className="mt-2" key = {course}>
                    <CourseCard 
                        item={courses[course]}
                        isDraggable= {courses[course].quarter === 0}
                        removeCourse = {removeCourse}
                        //buttonClass="edit-button" 
                        /> 
                    </Col>))
                }</Row>
        </div>
    )
}

export default AdditionalCourses