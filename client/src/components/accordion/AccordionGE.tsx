import {memo, useEffect, useState, MouseEvent} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { RootState } from "../../app/store";
import { fetchGE } from '../../api/FetchData';
import Right from '../icon/ArrowRightSmall';
import Detail from './Detail';
import './Accordion.css';


interface SectionProps {
    id: string;
}

const AccordionGE = ({id}:SectionProps) => {
    const ge = useSelector((state: RootState) => state.ge.byIds[id]);
    const status = useSelector((state: RootState) => state.ge.byIds[id].status);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {  
        if(isOpen && status === 'idle') 
          dispatch(fetchGE(id));
      },[isOpen, status, dispatch, id]); 
    
    let detail;

    if(status === 'loading')
        detail = <div> Loading...!!! </div>

    else if ( status === 'succeeded')  
        detail = ge.sectionIds.map(( section:{sectionId: string, nameChild: string}) => 
                    <Detail key={section.sectionId} 
                        sectionId={section.sectionId} 
                        text={section.nameChild}
                        isGE={true}
                    />)
    else
        detail = <div> Cannot connect to server...!!! </div>

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        console.log('open')
        setAnchorEl(event.currentTarget);
    };
    
    const handlePopoverClose = () => {
        console.log('close')
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    return (
        <details key={id} 
            className='section' 
            open={isOpen} 
            onToggle={()=> setIsOpen(!isOpen)}
        >  
            <summary> 
                <span className='relative accordion'>
                    <h1 className="section-header"> 
                        {ge.id + '-' + ge.name}
                        <span className="badge"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                        >
                            4
                        </span>
                    </h1>
                    <div className="right-icon"> <Right/> </div>
                </span>
                <PopperUnstyled 
                    id="mouse-over-popover"
                    open={open}
                    anchorEl={anchorEl}
                >
                <div className="mouse-over-popover-before"/>
                    <div className='mouse-over-popover-body'>Hi</div>
                </PopperUnstyled>
            </summary>

            <div className='section-body'>
                <p style={{marginBottom: '1rem', textAlign: 'center', fontSize: '1.7rem'}}> <b>{ge.nameChild}</b> </p>
                {isOpen && detail}
            </div>
        </details>
    )
 }

 export default memo(AccordionGE);