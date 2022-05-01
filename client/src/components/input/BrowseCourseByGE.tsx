import {useSelector, useDispatch} from 'react-redux';
import Select, { StylesConfig } from 'react-select';
import Axios from '../../api/Axios';
import {useState, memo, MouseEvent } from 'react'
import AddIcon from '../icon/AddIcon';
import Error from '../icon/Error';
import Success from '../icon/Success';
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
    valueContainer: (provided) => {
        return {...provided, padding: '0px 0px 0px 8px'};
    },
    input: (provided) => {
        return {...provided, margin: '0', padding:'0'};
    },
    dropdownIndicator: (provided) => {
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

    const dispatch = useDispatch();
    const geIds = useSelector((state:RootState) => state.store.ge.allGeIds);
    
    //Get all courses in selected GE category that have been added
    const [sectionCourses, sectionId] = useSelector((state:RootState) => {
        if(ge.id === "")
            return [[], ""];
        
        let sectionId = state.store.ge.byIds[ge.id].sectionId,
            sectionCourses = state.store.sectionCourses[sectionId];

        return [sectionCourses, sectionId];
    });

    const handleOnCourseChange = async (option: OptionType| null) => {
        if(option) 
            setCourse({value: option.value, label: option.label});
        else 
            setCourse({value: "", label: "Choose course"});
    }

    //Retrieve all courses in selected GE category
    const handleOnGEChange = async (option: OptionType| null) => {
        if(option) 
            setTimeout(() => {
                Axios.post('/api/getCoursesByGE', {id: option.label})
                .then((res) => {
                    setGE({
                        id: option.value, 
                        courses: res.data.map(
                            (course:{courseId: string}) => ({value: course.courseId, label: course.courseId}))
                    });
                })
                .catch( () => { setGE({id: "", courses:[]}) });
            }, 500);
        
        else 
            setGE({id: "", courses: []});
            
        setCourse({value: "", label: "Choose course"});
    }

    // If added course is valid, retrieve course data and add it to redux store
    const submitCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if(course.value !== "") {
            if(!sectionCourses.includes(course.value)) 
                setTimeout(() => {
                    Axios.post('/api/getCourseById', {id: course.value})
                    .then((res) => {
                        if(res.data.message === 'succeed') {
                            dispatch(addCourse({course: res.data.data, id: sectionId as string})); 
                            setMessage({content: course.value + ' is added successfully!', status: 'succeed'});
                        }
                        else
                            setMessage({content:'Cannot connect to server!', status: 'fail'});
                    });
                }, 500); 
            
            else
                setMessage({content: course.value + ' has already been added!', status: 'fail'});
        }

        else if(ge.id === "")
            setMessage({content: 'Please select a GE category!', status: 'fail'});

        else
            setMessage({content: 'Please select a course!', status: 'fail'});
    };

    return (
        <div className="input-container flex-container">
            <div className='relative browse-container'> 
                <Select
                    components={{IndicatorSeparator:() => null }}
                    options={geIds.map((id) => ({label: id, value: id}))} 
                    styles={GEBarStyle}
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
                <button className='absolute add-course-btn' onClick={submitCourse}> 
                    <AddIcon/> 
                </button>
            </div>
            
            <div 
                className={'message-container relative '+ (message.status !== 'idle'? 'fade-message' : '')}  
                onAnimationEnd={() => setMessage({content:"", status: 'idle'})}
            >
                {message.status !== 'idle' && 
                <p className={'message ' + (message.status === 'succeed'? 'green': 'red')}> 
                    <span className='absolute message-icon'> 
                        {message.status === 'succeed' && <Success/>}
                        {message.status === 'fail' && <Error/>}
                    </span>
                    {message.content}
                </p>}
            </div>
        </div>
    )
}

export default memo(BrowseCourseByGE);