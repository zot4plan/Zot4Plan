import { useState } from "react";
import CourseCard from "./CourseCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

function Courses() {
    const [courses, setCourses] = useState([
        {
            id: 'I&C SCI 31',    
            name: 'Introduction to Programming',
            description: 'Introduction to fundamental concepts and techniques for writing software in a high-level programming language. Covers the syntax and semantics of data types, expressions, exceptions, control structures, input/output, methods, classes, and pragmatics of programming.',
            prerequisite: [],
            next: [],
            units: 4,
            taken: false,
            quarter: 0,
        },
        {
            id: 'I&C SCI 32',    
            name: 'Programming with Software Libraries',
            description: 'Introduction to fundamental concepts and techniques for writing software in a high-level programming language. Covers the syntax and semantics of data types, expressions, exceptions, control structures, input/output, methods, classes, and pragmatics of programming.',
            prerequisite: [],
            next: [],
            units: 4,
            taken: false,
            quarter: 0,
        },
        {
            id: 'I&C SCI 33',    
            name: 'Intermediate Programming',
            description: 'Introduction to fundamental concepts and techniques for writing software in a high-level programming language. Covers the syntax and semantics of data types, expressions, exceptions, control structures, input/output, methods, classes, and pragmatics of programming.',
            prerequisite: [],
            next: [],
            units: 4,
            taken: false,
            quarter: 0,
        },
        {
            id: 'I&C SCI 34',    
            name: 'Intermediate Programming',
            description: 'Introduction to fundamental concepts and techniques for writing software in a high-level programming language. Covers the syntax and semantics of data types, expressions, exceptions, control structures, input/output, methods, classes, and pragmatics of programming.',
            prerequisite: [],
            next: [],
            units: 4,
            taken: false,
            quarter: 0,
        },
        {
            id: 'I&C SCI 35',    
            name: 'Intermediate Programming',
            description: 'Introduction to fundamental concepts and techniques for writing software in a high-level programming language. Covers the syntax and semantics of data types, expressions, exceptions, control structures, input/output, methods, classes, and pragmatics of programming.',
            prerequisite: [],
            next: [],
            units: 4,
            taken: false,
            quarter: 0,
        },
    ]);

    let rowCount = Math.floor(courses.length/3) + 1;
    let index = 0;
    const renderRows = () => {
        let rows=[];
        for(let r = 0; r < rowCount; r++)
            rows.push(
                <Row key={'row'+r} md={3} className='mt-4'>
                    {renderCols()}
                </Row>
            );
        return rows;
    }

    const renderCols = () => {
        let cols=[]
        for(let c = 0; c < 3 && index < courses.length; c++){
                cols.push(
                    <Col key={"col"+index}>
                        <CourseCard 
                            key={courses[index].id}
                            item={courses[index]}
                            index={courses[index].id}
                        > 
                        </CourseCard>
                    </Col>
                )
            index++;
        }
        return cols;   
    }

    return (
        <Container className='mt-4' variant="light">
            {renderRows()}
        </Container>
    );
}

  
export default Courses;