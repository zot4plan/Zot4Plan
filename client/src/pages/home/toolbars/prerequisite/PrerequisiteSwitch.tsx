import { useDispatch, useSelector } from 'react-redux';
import { setIsPrerequisiteCheck } from '../../../../store/slices/CourseSlice';
import { RootState } from '../../../../store/store';
import Switch from '../../../../components/switch/Switch';

function PrerequisiteCheckBox() {
    const label = "Prerequisite Check";    
    const isPrerequisiteCheck = useSelector((state: RootState) => state.course.isPrerequisiteCheck);
    const dispatch = useDispatch();
    const handleChange = () => {
        dispatch(setIsPrerequisiteCheck());
    };

    return ( 
        <Switch 
            label={label} 
            isToggle={isPrerequisiteCheck} 
            handleChange={handleChange} 
        />
    )
}

export default PrerequisiteCheckBox;