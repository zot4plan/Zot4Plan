import {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../../app/store';

import { fetchGE } from '../../../api/FetchData';

import GeneralEducation from './generalEducation/GeneralEducation';
import Program from './program/Program';
import SelectProgram from './program/selects/SelectProgram';

import './Tabs.css';


function Tabs () {
  const [tab, setTab] = useState({id: 1, isMajor: true}); // Major: 1, minor: 2, GE: 3 
  const addedCourses = useSelector((state:RootState)=> state.store.addedCourses.sectionId);

  return (
    <div id="tab-container">
      <ul style={{display: "flex"}}>

        <li style={{ borderRight:'1px solid white' }}
          onClick={()=> setTab({id: 1, isMajor: true})}
          className={'tab flex-container round-top-left ' + (tab.id === 1?"active":"")} 
        >
           Major
        </li>

        <li style={ {borderRight:'1px solid white'} }
          onClick={()=>setTab({id: 2, isMajor: false})}
          className={'tab flex-container ' + (tab.id === 2?"active":"")} 
        >
           Minor
        </li>

        <li onClick={()=>setTab( prev => ({...prev, id: 3}) )}
          className={'tab flex-container round-top-right ' + (tab.id === 3?"active":"")} 
        >
          GE
        </li>
      </ul>

      <div style={{display: tab.id < 3? "block": "none"}}>
            <SelectProgram key="selectProgram" isMajor={tab.isMajor} />
            <Program key="program" isMajor={tab.isMajor} addedCourses={addedCourses}/>
      </div>

      <div style={{display: tab.id === 3? "block": "none"}}>
        <GeneralEducation/>
      </div>
    </div>
  );
}

export default Tabs;