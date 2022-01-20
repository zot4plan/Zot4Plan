import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select'

function SelectMajor() {
    const [majors, setMajors] = useState([]);
    useEffect(async () => {
        const res = await Axios('http://localhost:8080/api/getMajors');
        console.log(res.data);
        const majorsArray = await res.data.map(major =>({value: major.id, label: major.name}));
        setMajors(majorsArray);
    },[]);

    return (
        <Select className= 'mt-4' 
                options={majors}/>
    )
};

export default SelectMajor;