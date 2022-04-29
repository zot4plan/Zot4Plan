import {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../app/store';
import { fetchGE } from '../../api/FetchData';
import GeneralEducation from '../../components/tab/GeneralEducation';
import Major from '../../components/tab/Major';

function Tabs () {
  const [tabId, setTabId] = useState<number>(1); // Major tabId === 1; GeneralEducation tabId === 2 
  const status = useSelector((state:RootState)=>state.store.ge.status);
  const dispatch = useDispatch();

  useEffect(() => {
      if (status === 'idle') 
          dispatch(fetchGE());
  }, [status, dispatch])

  return (
    <div id="tab-container">
      <ul id="tab-panel" className="flex">
        <li 
          onClick={()=>setTabId(1)}
          className={'tab flex-container round-top-left ' + (tabId === 1?"tab-active":"")} 
        >
           Major Requirement
        </li>

        <li 
          onClick={()=>setTabId(2)}
          className={'tab flex-container round-top-right ' + (tabId === 2?"tab-active":"")} 
        >
          General Education
        </li>
      </ul>

      <div id="tab-content">
        <div style={{display: tabId === 1? "block": "none"}}>
          <Major/>
        </div>

        <div style={{display: tabId === 2? "block": "none"}}>
          <GeneralEducation/>
        </div>
      
        <div style={{height:'48rem'}}></div>
      </div>

    </div>
  );
}

export default Tabs;