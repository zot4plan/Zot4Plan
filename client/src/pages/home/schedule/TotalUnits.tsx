import { useSelector } from 'react-redux';
import {RootState} from '../../../store/store';

interface TotalUnitsProps {
    className: string
}

function TotalUnits({className}: TotalUnitsProps) {
    const units = useSelector((state:RootState)=> state.store.totalUnits);
    return (
        <div className={className}> 
            <p> Total Units:</p>
            <p> {units} </p>
        </div>
    )
}

export default TotalUnits;