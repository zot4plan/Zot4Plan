import {useState, memo, MouseEvent} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import ReactTooltip from "react-tooltip";
import Error from '../icon/Error';

interface CourseButtonType {
    id: string;
    sectionId: string;
    showUnit: boolean;
    isCrossed: boolean;
    isWarning: boolean;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function CourseButton({id, showUnit, isCrossed, isWarning}: CourseButtonType) {
    const [show, setShow] = useState(false);
    const units = useSelector((state: RootState) => state.store.courses[id] === undefined? 0 : state.store.courses[id].data.units);
    let colors = useSelector((state: RootState) => state.store.depts.byIds[removeLastWord(id)]);

    if(colors === undefined)
        colors = ['#AFD3E9', '#70ADD7', '#3688BF'];

    let bgColor = colors[2];
    let textColor = 'white';
    let textDecoration = 'none';
    let content = [];

    if (isCrossed) {
        bgColor = '#D3D3D3'
        textColor = 'black'
        textDecoration = "line-through"
    }

    content.push(<p key={"course-" + id} className='course-id' style={{textDecoration: textDecoration, color: textColor}}> 
                    {id}
                </p>)

    if (isWarning) {
        content.push( 
            <span key={"warning" + id} className='course-warning' data-tip data-for='prereqTip' > <Error/>
                <ReactTooltip id="prereqTip" place="top" effect="solid">
                    Missing prerequisites
                </ReactTooltip>
            </span>)                             
    }
    else if(showUnit)
        content.push(<p key={"unit"} className='unit'> {units + ' units'} </p>)
    
    function handleOnClick( e: MouseEvent<HTMLDivElement> ) {
        e.stopPropagation();
        e.preventDefault();
       //setShow(!show)
    }

    return ( 
        <div className="course-btn"
            style={{backgroundColor: bgColor}}
        >
            {content}
        </div>
        
        /*show && <CourseCard id={id} isShow={show} color={colors[1]} boxShadowColor={colors[0]} closeCard={handleOnClick}/> */
    )
}

export default memo(CourseButton)