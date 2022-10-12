import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { moveCourse} from '../../store/slices/CourseSlice';
import Buttons from './buttons/Buttons';
import Schedule from './schedule/Schedule';
import Tabs from './tabs/Tabs';
import HomeNavList from './navlist/HomeNavList';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const onDragEnd = (result: DropResult) => {
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
        <>
            <Header 
                path="/home" 
                heartColor="var(--accent-color-2)"
                NavList={HomeNavList}
            />
            <DragDropContext onDragEnd={onDragEnd}>
            <Buttons printContent={printContent}/>
            <div id="body-container" className="relative">
                <Schedule ref={printRef}/>
                <Tabs/>
            </div>  
            </DragDropContext>
            <Footer/>
        </>
    );
}

export default Home;
