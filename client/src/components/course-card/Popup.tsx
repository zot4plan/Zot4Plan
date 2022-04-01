import {useState, memo} from 'react';
//import Info from '../icons/Info';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

interface PopUpType {
    id: string;
    showUnit: boolean;
    isCrossed: boolean;
}
interface RenderPopupType {
    course: {
        id: string;
        name: string;
        department: string;
        units: number;
        description: string;
        repeatability: number;
        corequisite: string;
        prerequisite: string;
        restriction: string;
        ge: string;
    },
    color: string
}

const RenderPopup = memo(({course, color}: RenderPopupType) => {
    let body = [];
    body.push(<p key='description' className='m-0 sz-1'>{course.description}</p>);

    if(course.prerequisite !== "")
        body.push(
            <p key='prerequisite' className='mt mb sz-1'> 
                <b>{"Prerequisite: "}</b> {course.prerequisite}
            </p>)

    if(course.restriction !== "")
        body.push(
            <p key='restriction' className='mt mb sz-1'> 
                <b>{"Restriction: "}</b>{course.restriction}
            </p>)

    if(course.corequisite !== "")
        body.push(
            <p key='corequisite' className='mt mb sz-1'> 
                <b>{"Corequisites: "}</b>{course.corequisite}
            </p>)
            
    if(course.repeatability > 1)
        body.push(
            <p key='repeat' className='mt mb sz-1'> 
                <b>{"Repeatability: "}</b>{course.repeatability}
            </p>)

    if(course.ge !== "")
        body.push(
            <p key='ge' className='mt mb sz-1'> 
                <b>{"GE: "}</b>{course.ge}
            </p>)

    return (
        <>
        <div className='popup-header' style={{backgroundColor: color}}>
            <p className='m-0 sz-2'> 
                <b>{course.id + '. ' + course.name}</b> 
                <br/>
                {course.units + " units"} 
            </p>
        </div>
        
        <div style={{padding:'0.5rem'}}> 
            {body}
        </div>
        </>
    )
})

function Popup({id, showUnit, isCrossed}: PopUpType) {
    const [show, setShow] = useState(false);
    const course = useSelector((state: RootState) => state.store.courses.byIds[id].data)
    const colors = useSelector((state: RootState) => state.store.depts.byIds[course.department].colors);

    return ( 
        <div className={"flex flex-wrap justify-between item-center h-36 round-10"} 
                onClick={()=>setShow(!show)} 
                style={{backgroundColor: colors[2]}}>
            <div 
                className='courseId' 
                style={{textDecoration: isCrossed? "line-through":"none"}}
            > 
                {id}
            </div>

            {showUnit && <div className='unit'>{course.units + ' units'}</div>}
            
            <div className="card-popup-before" 
                style={{display: show? "block":"none",  
                        backgroundColor: colors[1]}}>
            </div>

            <div className="card-popup" 
                 style={{display: show? "block":"none",
                         borderColor: colors[1],
                         boxShadow: '4px 4px 0px 0px' + colors[0]}}>
                <RenderPopup course={course} color={colors[1]}/>
            </div>
        </div>
    )

}

export default memo(Popup)