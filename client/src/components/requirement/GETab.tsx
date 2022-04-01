import {useEffect, useState, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store'
import {fetchGECategories} from '../../features/FetchData'
import Section from './Section';

import Axios from 'axios'
import Select, { StylesConfig } from 'react-select';
import AddIcon from '../icons/Add'
import {addCourseGE} from '../../features/StoreSlice';

interface GESectionType { droppableId: string; }

interface OptionType1 {
    value: number;
    label: string;
}

interface OptionType2 {
    value: string;
    lablel: string;
}

const GEBarStyle: StylesConfig<OptionType1, false> =  {
    menu: (provided) => {
        return {
            ...provided, 
            width: '65px'
        };
    },

    control: (provided) => {
        return {
            ...provided, 
            width: '65px'
        };
    },

    valueContainer: (provided, state) => {
        return {
            ...provided, 
            padding: '2px 4px'
        };
    },

    dropdownIndicator: (provided, state) => {
        return {
            ...provided, 
            padding: '2px'
        };
    }
}

const CourseBarStyle: StylesConfig<OptionType2, false> =  {
    container: (provided) => {
        return {
            ...provided, 
            marginLeft: '0.5rem'
        };
    },
    menu: (provided) => {
        return {
            ...provided, 
            width: '170px'
        };
    },

    control: (provided) => {
        return {
            ...provided, 
            width: '170px'
        };
    },

    valueContainer: (provided, state) => {
        return {
            ...provided, 
            padding: '2px 4px'
        };
    },
    dropdownIndicator: (provided, state) => {
        return {
            ...provided, 
            padding: '2px'
        };
    }
}

const GeSelectBar = () => {
    const geIds = useSelector((state:RootState)=>state.store.ge.geIds);
    const [geIndex, setGeIndex] = useState<number>(-1);
    const [courseId, setCourseId] = useState<number | string>("");
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();

    const handleOnChange = async (option: OptionType1| null) => {
        if(option) {
            console.log(option);
            setTimeout(() => {
            Axios
                .get('http://localhost:8080/api/getGECourses', 
                    {params: { id: option.label }})
                .then((res) => {
                    console.log(res.data);
                    const coursesArray = res.data.map( (course:{courseId : string}) =>({value: course.courseId, label: course.courseId}));
                    setGeIndex(option.value);
                    setCourses(coursesArray);
                })
                .catch(err => {
                    setCourses([]);
                });
            }, 500);
        }
        else {
            setGeIndex(-1);
            setCourses([]);
        }
    }

    const handleOnAddCourse = async (option: OptionType2| null) => {
        if(option) 
            setCourseId(option.value);
        else 
           setCourseId("");
    }

    const submitAddCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setTimeout(() => {
            Axios.get('http://localhost:8080/api/getCourseById', {
                params: { id: courseId } } ).then((res) => {
                    console.log(res);
                    if(res.data.message === 'success') {
                        console.log(res.data);
                        dispatch(addCourseGE({course: res.data.data, GEIndex: geIndex}));
                    }
            });
        }, 500); 
    };

    return (
        <div 
            className={'flex justify-center m-1'}
            >
            <Select
                styles={GEBarStyle}
                options={geIds.map( (id,index) => ({label: id, value: index}))} 
                onChange={handleOnChange}
                placeholder='GE'              
            />
            <Select
                isClearable={true} 
                options={courses} 
                styles={CourseBarStyle}
                placeholder="Choose course"
                onChange={handleOnAddCourse}
            />
            <button className='add-btn' onClick={submitAddCourse}> <AddIcon/> </button>
        </div>
    )
}

const GESection = ({droppableId}:GESectionType) => {
    const ge = useSelector((state:RootState)=>state.store.ge.byIds[droppableId]);
    return (
        <Section id={droppableId} name={ge.geId + ": " + ge.name} list={ge.courses}/>
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
            <GeSelectBar/>
            {content}
        </div>
    )
}

export default GETab