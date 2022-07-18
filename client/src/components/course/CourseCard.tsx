import {memo, useState, useEffect} from 'react';
import ReadMore from './ReadMore';
import './CourseCard.css';
import { useStore, useSelector } from 'react-redux';
import { RootState} from '../../app/store';
import Axios from '../../api/Axios';

interface CourseCardType {
    id: string | null;
    isQuarter?: boolean;
}

const checkLength = (text:string) => {
    return (text.length < 100)? text: <ReadMore text={text}/>;
}

//function getSessionStorageOrDefault(id:string|null, isQuarter: boolean) {
//    
//}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function CourseCard({id, isQuarter = false}: CourseCardType) {
    const store = useStore();

    const [course, setCourse] = useState(() => {
        if(isQuarter && id) {
            const course = store.getState().store.courses[id];
            return course === undefined? null : course.data;
        }
        return null;
    });

    useEffect(() => {  
        if(!course) {
            setTimeout(() => {
                Axios.get('/api/getCourse', { params: { id: id} })
                .then(res => {
                    setCourse(res.data);
                })
                .catch(() => {

                })
            }, 500);  
        }
    },[course, setCourse]); 

    const color = useSelector((state:RootState) => {
        if(!id)
            return ['#AFD3E9', '#70ADD7', '#3688BF'];

        const dept = removeLastWord(id);
        return state.store.depts.byIds[dept];
    })

    let header;
    let body = [];

    if(course) {
        header = <div className='course-card-header' style={{backgroundColor: color[1]}}> 
                    <p> <b>{id + '. ' + course.name} </b> </p> 
                    <p> {course.units + " units"} </p>
                </div>

        body.push(<p key='description' style={{margin:'0rem'}}>{course.description}</p>);

        if(course.corequisite !== "")
            body.push(<p key='corequisite'> <b>{"Corequisites: "}</b>{checkLength(course.corequisite)}</p>)

        if(course.prerequisite !== "")
            body.push(<p key='prerequisite'> <b>{"Prerequisite: "}</b>{checkLength(course.prerequisite)}</p>)

        if(course.restriction !== "")
            body.push(<p key='restriction'> <b>{"Restriction: "}</b>{checkLength(course.restriction)}</p>)
                
        if(course.repeatability > 1)
            body.push(<p key='repeat'> <b>{"Repeatability: "}</b>{(course.repeatability === 9)? "unlimited": course.repeatability}</p>)

        if(course.ge !== "")
            body.push(<p key='ge'> <b>{"GE: "}</b>{checkLength(course.ge)}</p>)
        
        if(course.terms !== "")
            body.push(<p key='terms'><b>{"Last Offered: "}</b>{checkLength(course.terms)}</p>) 
    }
    else {
        header = <div className='course-card-header' style={{backgroundColor: color[1]}}> 
                    <p> <b> {id} </b> </p> 
                </div>
        body.push(<p style={{height:'50px', fontSize:'1.6rem'}}>Loading...!!!</p>)
    }

    return ( 
        <div className="course-card" style={{borderColor: color[1], boxShadow: '4px 4px 0px 0px ' + color[2]}}>   
            {header}
            <div className="course-card-body"> 
                {body}
            </div>  
        </div>
    )
}

export default memo(CourseCard)