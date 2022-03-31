import BrowseCourse from "./BrowseCourse";
import DroppableArea from "../DroppableArea";
import { useSelector } from 'react-redux';
import {RootState} from '../../../app/store';

function AddTab () {
    const other = useSelector((state:RootState)=> state.store.other)
    console.log("other");
   
    return (
        <div className="tab-container"  >
            <BrowseCourse></BrowseCourse>
            <DroppableArea courseIds={other.courses} droppableId={other.id} text=""/>
        </div>
    )
}

export default AddTab