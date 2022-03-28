import {useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store'
import {fetchGECategories} from '../../features/FetchData'
import DroppableArea from './DroppableArea';
import Right from '../icons/Right';

import Axios from 'axios'
import Select, { StylesConfig } from 'react-select';
import AddIcon from '../icons/Add'

interface GESectionType {
    droppableId: string
}

interface OptionType {
    value: number | string;
    label: string;
}

const GEBarStyle: StylesConfig<OptionType, false> =  {
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

const CourseBarStyle: StylesConfig<OptionType, false> =  {
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
    const [geIndex, setGeIndex] = useState<number | string>(-1);
    const [courseId, setCourseId] = useState<number | string>("");
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

    const handleOnAddCourse = async (option: OptionType| null) => {
        if(option) 
            setCourseId(option.value);
        else 
           setCourseId("");
    }



    return (
        <div 
            style= {{
                display: 'flex',
                justifyContent: 'center',
                margin: '0rem 1rem 1rem 1rem'
            }}>
            <Select
                styles={GEBarStyle}
                options={geIds.map( (id,index) => ({label: id, value: index}))} 
                onChange={handleOnChange}
                placeholder='GE'              
            />
            <Select 
                options={courses} 
                styles={CourseBarStyle}
                placeholder="Choose course"
                onChange={handleOnAddCourse}
            />
            <button className='add-btn'> <AddIcon/> </button>
        </div>
    )
}

const GESection = ({droppableId}:GESectionType) => {
    const ge = useSelector((state:RootState)=>state.store.ge.byIds[droppableId]);
    const [show, setShow] = useState(false);
    return (
        <div className='accordion-wrapper m-1 mt-0'>  
            <div
                key={droppableId} 
                className={show? 'accordion': 'accordion closed'}
                onClick={() => setShow(!show)}>
                <h1 className="accordion-header">{ge.geId + ": " + ge.name}</h1>
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
            <GeSelectBar/>
            {content}
        </div>
    )
}

export default GETab