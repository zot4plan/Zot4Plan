import {SetStateAction, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store'
import {fetchGECategories} from '../../features/FetchData'
import DroppableArea from './DroppableArea';
import Right from '../icons/Right';

import Axios from 'axios'
import Select from 'react-select';

interface GESectionType {
    droppableId: string
}

interface SelectCoursesType {
    geId: string;
}

interface OptionType {
    value: string;
    label: string;
}

const SelectCourses = ({geId}:SelectCoursesType) => {
    const [courses, setCourses] = useState([]);
    console.log(geId);

    return (
        <Select 
                options={courses.map( id=> ({label: id, value: id}) )} 
                className=''
                placeholder="Choose course"
        />
    )
}

const SelectGEs = () => {
    const geIds = useSelector((state:RootState)=>state.store.ge.geIds);
   // const [option, setOption] = useState("");
    const [courses, setCourses] = useState([]);

    const handleOnChange = async (option: OptionType| null) => {
        if(option) {
            console.log(option);
            setTimeout(() => {
            Axios
                .get('http://localhost:8080/api/getGECourses', 
                    {params: { id: option.label }})
                .then((res) => {
                    console.log(res.data);
                    const coursesArray = res.data.map( (course:{courseId : string}) =>({value: course.courseId, label: course.courseId}));
                    setCourses(coursesArray);
                })
                .catch(err => {
                    setCourses([]);
                });
            }, 500);
        }
        else {
            setCourses([]);
        }
    }

    return (
        <div>
            <Select 
                options={geIds.map( id=> ({label: id, value: id}) )} 
                className=''
                placeholder="Select GE"
                onChange={handleOnChange}
            />
            <Select 
                options={courses} 
                className=''
                placeholder="Choose course"
            />
        </div>
    )
}

const GESection = ({droppableId}:GESectionType) => {
    const ge = useSelector((state:RootState)=>state.store.ge.byIds[droppableId]);
    const [show, setShow] = useState(false);
    return (
        <div className='section-wrapper'>  
            <div
                key={droppableId} 
                className='accordion' 
                onClick={() => setShow(!show)}>
                <h1 className="section-header">{ge.geId + ": " + ge.name}</h1>
                <div className="rightIcon">
                    <Right show={show}/>
                </div>
            </div>
            <div style={{display: show? "block" : "none"}}>
                <DroppableArea key={droppableId} courseIds={ge.courses} droppableId={droppableId}/>
            </div>
        </div>
    )
}

function GETab () {
    const dispatch = useDispatch()
    const droppableIds = useSelector((state:RootState)=>state.store.ge.droppableIds);
    const status = useSelector((state:RootState)=>state.store.ge.status);
    const error = useSelector((state:RootState)=>state.store.ge.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGECategories())
        }
    }, [status, dispatch])

    let content

    if (status === 'loading') 
        content = <p>Loading....</p> 
   
    else if (status === 'succeeded') {
        content = droppableIds.map((id) => (
           <GESection key={id} droppableId={id}/>
        ))
    } 
    else if (status === 'failed') 
        content = <div>{error}</div>
    
  
    return (
        <div className="tab-container"  >
            <SelectGEs/>
           {content}
        </div>
    )
}

export default GETab