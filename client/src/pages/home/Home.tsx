import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { moveCourse} from '../../store/slices/StoreSlice';
import Buttons from './buttons/Buttons';
import Schedule from './schedule/Schedule';
import Tabs from './tabs/Tabs';
import './Home.css';

function App() {
    const dispatch = useDispatch();
    const onDragEnd = (result: DropResult ) => {
        const { source, destination, draggableId } = result;
        if(!destination) return;

        let len = source.droppableId.length;
        let courseId = draggableId.substring(len);

        dispatch(moveCourse({
            sourceId: source.droppableId,
            destinationId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
            courseId: courseId
        }))
    }

    const printRef = useRef<HTMLDivElement>(null);
    const printContent = () => printRef.current;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Buttons printContent={printContent}/>
            <div id="body-container" className="relative">
                <Schedule ref={printRef}/>
                <Tabs/>
            </div>  
        </DragDropContext>
    );
}

export default App;
