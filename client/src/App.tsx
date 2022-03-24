import './App.css';

import Year from './components/year/Year';
import RequirementTab from './components/requirement/RequirementTab';
import SelectMajor from './components/input/SelectMajor';

import { useSelector, useDispatch } from 'react-redux';
import {RootState} from './app/store';
import { moveCourse, addYear, addCourseToQuarter, refreshState } from './features/ScheduleSlice';
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
      className="linkedin"><Linkedin/></a>
      <a target="_blank" href="https://github.com/" rel="noreferrer" 
      className="github"><Github/></a>
    </div>
  )
}
const RenderYears = () => {
  const years = useSelector((state: RootState) => state.shedule.years);
  return (
    <>
          {years.allIds.map( (id,index) => (
            <Year key={index} year= {years.byIds[id]} index={index} />
          ))}
    </>
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
    
    if(source.droppableId.length > 5)
      dispatch(addCourseToQuarter({
        destinationId: destination.droppableId,
        courseId: draggableId.substring(4),
        destinationIndex: destination.index
      }))
    else
      dispatch(moveCourse({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        courseId: draggableId.substring(4),
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
          <div className="addIcon" onClick={addNewYear}>
            <OutlineAdd/>
          </div>
          <div className="refreshIcon" onClick={refresh}>
            <Refresh/>
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
