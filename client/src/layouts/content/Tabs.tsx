import {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../app/store';
import { fetchGE } from '../../features/FetchData';
import GeneralEducation from '../../components/tab/GeneralEducation';
import Major from '../../components/tab/Major';

function Tabs () {
  const [tabId, setTabId] = useState<number>(1); // Major-tabId === 1; GeneralEducation-tabId === 2 
  const dispatch = useDispatch();
  const status = useSelector((state:RootState)=>state.store.ge.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGE())
        }
    }, [status, dispatch])

  return (
    <div id="tab-container">
      <ul id="tab-panel" className="flex">
        <li 
          onClick={()=>setTabId(1)}
          className={'tab flex justify-center item-center round-top-left ' 
                    + (tabId === 1?"tab-active":"")} 
        >
           Major Requirement
        </li>
        <li 
          onClick={()=>setTabId(2)}
          className={'tab flex justify-center item-center round-top-right ' 
                    + (tabId === 2? "tab-active":"")} 
        >
          General Education
        </li>
      </ul>

      <div id="tab-body">
        {tabId === 1 && <Major/>}
        {tabId === 2 && <GeneralEducation/>}
      </div>

      {/** prevent x-scrollbar overlaying the border */}
      <div style={{height: '1rem'}}></div>
    </div>
  );
}

export default Tabs 