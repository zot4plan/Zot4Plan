import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import CourseCard from './CourseCard'
import { useDrop } from 'react-dnd';
import ItemTypes from '../assets/ItemTypes';
import './style.css'

function GeneralEducations ({courses, onDrop, removeCourse}) {
    console.log("GE");
    const [, dropRef] = useDrop(() => ({
        accept: ItemTypes,
        drop: (item, ) => onDrop(item, 0),
      })); 
    
    return (
        <div className="requirement mt-4" ref = {dropRef} >
           <h5>General Educations</h5> 
                
        </div>
    )
}

export default GeneralEducations