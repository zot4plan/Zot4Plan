import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import AdditionalCourses from './AdditionalCourses';
import GeneralEducation from './GeneralEducation';
import MajorCourses from './MajorCourses';
import './style.css'

function CoursesTabs ({major, removeCourse, moveCourse}) {
    const [key, setKey] = useState('required');

    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        unmountOnExit={true}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="required" title="Requirement">
            <MajorCourses onDrop={moveCourse} courses={major.courses} requirement={major.requirement} removeCourse={removeCourse}/>
        </Tab>
        <Tab eventKey="ge" title="GE">
          <GeneralEducation/>
        </Tab>
        <Tab eventKey="additional" title="Additional">
          <AdditionalCourses onDrop={moveCourse} courses={major.courses} addCourses={major.addCourses}/>
        </Tab>
      </Tabs>
    );
}

export default CoursesTabs