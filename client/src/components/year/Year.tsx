import {useState, memo, MouseEvent} from "react";
import Quarter from '../../components/year/Quarter';
import { useDispatch, useSelector } from 'react-redux';
import {removeYear} from '../../features/StoreSlice';
import Remove from '../icons/Remove';
import Right from '../icons/Right';
import { RootState } from "../../app/store";

interface YearType {
    yearId: string;
    index: number;
}

function Year({yearId, index}:YearType) {
    const [show, setShow] = useState (true);
    const year = useSelector((state:RootState) => state.store.years.byIds[yearId])
    const dispatch = useDispatch();

    const deleteYear = () => {
        dispatch(removeYear({id: year.id, index: index}));
    }

    const removeBtn = () => {
        return (
            <Remove deleteYear={deleteYear}/>
        )
    }

    return (
        <div className='year-wrapper'
             style={{marginBottom: show? '2rem': '1.25rem'}}>
            <div className={show? 'accordion': 'accordion closed-header'} key={year.id} 
            onClick={()=>setShow(!show)}>

                <div className="year-header">
                    <span> {year.name} </span>
                </div>

                <div className="rightIcon">
                    <Right show ={show}/>
                </div>
                {index > 3 && removeBtn()}
            </div>

            <div className={show?'quarters-wrapper':'quarters-wrapper hide'} style={{display:'flex'}}>
                {year.quarters.map((quarterId) => 
                    <Quarter key={quarterId} droppableId={quarterId} />
                )}
            </div>
        </div>
    )
}

export default memo(Year);