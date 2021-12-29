import 'bootstrap/dist/css/bootstrap.min.css';
import required_ics from '../assets/icsrequirements';
import {Container, Row, Col} from 'react-bootstrap';
import {icsData} from '../assets/IcsData'
import CourseCard from './CourseCard'
import './Requirements.css'
import { Popover,OverlayTrigger,Button } from 'react-bootstrap';

const Requirements = ({courses}) => {

    let courseArray = Object.entries(required_ics)
    let index = 0

    function renderCol(){  
        let columns = []
        index++
        while(index < courseArray.length && courseArray[index][1]){

            if(icsData.hasOwnProperty(courseArray[index][0])){
                let i = courses.findIndex((course) => course.id === courseArray[index][0])

                if(courses[i].quarter !== 0){
                    columns.push(<Col key = {courseArray[index][0]}>
                        <OverlayTrigger
                            trigger="click"
                            placement='bottom'
                            overlay={
                            <Popover id={courses[i].id}>
                                <Popover.Header as="h4">{courses[i].id}</Popover.Header>
                                <Popover.Body> {courses[i].description} </Popover.Body>
                                <Popover.Body> {courses[i].prereqString} </Popover.Body>
                                <Popover.Body> {courses[i].restriction} </Popover.Body>
                            </Popover>
                            }
                            >
                            <Button variant="secondary" className="w-100">{courses[i].id}</Button>
                        </OverlayTrigger>
                        </Col>)
                }else{

                columns.push(<Col key = {courseArray[index][0]}>
                    <CourseCard 
                        item={icsData[courseArray[index][0]]}
                        index={icsData[courseArray[index][0]].id} > 
                    </CourseCard>
                    </Col>)
                }
            }
            else
                columns.push(<Col key = {courseArray[index][0]}>{courseArray[index][0]}</Col>)
            index++

        }
        return columns
    }

    function renderRequirements(){        
        var rows = []

        console.log(courses)
        for(index; index < courseArray.length; index++){
            let i = index 
            if(!courseArray[index][1]){
                rows.push(<div key = {courseArray[i][0]}> <h6>{courseArray[i][0]}</h6> <Row md={8} xs={4}>
                {renderCol()}</Row></div>)
                index--
            }
        }
        return rows
    }

    return (
        <Container>
            {renderRequirements()}
        </Container>
    )
}

export default Requirements