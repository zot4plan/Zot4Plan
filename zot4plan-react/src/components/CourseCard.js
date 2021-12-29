import 'bootstrap/dist/css/bootstrap.min.css';
import { Popover,OverlayTrigger,Button } from 'react-bootstrap';
import React, {useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from '../assets/ItemTypes';

function CourseCard({item, index}) {
    const ref = useRef(null)
   /* const [, dropRef] = useDrop({
        accept: ItemTypes,
        hover(item, monitor) {
            if(!ref.current){
                return;
            }
            const dragIndex = item.id;
            const hoverIndex = index;

            if(dragIndex === hoverIndex) {
                return;
            }

            const hoveredRect = ref.current.getBoundClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if(dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
           // moveItem(dragIndex, hoverIndex);
            item.id=hoverIndex;
            
        }
    }) */
    const [{isDragging}, dragRef] = useDrag({
        type: ItemTypes,
        item: () => ({item}),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });
    
   // const [show, setShow] = useState(false);
   // const onOpen = () => setShow(true);
   // const onClose = () => setShow(false);

   // const dragDropRef = dragRef(dropRef(ref))
    return (
        <div
            ref={dragRef}
            style={{opacity: isDragging? 0.4 : 1, minWidth: 100}}
        >
            <OverlayTrigger
                trigger="click"
                placement='bottom'
                overlay={
                <Popover id={item.id}>
                    <Popover.Header as="h4">{item.id}</Popover.Header>
                    <Popover.Body> {item.description} </Popover.Body>
                    <Popover.Body> {item.prereqString} </Popover.Body>
                    <Popover.Body> {item.restriction} </Popover.Body>
                </Popover>
                }
            >
                <Button variant="primary" className="w-100">{item.id}</Button>
            </OverlayTrigger>
        </div>
    ); 
}

  
export default CourseCard;