import 'bootstrap/dist/css/bootstrap.min.css';
import QuarterColumn from '../components/QuarterColumn';
import Schedules from '../components/Schedules';
import Inputs from '../components/Inputs';
import Requiremnets from '../components/Requirements';
import { Container, Row, Col } from 'react-bootstrap';
import {useCallback, useState} from 'react';

function HomePage({initialCourses}) {

  const [courses, setCourses] = useState(initialCourses); 
  const years = ['Freshman','Sophomore','Junior','Senior'];
  const quarters = ['Fall','Winter','Spring'];

  const moveCourse = ((item, quarter) => {
    console.log('course', item.quarter);
    console.log('quarter', quarter);
  
    //return drag and drop are the same
    if( item.quarter === quarter) 
        return;

    item.quarter = quarter
    setCourses({...courses,[item.id]: item});

  })

  return (
    <div>
      <Container fluid='md'> 
        <Row>
          <Col sm={6}> 
            <Schedules courses={courses} moveCourse={moveCourse}> </Schedules>
          </Col>

          <Col sm={6}> 
            <div> <Inputs/></div>

            <div style={{backgroundColor:'#E2E8E4', minHeight:100,minWidth: 500}}
                className= 'mt-4'> Required courses:
                <Requiremnets courses={courses}/>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
