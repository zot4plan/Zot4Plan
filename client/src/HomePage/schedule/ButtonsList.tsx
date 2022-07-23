import { useState, MouseEvent } from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import ReactToPrint from 'react-to-print';
import ButtonAddYear from '../../components/button/ButtonAddYear';
import PopperClear from '../../components/popper/PopperClear';
import PopperLoad from '../../components/popper/PopperLoad';
import PopperSave from '../../components/popper/PopperSave';
import './Schedule.css';

interface ButtonsListProps {
    printContent: () => React.ReactInstance | null;
}

interface StateType {
    anchorEl: HTMLElement | null;
    id: string | null;
}

function ButtonsList({printContent}: ButtonsListProps) {
    const [element, setElement] = useState<StateType>({anchorEl: null, id: null});
    const open = Boolean(element.anchorEl);
    const popperId = open ? "popper" : undefined;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const id = event.currentTarget.getAttribute("data-value");
        if(element.id === id || id === "cancel")
            setElement({anchorEl: null, id: null})
        else 
            setElement({anchorEl: event.currentTarget, id: id});
    };  

    const handleClickAway = () => {
        setElement({anchorEl: null, id: element.id});
    };  

    return (
    <>
        <ul style={{justifyContent: 'space-between', margin: '1rem 0.5rem 1rem 1rem'}}>
            <li> 
                <ul style={{justifyContent: 'end'}}>
                    <li className="margin-right-1"> 
                        <ButtonAddYear/> 
                    </li>

                    <li className="margin-right-1">  
                        <button className="btn" 
                            data-value="clear"
                            onClick={handleClick} 
                            aria-label='remove all courses'
                        >  
                            Clear
                        </button> 
                    </li>    
                </ul>     
            </li>

            <li>
                <ul>
                    <li className="margin-right-1 flex-container"> 
                        <button className='btn margin-right-1' 
                            data-value="save"
                            aria-label="Save Schedule"
                            onClick={handleClick}
                        > 
                            Save 
                        </button> 

                        <button className='btn' 
                            data-value="load"
                            aria-label='Load Schedule'
                            onClick={handleClick}
                        > 
                            Load 
                        </button>
                    </li>
                    <li> 
                        <ReactToPrint 
                            trigger={() => <button className="btn">Print</button>}
                            content={printContent}
                        />
                    </li>
                </ul>
            </li>
        </ul>   

        <ClickAwayListener 
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
        >
            <PopperUnstyled 
                id={popperId} 
                open={open} 
                anchorEl={element.anchorEl}
            >
                {element.id === "clear" && <PopperClear handleClick={handleClick}/>}
                {element.id === "save" && <PopperSave/>}
                {element.id === "load" && <PopperLoad/>}
            </PopperUnstyled>
        </ClickAwayListener> 
    </>         
    )
}

export default ButtonsList;