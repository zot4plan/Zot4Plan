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
  const [major, setMajor] = useState({courses:{}, requirement:[], addedCourses: []})
  //const [addedCourses, setAddCourses] = useState([]); 
  //const [requirement, setRequirement] = useState([]);

  //add course axios
  const additionalCourse = async (addCourse) => {
    Axios.get('http://localhost:8080/api/addCourse', {
      params: {
        id: addCourse
      }
    }).then((res) => {
      console.log(res);
       if(res.data.message === "success"){
        let course = res.data.data;
        if(major.courses[course.id] != undefined)
          console.log("Course has already added.")
        else {
          course.quarter = 0;
          setMajor(prevState => ({...prevState, courses: {...prevState.courses,[course.id]: course}, addedCourses: [...prevState.addedCourses, course.id]}));
        }
      }
      else {
        console.log(res.data.message);
      }
    }).catch((err)=> console.log(err))
  }
  
  //get requirement and courses when selecting a major
  const getRequirement = async (e) => {
    // if input is not empty
    if(e) {
      // get requirement 
      const res = await Axios.get('http://localhost:8080/api/getRequirement', {
        params: { id: e.value }
      });
      const requirementData = await res.data.majorRequirements;
      let courseIds = new Set();
      // elem[0]: courseId or text, elem[1]: True is courseId, False is text
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
      setMajor({courses: courseData, requirement:res.data.majorRequirements, addedCourses: []})
    // setRequirement(res.data.majorRequirements)
    // setCourses(courseData)
    }
    else {
      setMajor({courses: {}, requirement: [], addedCourses: []})
    }
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
            <Schedules courses={major.courses} moveCourse={moveCourse}/> 
          </Col>

          <Col sm={6}> 
            <SelectMajor onSelect={getRequirement}/>
            <AutoCompleteSearch onSubmit={additionalCourse}/> 
            <Requiremnets onDrop={moveCourse} major={major}/>
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