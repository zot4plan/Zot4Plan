import { useSelector } from 'react-redux';
import {RootState} from '../../../app/store';

const TotalUnits = () => {
    const units = useSelector((state:RootState)=> state.store.totalUnits);

    return (
      <div>
        <p> Total Units:</p>
        <p> {units} </p>
      </div>
    )
}

export default TotalUnits;