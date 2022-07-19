import {memo} from 'react';
import ReadMore from './ReadMore';
import './CourseCard.css';

interface CourseCardType {
    id: string | null;
    course: CourseType | null;
    colors: string[];
}

const checkLength = (text:string) => {
    return (text.length < 100)? text: <ReadMore text={text}/>;
}

function CourseCard({id, course, colors}: CourseCardType) {
    let header =[];
    let body = [];

    if(course) {
        header.push(<p key="name"> <b>{id + '. ' + course.name} </b> </p>);
        header.push(<p key="unit"> {course.units + " units"} </p>);

        body.push(<p key='description' style={{margin:'0rem'}}>{course.description}</p>);

        if(course.corequisite !== "")
            body.push(<p key='corequisite'> <b>{"Corequisites: "}</b>{checkLength(course.corequisite)}</p>);

        if(course.prerequisite !== "")
            body.push(<p key='prerequisite'> <b>{"Prerequisite: "}</b>{checkLength(course.prerequisite)}</p>);

        if(course.restriction !== "")
            body.push(<p key='restriction'> <b>{"Restriction: "}</b>{checkLength(course.restriction)}</p>);
                
        if(course.repeatability > 1)
            body.push(<p key='repeat'> <b>{"Repeatability: "}</b>{(course.repeatability === 9)? "unlimited": course.repeatability}</p>);

        if(course.ge !== "")
            body.push(<p key='ge'> <b>{"GE: "}</b>{checkLength(course.ge)}</p>);
        
        if(course.terms !== "")
            body.push(<p key='terms'><b>{"Last Offered: "}</b>{checkLength(course.terms)}</p>);
    }
    else {
        header.push(<p key="name"> <b> {id} </b> </p>) ;
        body.push(<p key="load" style={{height:'50px', fontSize:'1.6rem'}}>Loading...!!!</p>);
    }

    return ( 
        <div className="course-card" style={{borderColor: colors[1], boxShadow: '4px 4px 0px 0px ' + colors[2]}}>   
            <div className='course-card-header' style={{backgroundColor: colors[1]}}> 
                {header}
            </div>
            <div className="course-card-body"> 
                {body}
            </div>  
        </div>
    )
}

export default memo(CourseCard)