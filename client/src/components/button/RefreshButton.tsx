import {memo} from 'react';
import {useDispatch} from 'react-redux';

import Refresh from '../icon/Refresh';
import {refreshState } from '../../features/StoreSlice';

import ReactTooltip from "react-tooltip";

function RefreshButton() {
    const dispatch = useDispatch();

    const refresh = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(refreshState());
    }

    return ( 
    <>
        <button id="refresh-btn" className="btn-secondary" 
            onClick={refresh}
            data-tip data-for='refreshTip'
            aria-label='remove all courses'
        >  
            <Refresh/> 
        </button>

        <ReactTooltip id="refreshTip" place="left" effect="solid">
            Remove all courses
        </ReactTooltip>
    </>
    )

}

export default memo(RefreshButton);