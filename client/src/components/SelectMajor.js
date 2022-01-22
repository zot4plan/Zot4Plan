import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, memo} from 'react';
import Axios from 'axios';
import Select from 'react-select'

function SelectMajor({onSelect}) {
    console.log("Select Major component");
    const [majors, setMajors] = useState([]);
    useEffect( () => {
        async function fetchMajors() {
            const res = await Axios('http://localhost:8080/api/getMajors');
            const majorsArray = await res.data.map(major =>({value: major.id, label: major.name}));
            setMajors(majorsArray);
        }
        fetchMajors();
    },[]);


    return (
        <Select className='mt-4' 
                isClearable="true"
                options={majors}
                onChange={onSelect}/>
    )
};

export default memo(SelectMajor);