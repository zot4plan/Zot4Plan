import {useState} from 'react';
import GETab from './GETab';
import MajorTab from './MajorTab';

function Tabs () {
  const [tab, setTab] = useState<boolean>(true);

  return (
    <>
      <ul className="flex tab-panel m-0">
        <li className={'flex justify-center item-center tab round-top-left bd-r-wh ' 
            + (tab?"tab-active":"bg-grey")} 
            onClick={()=>setTab(!tab)}>
              Major Requirement
        </li>
        <li className={'flex justify-center item-center tab round-top-right ' 
            + (!tab?"tab-active":"bg-grey")} 
            onClick={()=>setTab(!tab)}>
              General Education
        </li>
       
      </ul>

      {tab  && <MajorTab/>}
      {!tab && <GETab/>}

      <div style={{height: '1rem'}}></div>
    </>
  );
}

export default Tabs 