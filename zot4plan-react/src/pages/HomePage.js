import 'bootstrap/dist/css/bootstrap.min.css';
import Courses from '../components/Courses';
import QuarterColumn from '../components/QuarterColumn';
import Inputs from '../components/Inputs';
import Requiremnets from '../components/Requirements';
import { Container, Row, Col } from 'react-bootstrap';
import {data} from '../assets/data';
import {useCallback, useState} from 'react';

function HomePage() {
  //const [layout, setLayout] = useState([]);
  const [courses, setCourses] = useState(data); 
  const years = ['Freshman','Sophomore','Junior','Senior'];
  const quarters = ['Fall','Winter','Spring'];

  const moveCourse = ((item, quarter) => {
    console.log('course', item.quarter);
    console.log('quarter', quarter);

    //return drag and drop are the same
    if( item.quarter === quarter) 
        return;

    let copy = [...courses];
    let index = copy.findIndex((course) => course.id === item.id)
    copy[index].quarter = quarter;
    setCourses(copy);
  })

  return (
    <div>
      <Container fluid='md'> 
        <Row>
          <Col sm={6}> 
            {years.map((year, indexYear)=>(
              <Row key={year} className='mt-4 square border border-3 border-end-0'>
                <h3 key={year} 
                  style={{backgroundColor:'#82B1FF',}}
                  className="p-1 mb-0 square border-bottom border-end border-3"> {year} 
                </h3>

                {quarters.map((quarter, indexQuarter) => {
                  const currentQuarter = indexYear*3 + indexQuarter + 1;

                  return (
                    <Col key={quarter} className='p-0 square border-end border-3'>
                      <h5 
                      style={{backgroundColor:'#64B5F6', marginBottom:'0px',}} 
                      className="square border-bottom border-3 p-1"> {quarter}
                      </h5>

                      <QuarterColumn 
                        courses={courses.filter((course => course.quarter === currentQuarter))} 
                        onDrop={moveCourse} 
                        quarter={currentQuarter}>
                      </QuarterColumn>
                    </Col>
                  )
                })}
              </Row>
            ))}
          </Col>

                <Col sm={6}> 
                  <div> <Inputs/></div>
                  <Courses 
                  courses= {courses.filter((course => course.quarter === 0))}
                  onDrop={moveCourse}/> 
                  <div style={{backgroundColor:'paleturquoise', minHeight:100}}
                      className= 'mt-4'> Required courses:
                      <Requiremnets />
                      </div>

                </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
