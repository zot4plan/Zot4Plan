import CourseCard from "./CourseCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import ItemTypes from '../assets/ItemTypes';

function Courses({courses, onDrop}) {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: ItemTypes,
        drop: (item, monitor) => onDrop(item.item, 0),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        }),
      })); 

    return (
        <div ref={dropRef}
            style={{backgroundColor:'grey', minHeight:100}}>
        <Container className='mt-4 mh-200' variant="light">
            <Row md={3} xs={2}>
                {courses.map((course)=> 
                <Col key={course.id} className='mt-2 mb-2'>
                    <CourseCard 
                        key={course.id}
                        item={course}
                        index={course.id} > 
                    </CourseCard>
                </Col>
                )}
            </Row>
        </Container>
        </div>
    );
}

  
export default Courses;