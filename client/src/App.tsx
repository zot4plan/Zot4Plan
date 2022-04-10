import './App.css';

import Header from './components/header/Header'
import Year from './components/year/Year';
import Tabs from './components/requirement/Tabs';

import { useSelector, useDispatch } from 'react-redux';
import {RootState} from './app/store';
import { moveCourse, addYear, addCourseToQuarter, refreshState } from './features/StoreSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import OutlineAdd from './components/icons/OutlineAdd';
import Refresh from './components/icons/Refresh';

const RenderYears = () => {
  const yearIds = useSelector((state: RootState) => state.store.years.allIds);
  return (
    <>
          {yearIds.map( (id,index) => (
            <Year key={id} yearId= {id} index={index} />
          ))}
    </>
  )
}

const TotalUnits = () => {
  const units = useSelector((state:RootState)=> state.store.years.totalUnits);
  return (
    <p className='m-0 sz-4'>{"Total units: " + units}</p>
  )
}

function App() {
  const dispatch = useDispatch();
  
  const addNewYear = () => {
    dispatch(addYear());
  }

  const refresh = () => {
    dispatch(refreshState());
  }
   
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
    <div className="grid body-template-cols m-2">
      <div className="flex flex-column mr-2">
        <RenderYears/>
        <div className='relative flex item-center justify-between'>
          <div className="round cl-blue icon" 
               onClick={refresh}> <Refresh/> </div>
          <div  className="absolute center-x round cl-blue icon" 
                onClick={addNewYear}> <OutlineAdd/> </div>
          <div> <TotalUnits/> </div>
        </div>
      </div>
      <div className='ml-2 shadow round-15 h-65'>
        <Tabs/>
      </div>
    </div>  
  </DragDropContext>
  </> 
  );
}

export default App;
