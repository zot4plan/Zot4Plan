import {useSelector, useDispatch} from 'react-redux';
import Select, { StylesConfig } from 'react-select';
import Axios from 'axios';
import {useState, MouseEvent } from 'react'
import Add from '../icons/Add';
import Error from '../icons/Error';
import Success from '../icons/Success';
import {RootState} from '../../app/store';
import {addCourse} from '../../features/StoreSlice';

interface OptionType {
    value: string;
    label: string;
}

const GEBarStyle: StylesConfig<OptionType, false> =  {
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

const CourseBarStyle: StylesConfig<OptionType, false> =  {
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

const BrowseCourseByGE = () => {
    const [ge, setGE] = useState({id: "", courses: []});
    const [course, setCourse] = useState({value:"", label: "Choose course"});
    const [message, setMessage] = useState({content: "", status: 'idle'});

    const geIds = useSelector((state:RootState) => state.store.ge.allGeIds);
    const [sectionCourses, sectionId] = useSelector((state:RootState) => {
        if(ge.id === "")
            return [[], ""]
        else {
            let sectionId = state.store.ge.byIds[ge.id].sectionId;
            return [state.store.sectionCourses[sectionId], sectionId]
        }

    });
    const dispatch = useDispatch();

    const handleOnGEChange = async (option: OptionType| null) => {
        if(option) {
            setTimeout(() => {
            Axios.get('http://localhost:8080/api/getGECourses',{params: {id: option.label}})
                .then((res) => {
                    setGE({
                        id: option.value, 
                        courses: res.data.map(
                            (course:{courseId: string}) => ({value: course.courseId, label: course.courseId}))
                    });
                })
                .catch( () => {
                    setGE({id: "", courses: []});
                });
            }, 500);
        }
        else 
            setGE({id: "", courses: []});
        setCourse({value: "", label: "Choose course"});
    }

    const handleOnCourseChange = async (option: OptionType| null) => {
        if(option) 
            setCourse({value: option.value, label: option.label});
        else 
            setCourse({value: "", label: "Choose course"});
    }

    const submitCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if(course.value !== "") {
            if(!sectionCourses.includes(course.value)) {
                setTimeout(() => {
                    Axios.get('http://localhost:8080/api/getCourseById', {params: {id: course.value}})
                        .then((res) => {
                            if(res.data.message === 'succeed') {
                                dispatch(addCourse({course: res.data.data, id: sectionId as string})); 
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
        else if(ge.id === "")
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
                    options={geIds.map((id) => ({label: id, value: id}))} 
                    onChange={handleOnGEChange}
                    maxMenuHeight={200}
                    placeholder='GE'              
                />
                <Select
                    components={{ DropdownIndicator:() => null}}
                    options={ge.courses} 
                    styles={CourseBarStyle}
                    isOptionDisabled={(option) => sectionCourses.includes(option.label)}
                    value={course}
                    maxMenuHeight={250}
                    onChange={handleOnCourseChange}
                />
                <button className='add-btn' onClick={submitCourse}> <Add/> </button>
            </div>
            <div className={'relative h-16 w-270 '
                            +(message.status !== 'idle'? 'fade-message' : '')}  
                onAnimationEnd={() => setMessage({content:"", status: 'idle'})}
            >
                {message.status != 'idle' && 
                <p className={'m-0 sz-1 pat-0 pal ' 
                    + (message.status === 'succeed'? 'cl-green': 'cl-red')}
                > 
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

export default BrowseCourseByGE;