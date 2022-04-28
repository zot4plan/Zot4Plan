import {memo} from 'react';

interface CourseCardType {
    course: CourseType;
    color: string;
    boxShadowColor: string;
}

function CourseCard({course, color, boxShadowColor}: CourseCardType) {

    let body = [];
    body.push(<p key='description' style={{margin:'0rem'}}>{course.description}</p>);

    if(course.prerequisite !== "")
        body.push(<p key='prerequisite'> <b>{"Prerequisite: "}</b> {course.prerequisite} </p>)

    if(course.restriction !== "")
        body.push(<p key='restriction'> <b>{"Restriction: "}</b> {course.restriction} </p>)

    if(course.corequisite !== "")
        body.push(<p key='corequisite'> <b>{"Corequisites: "}</b>{course.corequisite} </p>)
            
    if(course.repeatability > 1)
        body.push(<p key='repeat'> <b>{"Repeatability: "}</b>{course.repeatability} </p>)

    if(course.ge !== "")
        body.push(<p key='ge'> <b>{"GE: "}</b>{course.ge} </p>)

    return ( 
    <>
        <div className="course-card-before" 
            style={{backgroundColor: color}}>
        </div>

        <div className="course-card" 
            style={{borderColor: color, boxShadow: '4px 4px 0px 0px' + boxShadowColor}}
        >   
            <p className='course-card-header'
                style={{backgroundColor: color}}
            > 
                <b>{course.id + '. ' + course.name}</b> 
                <br/>
                {course.units + " units"} 
            </p>
            
            <div className="course-card-body"> 
                {body}
            </div>  
        </div>
    </>
    )

}

export default memo(CourseCard)