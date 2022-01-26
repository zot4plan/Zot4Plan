import 'bootstrap/dist/css/bootstrap.min.css';
import Quarters from '../components/Quarters';
import AutoCompleteSearch from '../components/AutoCompleteSearch';
import SelectMajor from '../components/SelectMajor';
import CoursesTabs from '../components/CoursesTabs';
import {Container, Row, Col} from 'react-bootstrap';
import {useState, useCallback} from 'react';
import Qs from 'qs';
import Axios from 'axios';

function HomePage() {
  const [major, setMajor] = useState({courses:{}, requirement:[], addCourses: []})
  
  /************ add course axios *************/
  const additionalCourse = (addCourse) => {
    if(major.courses[addCourse] !== undefined)
      console.log("Course has already added.");
    else {
      Axios.get('http://localhost:8080/api/addCourse', {
      params: {
        id: addCourse
      }
    }).then((res) => {
      console.log(res);
       if(res.data.message === "success"){
          let course = res.data.data;
          //
          course.quarter = 0;
          course.removable = true;

          setMajor(prevState => ({...prevState, courses: {...prevState.courses,[course.id]: course}, addCourses: [...prevState.addCourses, course.id]}));
        
      }
      else {
        console.log(res.data.message);
      }
    }).catch((err)=> console.log(err))
    }
  }

  /************ remove additional course *************/
  const removeCourse = (id) => {
    const courses = {...major.courses};
    delete courses[id];
    const arr = major.addCourses.filter(e => e !== id)
    setMajor(prevState => ({...prevState, courses: courses, addCourses: arr}));
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
      setMajor({courses: courseData, requirement:res.data.majorRequirements, addCourses:[]})
    }
    else 
      setMajor({courses:{}, requirement:[], addCourses:[]})
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
          <Quarters courses={major.courses} moveCourse={moveCourse} removeCourse={removeCourse}/> 
        </Col>

        <Col sm={6}> 
          <SelectMajor onSelect={getRequirement}/>
          <AutoCompleteSearch onSubmit={additionalCourse}/> 
          <CoursesTabs major={major} moveCourse={moveCourse} removeCourse={removeCourse} />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;