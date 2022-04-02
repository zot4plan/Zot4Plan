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
    label: string;
}

const GEBarStyle: StylesConfig<OptionType1, false> =  {
    container: (provided) => {
        return {...provided, display:'inline-block', marginRight:'0.3rem'};
    },
    menu: (provided) => {
        return {...provided, width: '63px'};
    },
    control: (provided) => {
        return {...provided, width: '63px', borderRadius: '18px'};
    },
    placeholder: (provided) => {
        return {...provided, color: '#1F1F1F'}
    },
    valueContainer: (provided, state) => {
        return {...provided, padding: '0px 0px 0px 8px'};
    },
    input: (provided) => {
        return {...provided, margin: '0', padding:'0'};
    },
    dropdownIndicator: (provided, state) => {
        return {...provided, padding: '0px', marginRight: '5px'
        };
    }
}

const CourseBarStyle: StylesConfig<OptionType2, false> =  {
    container: (provided) => {
        return {...provided, display:'inline-block'};
    },
    menu: (provided) => {
        return {...provided, width: '204px'};
    },

    control: (provided) => {
        return {...provided, width: '204px',  borderRadius: '18px'};
    },

    valueContainer: (provided) => {
        return {...provided, cursor: 'text'};
    },
    indicatorsContainer: (provided)=> {
        return {...provided, marginRight: '3.8rem'};
    },
}

const GeSelectBar = () => {
    const geIds = useSelector((state:RootState)=>state.store.ge.geIds);
    const [geIndex, setGeIndex] = useState<number>(-1);
    const [selectCourse, setSelectCourse] = useState<OptionType2>({value:"", label: "Choose course"});
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();

    const handleOnChange = async (option: OptionType1| null) => {
        setSelectCourse({value:"", label:"Choose course"})
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
            setSelectCourse({value: option.value, label: option.label});
        else 
           setSelectCourse({value: "", label: "Choose course"});
    }

    const submitAddCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if(selectCourse.value !== "") 
            setTimeout(() => {
                Axios.get('http://localhost:8080/api/getCourseById', {
                    params: { id: selectCourse.value } } ).then((res) => {
                        console.log(res);
                        if(res.data.message === 'success') {
                            console.log(res.data);
                            dispatch(addCourseGE({course: res.data.data, GEIndex: geIndex}));

                        }
                });
            }, 500); 
    };

    return (
        <div className='flex justify-center m-1'>
            <div className='relative h-36 w-270'> 
            <Select
                components={{IndicatorSeparator:() => null }}
                styles={GEBarStyle}
                options={geIds.map( (id,index) => ({label: id, value: index}))} 
                onChange={handleOnChange}
                maxMenuHeight={200}
                placeholder='GE'              
            />
            <Select
                components={{ DropdownIndicator:() => null}}
                options={courses} 
                styles={CourseBarStyle}
                value={selectCourse}
                maxMenuHeight={250}
                onChange={handleOnAddCourse}
            />
            <button className='add-btn' onClick={submitAddCourse}> <AddIcon/> </button>
            </div>
        </div>
    )
}

const GESection = ({droppableId}:GESectionType) => {
    const ge = useSelector((state:RootState)=>state.store.ge.byIds[droppableId]);
    return (
        <Section id={droppableId} name={ge.geId + ": " + ge.name} note={ge.note} list={ge.courses}/>
    )
}

function GETab () {
    const dispatch = useDispatch()
    const droppableIds = useSelector((state:RootState)=>state.store.ge.droppableIds);
    const status = useSelector((state:RootState)=>state.store.ge.status);
    //const error = useSelector((state:RootState)=>state.store.ge.error);

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
        content = <div>cannot connect to server!</div>
    
  
    return (
        <div className="tab-container"  >
            <GeSelectBar/>
            {content}
        </div>
    )
}

export default GETab