import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Header from '../../components/header/Header';
import VirtualCafeNavList from './navbar/VirtualCafeNavList';
import VirtualCafeGrid from './grid/VirtualCafeGrid';
import VirtualCafeToolbar from './toolbars/VirtualCafeToolbar';
import { updateVirtualCafeVisit } from '../../api/VirtualCafeController';
import './VirtualCafe.css';

function VirtualCafe() {
    const loading = useSelector((state: RootState) => state.virtualCafe.pageLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        if(loading === 'idle') {
            dispatch(updateVirtualCafeVisit());
        }
    },[loading, dispatch])

    return (
        <div className="virtual-cafe">
            <Header path='/virtual-cafe' heartColor='#FFF' NavList={VirtualCafeNavList}/>
            <VirtualCafeGrid/>
            <VirtualCafeToolbar/>
        </div>
    );
}

export default VirtualCafe;