import 'bootstrap/dist/css/bootstrap.min.css';
import { memo } from 'react';
import { Popover,OverlayTrigger,Button } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import ItemTypes from '../assets/ItemTypes';
import './style.css'

export function CourseCard({item, buttonClass, isDraggable, removeCourse,quarter}) {
    //const [draggabble, setDraggable] = useState(true);
    console.log(item.id);
    const [{isDragging}, dragRef] = useDrag({
        type: ItemTypes,
        canDrag: isDraggable,
        item: () => ({item,quarter}),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    },[isDraggable]);

    function removeButton () {
        return (
            <Button variant="danger" 
                    className="removeBtn" 
                    onClick={(e) => {
                        e.preventDefault(); 
                        removeCourse(item.id)}}
            >
                <i className="fa fa-trash"></i>
            </Button>
        )
    }

    return (
        <div ref={dragRef}
             style={{opacity: isDragging? 0.4 : 1 }}
        >
            <OverlayTrigger
                trigger="click" placement='bottom' rootClose
                overlay={
                <Popover id={item.id}>
                    <Popover.Header style={{display:"flex"}}> 
                        <p className="course-header"> <b>{item.title}</b> <br/>{item.units + " units"} </p>
                        {item.removable && removeButton()}
                    </Popover.Header>
                    <Popover.Body> 
                        <p> <b>{"Description: "}</b> {item.description} </p>
                        <p> <b>{"Prerequisite: "}</b> {item.prereqString} </p>
                        <p> <b>{"Restriction: "}</b> {item.restriction} </p>
                    </Popover.Body>
                </Popover>
                }
            >
                <Button className={isDraggable? "edit-button":"picked-button"} 
 
                >
                    {item.id}
                </Button>
            </OverlayTrigger>
        </div>
    ); 
}

const equalFn = function (prevCourse, nextCourse) {
    return prevCourse.isDraggable === nextCourse.isDraggable && prevCourse.item.id === nextCourse.item.id && prevCourse.item.quarter === nextCourse.item.quarter;
}

  
export default  memo(CourseCard, equalFn);