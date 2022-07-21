import {memo, Fragment} from 'react';
import ReadMore from './ReadMore';
import './CourseCard.css';

interface CourseCardType {
    id: string | null;
    course: CourseType | null;
    colors: string[];
}

const checkLength = (text:string|number, isTerm = false) => {
    if(typeof(text) === 'number') return text;
    
    if(isTerm) {
        let terms = text.split('.');
        terms.pop();

        if(terms.length > 2) return <ReadMore text={terms}/>
        
        let content:JSX.Element[] = [];
        terms.forEach((term, index) => {
            content.push(<Fragment key={index}> {term} <br/> </Fragment>);
        })

        return <>{content}</>;
    }

    return (text.length > 100)? <ReadMore text={text}/> : text;
}

const fields = ['corequisite', 'prerequisite', 'restriction', 'ge' ];
const labels = ['Corequisite: ', 'Prerequisite: ', 'Restriction: ', 'GE: '];

function CourseCard({id, course, colors}: CourseCardType) {
    let header =[];
    let body = [];

    if(course) {
        header.push(<p key="name"> <b>{id + '. ' + course.name} </b> </p>);
        header.push(<p key="unit"> {course.units + " units"} </p>);

        body.push(<p key='description' style={{margin:'0rem'}}>{course.description}</p>);

        fields.forEach((field, index) => {
            if(course[field] !== "")
                body.push(<p key={field}> <b>{labels[index]}</b>{checkLength(course[field])}</p>);
        })

        if(course.repeatability > 1)
            body.push(<p key='repeat'> <b>{"Repeatability: "}</b>{(course.repeatability === 9)? "unlimited": course.repeatability}</p>);
        
        if(course.terms !== "") {
            body.push(<p key='terms'>
                        <b>{"Last Offered: "}</b> <br/> 
                        {checkLength(course.terms, true)} 
                    </p>);
        }
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