import 'bootstrap/dist/css/bootstrap.min.css';
import Schedules from '../components/Schedules';
import Requiremnets from '../components/Requirements';
import AutoCompleteSearch from '../components/AutoCompleteSearch';
import SelectMajor from '../components/SelectMajor';
import {Container, Row, Col} from 'react-bootstrap';
import {useState} from 'react';
import Qs from 'qs';
import Axios from 'axios';

function HomePage() {
  const [major, setMajor] = useState({courses:{}, requirement:[]})
  //const [courses, setCourses] = useState({}); 
  //const [requirement, setRequirement] = useState([]);
  //add course axios
  const additionalCourse = async (addCourse) => {
    Axios.get('http://localhost:8080/api/addCourse', {
      params: {
        id: addCourse
      }
    }).then((res) => {
      console.log(res);
    }).catch((err)=> console.log(err))
  }
  
  //get requirement and courses when selecting a major
  const getRequirement = async (e) => {
    // get requirement 
    const res = await Axios.get('http://localhost:8080/api/getRequirement', {
      params: { id: e.value }
    });
    const requirementData = await res.data.majorRequirements;
    let courseIds = new Set();

    res.data.majorRequirements.forEach(elem => {
      if(elem[1] === "True")
        courseIds.add(elem[0]);
    });
    
    // get courses data after get the requirement 
    const res2 = await Axios.get('http://localhost:8080/api/getCourses', {
      params: { id: Array.from(courseIds)
      },
      paramsSerializer: function(params) {
        return Qs.stringify(params,{arrayFormat: 'brackets'} )
      },
    });

    const courseData = {};
    res2.data.forEach(course => {
      course.quarter = 0;
      courseData[course.id] = course;
    })
    setMajor({courses: courseData, requirement:res.data.majorRequirements})
   // setRequirement(res.data.majorRequirements)
   // setCourses(courseData)
  }

  //move course between quarters and requirement
  const moveCourse = ((item, quarter) => {
    console.log('From:', item.quarter, 'to:', quarter);
  
    //return drag and drop are the same
    if( item.quarter === quarter) 
        return;
    else {
      item.quarter = quarter;
      //setCourses({...courses,[item.id]: item});
      setMajor(prevState => ({...prevState, courses: {...prevState.courses,[item.id]: item}}));
    }

  })

  return (
    <div>
      <Container fluid='md'> 
        <Row>
          <Col sm={6}> 
            <Schedules courses={major.courses} moveCourse={moveCourse}> </Schedules>
          </Col>

          <Col sm={6}> 
            <SelectMajor onSelect={getRequirement}/>
            <AutoCompleteSearch onSubmit={additionalCourse} /> 
          
            <div style={{backgroundColor:'#E2E8E4', minHeight:100, minWidth: 500}}
                className= 'mt-4'> Required courses:
                <Requiremnets onDrop={moveCourse} courses={major.courses} requirements={major.requirement}/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
/*
<Requiremnets onDrop={moveCourse} courses={courses} requirements={requirement}/> 
<Requiremnets onDrop={moveCourse} courses={major.courses} requirements={major.requirement}/>
*/