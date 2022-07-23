import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';

function TotalUnits() {
    const units = useSelector((state:RootState)=> state.store.totalUnits);
    return (
        <p> {units} </p>
    )
}

export default TotalUnits;