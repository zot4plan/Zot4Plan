import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';

const PrintPrograms = () => {
    const selectedPrograms = useSelector((state:RootState)=> state.programs.selectedPrograms);
    return (
        <div className="print-programs">
            {selectedPrograms[1].length > 0 
                && <p><b>{"Majors: " + selectedPrograms[1].map(major => major.label).join(' & ')}</b></p>}

            {selectedPrograms[0].length > 0 
                && <p><b>{"Minors: " + selectedPrograms[0].map(minor => minor.label).join(' & ')}</b></p>}
        </div>
    )
}

export default PrintPrograms;