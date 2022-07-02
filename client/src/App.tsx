import './App.css';
import { useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { moveCourse } from './features/StoreSlice';
import Header from './layouts/header/Header';
import Schedule from './layouts/body/schedule/Schedule';
import Tabs from './layouts/body/tabs/Tabs';
import Footer from './layouts/footer/Footer';

function App() {
  const dispatch = useDispatch();
   
  const onDragEnd = (result: DropResult ) => {
    const { source, destination, draggableId } = result;
    if(!destination) return;

    let courseId = draggableId.substring(source.droppableId.length);

    dispatch(moveCourse({
      sourceId: source.droppableId,
      destinationId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
      courseId: courseId
    }))
  }

  return (
  <div>
    <Header/>
    <DragDropContext onDragEnd={onDragEnd}>
      <div id="body-container" className="relative">
        <Schedule/>
        <Tabs/>
      </div>  
    </DragDropContext>
    <Footer/>
  </div> 
  );
}

export default App;
