import AddCourse from "../input/AddCourse";
import DroppableArea from "./DroppableArea";
import { useSelector } from 'react-redux';
import {RootState} from '../../app/store'

function OtherTab () {
    const courses = 
        useSelector((state:RootState)=> state.requirement.other)
    console.log("other");
   
    return (
        <div className="tab-container"  >
            <AddCourse></AddCourse>
            <DroppableArea courseIds={courses} droppableId='otherTab'/>
        </div>
    )
}

export default OtherTab