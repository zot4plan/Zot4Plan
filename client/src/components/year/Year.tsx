import {useState, memo} from "react";
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
const QuarterHeaders = memo (() => {
    const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
    return (
        <>
            {QUARTER_NAMES.map((name, index) => {
                return (
                <h2 key={name} 
                    className={"quarter-header m-0 flex-basis-25 " 
                                + (index < 3? 'bd-r ':'')}> 
                    {name}
                </h2>)
            })}
        </>
    )
})
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
        <div 
            className='shadow-0 round-15'
            style={{marginBottom: show? '2rem': '1.25rem'}}
            >
            <div 
                className={'flex item-center color-black bg-grey pointer accordion ' 
                            + (show? 'round-top': 'round-15')}  
                key={year.id} 
                onClick={()=>setShow(!show)}
                >
                <div className="accordion-header m-0 s-1r25">
                    <span> {year.name} </span>
                </div>

                <div className="rightIcon">
                    <Right show ={show}/>
                </div>
                {index > 3 && removeBtn()}
            </div>

            <div className={"flex ease " + (show? '':'hide')} >
                <QuarterHeaders />
            </div>

            <div className={'flex quarters-wrapper ease '+ (show?'':'hide')}>
                {year.quarters.map((quarterId, index) => 
                    <Quarter key={quarterId} droppableId={quarterId} index={index}/>
                )}
            </div>
        </div>
    )
}

export default memo(Year);