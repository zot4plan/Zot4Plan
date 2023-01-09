import { useState, MouseEvent } from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import ReactToPrint from 'react-to-print';
import ReactTooltip from "react-tooltip";
import ButtonAddYear from './addYear/ButtonAddYear';
import PopperClear from '../../../components/popper/PopperClear';
import PopperLoad from '../../../components/popper/PopperLoad';
import PopperSave from '../../../components/popper/PopperSave';
import PrerequisiteSwitch from './prerequisite/PrerequisiteSwitch';
import '../schedule/Schedule.css';
import './Toolbars.css'

interface ButtonsListProps {
    printContent: () => React.ReactInstance | null;
}

interface StateType {
    anchorEl: HTMLElement | null;
    id: string | null;
}

function Toolbars({ printContent }: ButtonsListProps) {
    const [element, setElement] = useState<StateType>({ anchorEl: null, id: null });
    const open = Boolean(element.anchorEl);
    const popperId = open ? "popper" : undefined;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const id = event.currentTarget.getAttribute("data-value");
        if (element.id === id || id === "cancel")
            setElement({ anchorEl: null, id: null })
        else
            setElement({ anchorEl: event.currentTarget, id: id });
    };

    const handleClickAway = () => {
        setElement({ anchorEl: null, id: element.id });
    };

    return (
        <>
            <ul className='home-toolbars'>
                <li> <ButtonAddYear /> </li>
                <li>
                    <button className="btn"
                        data-value="clear"
                        onClick={handleClick}
                        aria-label='remove all courses'> Clear </button>
                </li>
                <li>
                    <button className="btn disabled"
                        data-value="sample"
                        //onClick={handleClick} 
                        data-tip data-for='sample'
                        aria-label='remove all courses'> Sample </button>
                    <ReactTooltip
                        id='sample'
                        place="top"
                        type="info"
                        effect="solid"
                        className='coming-soon'
                    >
                        COMING SOON
                    </ReactTooltip>
                </li>
                <li>
                    <button className='btn'
                        data-value="save"
                        onClick={handleClick}
                        aria-label="Save Schedule"> Save </button>
                </li>
                <li>
                    <button className='btn'
                        data-value="load"
                        onClick={handleClick}
                        aria-label='Load Schedule'> Load </button>
                </li>
                <li>
                    <ReactToPrint
                        trigger={() => <button className="btn">Print</button>}
                        content={printContent}
                    />
                </li>
                <li style={{ display: 'flex' }}> <PrerequisiteSwitch /> </li>
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
                    {element.id === "clear" && <PopperClear handleClick={handleClick} />}
                    {element.id === "save" && <PopperSave />}
                    {element.id === "load" && <PopperLoad />}
                </PopperUnstyled>
            </ClickAwayListener>
        </>
    )
}

export default Toolbars;