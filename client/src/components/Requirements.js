import 'bootstrap/dist/css/bootstrap.min.css';
import required_ics from '../assets/icsrequirements';
import {Row, Col} from 'react-bootstrap';
import CourseCard from './CourseCard'
import { Popover,OverlayTrigger,Button } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import ItemTypes from '../assets/ItemTypes';


const Requirements = ({courses, onDrop}) => {
    let courseArray = required_ics
    let index = 0
    
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: ItemTypes,
        drop: (item, monitor) => onDrop(item.item, 0),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        }),
      })); 

    function renderCol(){  
        let columns = []
        index++
        while(index < courseArray.length && courseArray[index][1]){
            let courseId =  courseArray[index][0]
            
            if(courses[courseId] != undefined){
                if(courses[courseId].quarter !== 0){
                    columns.push(<Col className="mt-2" key = {courseId}>
                        <div style={{width: 100}}>
                        <OverlayTrigger
                            trigger="click"
                            placement='bottom'
                            overlay={
                            <Popover id={courses[courseId].id}>
                                <Popover.Header as="h4">{courseId}</Popover.Header>
                                <Popover.Body> {courses[courseId].description} </Popover.Body>
                                <Popover.Body> {courses[courseId].prereqString} </Popover.Body>
                                <Popover.Body> {courses[courseId].restriction} </Popover.Body>
                            </Popover>
                            }
                            >
                            <Button variant="outline-secondary" size ='sm'>{courseId}</Button>
                        </OverlayTrigger>
                        </div>
                        </Col>)
                }else{

                columns.push(<Col className="mt-2" key = {courseId}>
                    <CourseCard 
                        item={courses[courseId]}
                        index={courseId}
                        buttonClass="edit-button" > 
                    </CourseCard>
                    </Col>)
                }
            }
            else
                columns.push(<Col className="mt-2" key = {courseId}>{courseId}</Col>)
            index++

        }
        return columns
    }

    function renderRequirements(){        
        var rows = []
       // console.log(courses)
        for(index; index < courseArray.length; index++){
            let i = index 
            if(!courseArray[index][1]){
                rows.push(<div key = {courseArray[i][0] + i}> 
                                <h6>{courseArray[i][0]}</h6> 
                                <Row xs={3} md={4} className="mt-2"> {renderCol()}</Row>
                          </div>)
                index--
            }
        }
        return rows
    }
    return (
        <div ref = {dropRef} >
            {renderRequirements()}
        </div>
    )
}

export default Requirements