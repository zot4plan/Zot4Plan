import './App.css';

import { useDispatch } from 'react-redux';
import { moveCourse, addCourseToQuarter} from './features/StoreSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import NavBar from './layouts/navigation/NavBar';
import Schedule from './layouts/content/Schedule';
import Tabs from './layouts/content/Tabs';
import Footer from './layouts/footer/Footer';

function App() {
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
    <NavBar/>
    <DragDropContext onDragEnd={onDragEnd}>
      <div id="body-container">
          <Schedule/>
          <Tabs/>
      </div>  
    </DragDropContext>
    <Footer/>
  </> 
  );
}

export default App;
