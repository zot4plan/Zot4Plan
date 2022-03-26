import {useState} from 'react';
import GETab from './GETab';
import MajorTab from './MajorTab';
import AddTab from './AddTab';

function RequirementTab () {
  const [tab, setTab] = useState<number>(1);

  return (
    <div style={{boxShadow: '0px 4px 4px 0px rgb(0 0 0 / 60%)', borderRadius: '15px'}}>
      <ul className="tab-panel">
        <li className={tab === 1?"tab tab-active":"tab"} onClick={()=>setTab(1)}>
          Major Requirement
        </li>
        <li className={tab === 2?"tab tab-active":"tab"} onClick={()=>setTab(2)}>
          General Education
        </li>
        <li className={tab === 3?'tab tab-active':'tab'} onClick={()=>setTab(3)}>
          + Courses
        </li>
      </ul>
      {tab === 1 && <MajorTab/>}
      {tab === 2 && <GETab/>}
      {tab === 3 && <AddTab/>}
    </div>
  );
}

export default RequirementTab 