import { useSelector } from 'react-redux';
import {RootState} from '../../../app/store';

const TotalUnits = () => {
    const units = useSelector((state:RootState)=> state.store.totalUnits);
    return (
      <div>
        <p style={{marginBottom: "0.5rem", fontSize:'14px'}}>{"Total Units:"}</p>
        <p> {units} </p>
      </div>
    )
}

export default TotalUnits;