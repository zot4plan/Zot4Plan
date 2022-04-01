import { useState, useEffect, memo } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import {fetchMajor} from '../../features/FetchData'

interface OptionType {
    value: number;
    label: string;
}

interface data {
    id: string;
    name: string;
}

function SelectMajor() {
    console.log("Select Major component");
    const [majors, setMajors] = useState([]);
   // const [option, setOption] = useState<string> ("");
   // const [status, setStatus] = useState<string> ("idle");
    const dispatch = useDispatch();

    useEffect( () => {
            async function fetchMajors() {
                const res = await Axios('http://localhost:8080/api/getMajors');
                const majorsArray = await res.data.map( (major:data) =>({value: major.id, label: major.name}));
                setMajors(majorsArray);
            }
            fetchMajors();
    },[]); 

    const handleOnChange = async (option: OptionType | null) => {
        if(option){
            try {
            //    setStatus('pending')
                await dispatch(fetchMajor({id: option.value}));
            //    setOption(option.label);
            }
            catch (err) {
                console.error('Failed to save the post: ', err)
            } 
            //finally {
            ///    setStatus('idle')
           // }
        }
    //    else
    //       setOption("");
    }


    return (
        <Select 
                isClearable={true}
                options={majors} 
                className='black mr-1'
                placeholder="Select major"
                onChange={handleOnChange}
                aria-label="Select major"
        />
    )
};

export default memo(SelectMajor);