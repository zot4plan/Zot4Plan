import {memo} from 'react';
import {useDispatch} from 'react-redux';
import { addYear } from '../../features/StoreSlice';

function ButtonAddYear() {
    const dispatch = useDispatch();
    const addNewYear = ( e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(addYear());
    }

    return ( 
        <button className="btn-year" onClick={addNewYear}> 
            Add Year
        </button>
    )
}

export default memo(ButtonAddYear);