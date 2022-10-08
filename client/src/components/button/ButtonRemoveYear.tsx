import {useDispatch} from 'react-redux';
import { removeYear } from '../../store/slices/CourseSlice';
import Remove from '../icon/Remove';
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
        <button 
            className="absolute remove-year-btn"
            onClick={handleOnclick}
            aria-label='remove year'
        > 
            <Remove/> 
        </button>
    )

}

export default ButtonRemoveYear;