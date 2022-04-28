import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';

const TotalUnits = () => {
    const units = useSelector((state:RootState)=> state.store.years.totalUnits);
    return (
      <p style={{fontSize: '2rem'}}>{"Total units: " + units}</p>
    )
}

export default TotalUnits;