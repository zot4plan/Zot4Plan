import {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../../app/store';

import { fetchGE } from '../../../api/FetchData';

import GeneralEducation from './generalEducation/GeneralEducation';
import Program from './program/Program';

import './Tabs.css';


function Tabs () {
  const [tabId, setTabId] = useState<number>(1); // Major: 1, minor: 2, GE: 3 
  const status = useSelector((state:RootState)=>state.store.ge.status);
  const dispatch = useDispatch();

/*  useEffect(() => {
      if (status === 'idle') 
          dispatch(fetchGE());
  }, [status, dispatch]) */

  return (
    <div id="tab-container">
      <ul style={{display: "flex"}}>

        <li style={{ borderRight:'1px solid white' }}
          onClick={()=> setTabId(1)}
          className={'tab flex-container round-top-left ' + (tabId === 1?"active":"")} 
        >
           Major
        </li>

        <li style={ {borderRight:'1px solid white'} }
          onClick={()=>setTabId(2)}
          className={'tab flex-container ' + (tabId === 2?"active":"")} 
        >
           Minor
        </li>

        <li 
          onClick={()=>setTabId(3)}
          className={'tab flex-container round-top-right ' + (tabId === 3?"active":"")} 
        >
          GE
        </li>
      </ul>

      <div style={{display: tabId === 1? "block": "none"}}>
        <Program key="major" isMajor={true}/>
      </div>

      <div style={{display: tabId === 2? "block": "none"}}>
        <Program key="minor" isMajor={false}/>
      </div>

      <div style={{display: tabId === 3? "block": "none"}}>
        <GeneralEducation/>
      </div>
    </div>
  );
}

export default Tabs;