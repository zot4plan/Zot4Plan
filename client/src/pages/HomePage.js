import 'bootstrap/dist/css/bootstrap.min.css';
import QuarterColumn from '../components/QuarterColumn';
import Schedules from '../components/Schedules';
import Inputs from '../components/Inputs';
import Requiremnets from '../components/Requirements';
import { Container, Row, Col } from 'react-bootstrap';
import {useCallback, useState} from 'react';
import required_ics from '../assets/icsrequirements';
import {data} from '../assets/data';

function HomePage() {
  
  let nameString = 'MajorNames.json';
  let majorNames = require('../assets/' + nameString);
  console.log(majorNames);

  let courseArray = required_ics
  let initialCourses = {}

  courseArray.map((item) => {
    if(item[1] && data.hasOwnProperty([item[0]])) 
        initialCourses[item[0]] = data[item[0]];
  })


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

            <div style={{backgroundColor:'#E2E8E4', minHeight:100, minWidth: 500}}
                className= 'mt-4'> Required courses:
                <Requiremnets onDrop={moveCourse} courses={courses}/>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
