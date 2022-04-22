import {useDispatch} from 'react-redux';

import {removeYear} from '../../features/StoreSlice';
import Remove from '../icon/Remove';
import ReactTooltip from "react-tooltip";

interface RemoveYearType {
    id: string;
    index: number;
}
function RemoveYearButton({id, index}: RemoveYearType) {
    const dispatch = useDispatch();

    const handleOnclick = ( e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(removeYear({id: id, index: index}));
    }

    return ( 
    <>
        <button id="remove-btn"
            onClick={handleOnclick}
            data-tip data-for='removeYearTip'
        > 
            <Remove/> 
        </button>

        <ReactTooltip id="removeYearTip" place="top" effect="solid">
            remove year
        </ReactTooltip>
    </>
    )

}

export default RemoveYearButton;