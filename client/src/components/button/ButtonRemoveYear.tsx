import {useDispatch} from 'react-redux';
import { removeYear } from '../../features/StoreSlice';
import Remove from '../icon/Remove';
//import ReactTooltip from "react-tooltip";
import './ButtonRemoveYear.css';

interface RemoveYearProps {
    id: string;
    index: number;
}

function ButtonRemoveYear({id, index}: RemoveYearProps) {
    const dispatch = useDispatch();

    const handleOnclick = ( e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(removeYear({id: id, index: index}));
    }

    return ( 
    <button className="absolute remove-year-btn"
        onClick={handleOnclick}
        data-tip data-for={'removeYearTip' + index}
        aria-label='remove year'
    > 
        <Remove/> 
    {/*
        <ReactTooltip id={"removeYearTip" + index} place="top" effect="solid">
            Remove year
        </ReactTooltip>  */}
    </button>
    )

}

export default ButtonRemoveYear;