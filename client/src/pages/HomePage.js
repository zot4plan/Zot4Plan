import 'bootstrap/dist/css/bootstrap.min.css';
import Schedules from '../components/Schedules';
import Requiremnets from '../components/Requirements';
import AutoCompleteSearch from '../components/AutoCompleteSearch';
import SelectMajor from '../components/SelectMajor';
import {Container, Row, Col} from 'react-bootstrap';
import {useState, useCallback} from 'react';
import Qs from 'qs';
import Axios from 'axios';

function HomePage() {
  const [major, setMajor] = useState({courses:{}, requirement:[], addedCourses: []})
  const [quarters, setQuarters] = useState({0:[], 1:[], 2:[], 3:[], 4:[], 5:[],
                                 6:[], 7:[], 8:[], 9:[], 10:[], 11:[], 12:[]});
  
  /************ add course axios *************/
  const additionalCourse = useCallback(async (addCourse) => {
    Axios.get('http://localhost:8080/api/addCourse', {
      params: {
        id: addCourse
      }
    }).then((res) => {
      console.log(res);
       if(res.data.message === "success"){
        let course = res.data.data;
        if(major.courses[course.id] !== undefined)
          console.log("Course has already added.")
        else {
          course.quarter = 0;
          course.removable = true;
          setQuarters(prevState => ({...prevState, 0: [...prevState[0],course.id]}))
          setMajor(prevState => ({...prevState, courses: {...prevState.courses,[course.id]: course}, addedCourses: [...prevState.addedCourses, course.id]}));
        }
      }
      else {
        console.log(res.data.message);
      }
    }).catch((err)=> console.log(err))
  },[])


  /************ remove additional course *************/
  const removeCourse = (id) => {
    const courses = {...major.courses};
    delete courses[id];
    const arr = major.addedCourses.filter(e => e !== id)
    setMajor(prevState => ({...prevState, courses: courses, addedCourses: arr}));
  }

  /******* retrieve requirement and courses when select major *******/
  const getRequirement = useCallback( async (e) => {
    // if input is not empty
    if(e) {
      //retrieve requirement's structure 
      const res = await Axios.get('http://localhost:8080/api/getRequirement', {
        params: { id: e.value }
      });
  
      let courseIds = new Set();
      // elem[0]: courseId or text, elem[1]: True is courseId, False is text
      res.data.majorRequirements.forEach(elem => {
        if(elem[1] === "True")
          courseIds.add(elem[0]);
      });
      
      //retrieve courses data after get the requirement 
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
        course.removable = false;
        courseData[course.id] = course;
      })
      setMajor({courses: courseData, requirement:res.data.majorRequirements, addedCourses: []})
    }
    else 
      setMajor({courses: {}, requirement: [], addedCourses: []})
  },[])

  /*** move course between quarters and requirement ***/
  const moveCourse = ((item, quarter) => {
    console.log('From:', item.item.quarter, 'to:', quarter);
    console.log(item.item, item.quarter);
    //return drag and drop are the same
    if( item.item.quarter === quarter) 
        return;
    else {
      item.item.quarter = quarter;
      setMajor(prevState => ({...prevState, courses: {...prevState.courses,[item.item.id]: item.item}}));
    }

  })

  return (
    <Container fluid='md'> 
      <Row>
        <Col sm={6}> 
          <Schedules courses={major.courses} moveCourse={moveCourse} removeCourse={removeCourse}/> 
        </Col>

        <Col sm={6}> 
          <SelectMajor onSelect={getRequirement}/>
          <AutoCompleteSearch onSubmit={additionalCourse}/> 
          <Requiremnets onDrop={moveCourse} major={major} removeCourse={removeCourse}/>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
/*
<Requiremnets onDrop={moveCourse} courses={courses} requirements={requirement}/> 
<Requiremnets onDrop={moveCourse} courses={major.courses} requirements={major.requirement}/>
*/