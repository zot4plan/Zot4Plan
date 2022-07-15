import {memo} from 'react';
import ReadMore from './ReadMore';
import './CourseCard.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface CourseCardType {
    id: string;
}

const checkLength = (text:string) => {
    return (text.length < 100)? text: <ReadMore text={text}/>;
}

function CourseCard({id}: CourseCardType) {
    const course = useSelector((state:RootState) => state.store.courses[id].data);
    const color = useSelector((state:RootState) => {
        let dept = state.store.courses[id].data.department
        return state.store.depts.byIds[dept];
    })

    let content;
    let body = [];
    
    body.push(<p key='description' style={{margin:'0rem'}}>{course.description}</p>);

    if(course.corequisite !== "")
        body.push(<p key='corequisite'> <b>{"Corequisites: "}</b>{checkLength(course.corequisite)} </p>)

    if(course.prerequisite !== "")
        body.push(<p key='prerequisite'> <b>{"Prerequisite: "}</b> {checkLength(course.prerequisite)} </p>)

    if(course.restriction !== "")
        body.push(<p key='restriction'> <b>{"Restriction: "}</b> {checkLength(course.restriction)} </p>)
            
    if(course.repeatability > 1)
        body.push(<p key='repeat'> <b>{"Repeatability: "}</b>{(course.repeatability === 9)? "unlimited": course.repeatability} </p>)

    if(course.ge !== "")
        body.push(<p key='ge'> <b>{"GE: "}</b>{checkLength(course.ge)} </p>)
    
    if(course.terms !== "")
        body.push(<p key='terms'><b>{"Last Offered: "}</b>{checkLength(course.terms)} </p>) 

    return ( 
        <div className="course-card" 
            style={{borderColor: color[1], boxShadow: '4px 4px 0px 0px ' + color[2]}}
        >   
            <div className='course-card-header' style={{backgroundColor: color[1]}}> 
                <p> <b>{id + '. ' + course.name} </b> </p> 
                <p> {course.units + " units"} </p>
            </div>
            
            <div className="course-card-body"> 
                {body}
            </div>  
        </div>
    )
}

export default memo(CourseCard)