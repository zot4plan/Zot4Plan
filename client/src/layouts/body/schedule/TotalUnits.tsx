import { useSelector } from 'react-redux';
import {RootState} from '../../../app/store';

const TotalUnits = () => {
    const units = useSelector((state:RootState)=> state.store.totalUnits);
    return (
      <p>{"Total units: " + units}</p>
    )
}

export default TotalUnits;