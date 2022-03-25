import './App.css';

import Year from './components/year/Year';
import RequirementTab from './components/requirement/RequirementTab';
import SelectMajor from './components/input/SelectMajor';

import { useSelector, useDispatch } from 'react-redux';
import {RootState} from './app/store';
import { moveCourse, addYear, addCourseToQuarter, refreshState } from './features/StoreSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Logo from './components/icons/Logo';
import Github from './components/icons/Github';
import Linkedin from './components/icons/Linkedin';
import OutlineAdd from './components/icons/OutlineAdd';
import Refresh from './components/icons/Refresh';

const Header = () => {
  return (
    <div className="header">
      <Logo/>
      <SelectMajor/>
      <a target="_blank" href="https://www.linkedin.com/" rel="noreferrer"
      className="linkedin" aria-label="Linkedin"><Linkedin/></a>
      <a target="_blank" href="https://github.com/" rel="noreferrer" 
      className="github" aria-label="Github"><Github/></a>
    </div>
  )
}
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
    <p>{"Total units: " + units}</p>
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

    if(source.droppableId.length > 3) {
    // draggableId = 'droppableId-courseId' with droppableId.length = 4
      let courseId = draggableId.substring(source.droppableId.length);
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
        destinationIndex: destination.index
      }))
  }

  return (
  <>
  <Header/>
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="grid-container">
      <div className="left-container">
        <RenderYears/>
        <div style={{display: "flex"}}>
        <div className="refreshIcon" onClick={refresh}>
            <Refresh/>
          </div>
          <div className="addIcon" onClick={addNewYear}>
            <OutlineAdd/>
          </div>
          <div>
            <TotalUnits/>
          </div>
        </div>
      </div>
        <div className="right-container">
          <RequirementTab/>
        </div>
    </div>  
  </DragDropContext>
  </> 
  );
}

export default App;
