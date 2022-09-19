import { useDispatch, useSelector } from 'react-redux';
import { setIsPrerequisiteCheck } from '../../store/slices/StoreSlice';
import { RootState } from '../../store/store';
import Switch from './Switch';

function PrerequisiteCheckBox() {
    const label = "Prerequisite Check";    
    const isPrerequisiteCheck = useSelector((state: RootState) => state.store.isPrerequisiteCheck);
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