import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { moveCourse } from '../../store/slices/CourseSlice';
import Toolbars from './toolbars/Toolbars';
import Schedule from './schedule/Schedule';
import Tabs from './tabs/Tabs';
import HomeNavList from './navbar/HomeNavList';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import UpdateVisitCount from '../../helpers/UpdateVisitCount';
import Christmas from '../../components/theme/christmas/Christmas';
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
        <div id="home">
            <Header 
                navbarStyle={{ 
                    margin: '0rem', 
                    backgroundColor: 'var(--secondary-color)', 
                    borderRadius: '0rem',
                 }}
                heartColor="var(--accent-color-2)"
                NavList={HomeNavList}
                Theme={Christmas}
            />
            <DragDropContext onDragEnd={onDragEnd}>
            <Toolbars printContent={printContent}/>
            <div id="body-container" className="relative">
                <Schedule ref={printRef}/>
                <Tabs/>
            </div>  
            </DragDropContext>
            <Footer/>
            <UpdateVisitCount page="home"/>
        </div>
    );
}

export default Home;
