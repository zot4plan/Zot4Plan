import { useSelector } from 'react-redux';
import {RootState} from '../../../app/store';

const PrintPrograms = () => {
    const selectedPrograms = useSelector((state:RootState)=> state.programs.selectedPrograms);
    return (
        <div className="printPrograms" style={{display: 'none'}}>
            <p><b>{"Majors: " + selectedPrograms[1].map(major => major.label).join(' & ')}</b></p>
            <p><b>{"Minors: " + selectedPrograms[0].map(minor => minor.label).join(' & ')}</b></p>
        </div>
    )
}

export default PrintPrograms;