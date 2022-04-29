import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';

const TotalUnits = () => {
    const units = useSelector((state:RootState)=> state.store.years.totalUnits);
    return (
      <p id="total-units">{"Total units: " + units}</p>
    )
}

export default TotalUnits;