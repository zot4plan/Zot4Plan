import './App.css';

import Year from './components/year/Year';
import RequirementTab from './components/requirement/RequirementTab';
import SelectMajor from './components/input/SelectMajor';

import { useSelector, useDispatch } from 'react-redux';
import {RootState} from './app/store';
import { moveCourse, addYear, addCourseToQuarter } from './features/ScheduleSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Logo from './components/icons/Logo';
import Github from './components/icons/Github';
import Linkedin from './components/icons/Linkedin';
import OutlineAdd from './components/icons/OutlineAdd';

function App() {
  const years = useSelector((state: RootState) => state.shedule.years);
  console.log(years);
  const dispatch = useDispatch();

  const addNewYear = () => {
    dispatch(addYear());
  }

  const onDragEnd = (result: DropResult ) => {
    const { source, destination, draggableId } = result;
    if(!destination) return;
    
    if(source.droppableId.length > 5)
      dispatch(addCourseToQuarter({
        destinationId: destination.droppableId,
        courseId: draggableId.substr(4),
        destinationIndex: destination.index
      }))
    else
      dispatch(moveCourse({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        courseId: draggableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }))
  }

  return (
  <>
  <div className="header">
    <Logo/>
    <SelectMajor/>
    <a target="_blank" href="https://www.linkedin.com/" rel="noreferrer"
    className="linkedin"><Linkedin/></a>
    <a target="_blank" href="https://github.com/" rel="noreferrer" 
    className="github"><Github/></a>
  </div>
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="grid-container">
        <div className="left-container">
          {years.allIds.map( (id,index) => (
            <Year key={index} year= {years.byIds[id]} index={index} />
          ))}
          <div className="addIcon" onClick={addNewYear}>
            <OutlineAdd/>
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
