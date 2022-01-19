import 'bootstrap/dist/css/bootstrap.min.css';
import Schedules from '../components/Schedules';
import Requiremnets from '../components/Requirements';
import AddCourse from '../components/AddCourse';
import { Container, Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';
import {useCallback, useState} from 'react';
import required_ics from '../assets/icsrequirements';
import {data} from '../assets/data';
import Axios from 'axios';

function HomePage() {
  let courseArray = required_ics
  let initialCourses = {}

  //get data information from all courses
  courseArray.map((item) => {
    if(item[1] && data.hasOwnProperty([item[0]])) 
        initialCourses[item[0]] = data[item[0]];
  })

  const [courses, setCourses] = useState(initialCourses); 
  const [addCourse, setAddCourse] = useState("");
  const [allAddCourses, setAllAddCourses] = useState([]);

  const onChangeCourse = ((value) => {setAddCourse(value)})

  const additionalCourse = () => {
    Axios.get('http://localhost:8080/api/addCourse', {
      params: {
        id: addCourse
      }
    }).then((res) => {
      console.log(res);
    }).catch((err)=> console.log(err))
  }

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
            <AddCourse onSubmitFunction={additionalCourse} 
                      onChangeFunction ={onChangeCourse}
                      courseArray={[
                        "Pikachu",
                        "Squirtle",
                        "Bulbasaur",
                        "Abra",
                        "Charizard",
                        "Blastoise",
                        "Mew",
                        "Mewtwo",
                        "Wartortle"
                      ]}/> 
          
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
