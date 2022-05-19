import {memo, MouseEvent} from 'react';
import XCircle from '../icon/XCircle';
import React, { useState } from "react";

interface CourseCardType {
    course: CourseType;
    color: string;
    boxShadowColor: string;
    closeCard: (e: MouseEvent<HTMLDivElement>) => void;
}

interface ExpandTextType {
    content: string;
}

// Source: https://www.geeksforgeeks.org/how-to-create-a-read-more-component-in-reactjs/
const ExpandText = ( {content}:ExpandTextType ) => {
    const text = content;
    const [isExpand, setIsExpand] = useState(true);
    const toggleExpand = () => {
        setIsExpand(!isExpand)
    };
    return (
        <span className="text">
            {isExpand ? text.slice(0, 100) : text}
            <span onClick={ toggleExpand } style={{color:'#307ABB', cursor: 'pointer'}}>
                {isExpand ? "...See More" : " See Less"}
            </span>
        </span>
    )
}

function CourseCard({course, color, boxShadowColor, closeCard}: CourseCardType) {

    let body = [];
    const checkLength = (text:string) => {
        return (text.length < 100)? text: < ExpandText content={text}/>;
    }

    body.push(<p key='description' style={{margin:'0rem'}}>{course.description}</p>);

    if(course.corequisite !== "")
        body.push(<p key='corequisite'> <b>{"Corequisites: "}</b>{checkLength(course.corequisite)} </p>)

    if(course.prerequisite !== "")
        body.push(<p key='prerequisite'> <b>{"Prerequisite: "}</b> {checkLength(course.prerequisite)} </p>)

    if(course.restriction !== "")
        body.push(<p key='restriction'> <b>{"Restriction: "}</b> {checkLength(course.restriction)} </p>)
            
    if(course.repeatability > 1)
        body.push(<p key='repeat'> <b>{"Repeatability: "}</b>{course.repeatability} </p>)

    if(course.ge !== "")
        body.push(<p key='ge'> <b>{"GE: "}</b>{checkLength(course.ge)} </p>)
    
    if(course.terms !== "")
        body.push(<p key='terms'><b>{"Last Offered: "}</b>{checkLength(course.terms)} </p>)

    return ( 
    <>
        <div className="course-card-background"> </div>
        <div className="absolute course-card-before" 
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

            <div onClick={closeCard} className="absolute close-card" > <XCircle/> </div> 
        </div>
    </>
    )

}

export default memo(CourseCard)