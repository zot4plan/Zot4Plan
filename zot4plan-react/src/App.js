import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Years from './components/Years';
import Courses from './components/Courses';
import { Container, Row, Col } from 'react-bootstrap';
import {data} from './Assets/data';
import {useState} from 'react';

function App() {
  /*const [courses, setCourses] = useState(data);
  const onDrop = (item, monitor, quarter) => {
    setCourses(prevState => {
      const newCourses = preState.filter(i => i.id !=item.id).concat()
    })
  } */
  return (
    <>
      <Header/>
      <Container fluid='md'> 
        <Row>
          <Col sm={8}><Years/></Col>
          <Col sm={4}><Courses/></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
