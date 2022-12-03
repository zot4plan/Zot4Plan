import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomeVisit } from '../controllers/HomeController';
import { updateVirtualCafeVisit } from '../controllers/VirtualCafeController';
import { RootState } from '../store/store';

interface IUpdateVistCountProps {
    page: string;
}
function UpdateVisitCount({page}:IUpdateVistCountProps) {
    const loading = useSelector((state: RootState) => {
        if(page === 'virtualCafe')
            return state.virtualCafe.pageLoading
        else
            return state.course.pageLoading
    });
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(loading === 'idle') {
            if(page === 'virtualCafe')
                dispatch(updateVirtualCafeVisit());
            else
                dispatch(updateHomeVisit());
        }
    });

    return (
        <></>
    );
}

export default UpdateVisitCount;
