import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import CourseCard from './CourseCard'
import { useDrop } from 'react-dnd';
import ItemTypes from '../assets/ItemTypes';
import './style.css'

function MajorCourses ({courses, requirement, onDrop, removeCourse}) {
    let index = 0;
    console.log("requirement");
    const [, dropRef] = useDrop(() => ({
        accept: ItemTypes,
        drop: (item, monitor) => onDrop(item, 0),
      })); 

    function renderCol(){  
        let columns = []
        index++
        while(index < requirement.length && requirement[index][1] === "True"){
            let courseId =  requirement[index][0]
            
            if(courses[courseId] !== undefined){ 
                columns.push(<Col className="mt-2" key={courseId}>
                                <CourseCard 
                                  item={courses[courseId]}
                                  isDraggable= {courses[courseId].quarter === 0}
                                  removeCourse = {removeCourse}
                                  //buttonClass="edit-button" 
                                />     
                            </Col>)
            }
            else
                columns.push(<Col className="mt-2" key = {courseId}>{courseId}</Col>)
            index++
        }
        return columns
    }

    function renderRequirements(){        
        var rows = [];

        rows.push(<h5 key="header">Required Courses:</h5>)
        for(index; index < requirement.length; index++){
            let i = index 
            if(requirement[index][1] === "False"){
                rows.push(<div key = {requirement[i][0] + i}> 
                                <h6>{requirement[i][0]}</h6> 
                                <Row xs={3} md={4} className="mt-2"> {renderCol()}</Row>
                          </div>)
                index--;
            }
        }
        return rows
    }
    
    return (
        <div className="requirement mt-4" ref = {dropRef} >
            {renderRequirements()}
        </div>
    )
}

export default MajorCourses