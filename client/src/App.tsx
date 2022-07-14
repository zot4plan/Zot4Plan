import './App.css';
import { useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { moveCourse } from './features/StoreSlice';
import Header from './components/header/Header';
import Schedule from './HomePage/schedule/Schedule';
import Tabs from './HomePage/tabs/Tabs';
import Footer from './components/footer/Footer';
import { fetchCourse } from './api/FetchData';

function App() {
  const dispatch = useDispatch();
   
  const onDragEnd = (result: DropResult ) => {
    const { source, destination, draggableId } = result;
    if(!destination) return;

    let len = source.droppableId.length;
    let courseId = draggableId.substring(len);

    if(len === 3) {
      dispatch(moveCourse({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        courseId: courseId
      }))
    }
    else {
      dispatch(fetchCourse({
        destinationId: destination.droppableId,
        destinationIndex: destination.index,
        courseId: courseId
      }));
    }
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
