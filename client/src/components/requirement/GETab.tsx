import {useEffect, useState, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Select, { StylesConfig } from 'react-select';
import Axios from 'axios';

import {RootState} from '../../app/store';
import {fetchGECategories} from '../../features/FetchData';
import {addCourseGE} from '../../features/StoreSlice';
import Section from './Section';
import Add from '../icons/Add';
import Error from '../icons/Error';
import Success from '../icons/Success';

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
    const [ge, setGE] = useState({index: -1, courses: []});
    const [course, setCourse] = useState<OptionType2>({value:"", label: "Choose course"});
    const [message, setMessage] = useState({content: "", status: 'idle'});

    const all_ge_ids = useSelector((state:RootState) => state.store.ge.geIds);
    const courses_in_current_ge = useSelector((state:RootState) => {
        const droppableId = state.store.ge.droppableIds[ge.index];
        return droppableId? state.store.ge.byIds[droppableId].courses : [];
    });

    const dispatch = useDispatch();

    const handleOnGEChange = async (option: OptionType1| null) => {
        if(option) {
            setTimeout(() => {
            Axios.get('http://localhost:8080/api/getGECourses',{params: {id: option.label}})
                .then((res) => {
                    setGE({
                        index: option.value, 
                        courses: res.data.map(
                            (course:{courseId: string}) => ({value: course.courseId, label: course.courseId}))
                    });
                })
                .catch( () => {
                    setGE({index: -1, courses: []});
                });
            }, 500);
        }
        else 
            setGE({index: -1, courses: []});
        setCourse({value: "", label: "Choose course"});
    }

    const handleOnCourseChange = async (option: OptionType2| null) => {
        if(option) 
            setCourse({value: option.value, label: option.label});
        else 
            setCourse({value: "", label: "Choose course"});
    }

    const submitCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if(course.value !== "") {
            if(!courses_in_current_ge.includes(course.value)) {
                setTimeout(() => {
                    Axios.get('http://localhost:8080/api/getCourseById', {params: {id: course.value}})
                        .then((res) => {
                            if(res.data.message === 'succeed') {
                                dispatch(addCourseGE({course: res.data.data, index: ge.index})); 
                                setMessage({content: course.value + ' is added successfully!', status: 'succeed'});
                            }
                            else
                                setMessage({content:'Cannot connect to server!', status: 'fail'});
                    });
                }, 500); 
            }
            else
                setMessage({content: course.value + ' has already been added!', status: 'fail'});
        }
        else if(ge.index === -1)
            setMessage({content: 'Please select a GE category!', status: 'fail'});
        else
            setMessage({content: 'Please select a course!', status: 'fail'});
    };

    return (
        <div className='flex flex-column justify-center item-center m-1'>
            <div className='relative h-36 w-270'> 
                <Select
                    components={{IndicatorSeparator:() => null }}
                    styles={GEBarStyle}
                    options={all_ge_ids.map((id, index) => ({label: id, value: index}))} 
                    onChange={handleOnGEChange}
                    maxMenuHeight={200}
                    placeholder='GE'              
                />
                <Select
                    components={{ DropdownIndicator:() => null}}
                    options={ge.courses} 
                    styles={CourseBarStyle}
                    value={course}
                    maxMenuHeight={250}
                    onChange={handleOnCourseChange}
                />
                <button className='add-btn' onClick={submitCourse}> <Add/> </button>
            </div>
            <div className={'relative h-16 w-270 '+ (message.status !== 'idle'? 'fade-message':'')}  
                 onAnimationEnd={() => setMessage({content:"", status: 'idle'})}>
                {message.status != 'idle' && 
                <p className={'m-0 sz-1 pat-0 pal ' 
                    + (message.status === 'succeed'? 'cl-green': 'cl-red')}> 
                    <span className='absolute m-icon'> 
                        {message.status === 'succeed' && <Success/>}
                        {message.status === 'fail' && <Error/>}
                    </span>
                    {message.content}
                </p>}
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