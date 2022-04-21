import './App.css';

import { useDispatch } from 'react-redux';
import { moveCourse, addCourseToQuarter} from './features/StoreSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Header from './components/header/Header';
import Schedule from './components/schedule/Schedule';
import Tabs from './components/requirement/Tabs';

function HomePage() {
  const dispatch = useDispatch();
   
  const onDragEnd = (result: DropResult ) => {
    const { source, destination, draggableId } = result;
    if(!destination) return;

    let courseId = draggableId.substring(source.droppableId.length);
    if(source.droppableId.length > 3) {
      //// draggableId: droppableId(i)-courseId with i is droppableId length
      dispatch(addCourseToQuarter({
        quarterId: destination.droppableId,
        courseId: courseId,
        index: destination.index
      }))
    }
    else
      dispatch(moveCourse({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        courseId: courseId
      }))
  }

  return (
  <>
  <Header/>
  <DragDropContext onDragEnd={onDragEnd}>
    <div id="body-container">
        <Schedule/>
        <Tabs/>
    </div>  
  </DragDropContext>
  </> 
  );
}

export default HomePage;
