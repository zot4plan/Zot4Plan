import AddCourse from "../input/AddCourse";
import DroppableArea from "./DroppableArea";
import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';

function AddTab () {
    const other = 
        useSelector((state:RootState)=> state.store.other)
    console.log("other");
   
    return (
        <div className="tab-container"  >
            <AddCourse></AddCourse>
            <DroppableArea courseIds={other.courses} droppableId={other.id}/>
        </div>
    )
}

export default AddTab