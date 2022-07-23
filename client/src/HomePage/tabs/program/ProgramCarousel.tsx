import {memo} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import ChevronLeft from '../../../components/icon/ChervonLeft';
import ChevronRight from '../../../components/icon/ChervonRight';
import { handleSwitchProgram } from '../../../features/ProgramsSlice';

interface ProgramCarouselProps {
    url: string;
    name: string;
    isMajor: boolean;
}

function ProgramCarousel ({url, name, isMajor}: ProgramCarouselProps) {
    const isShowButton = useSelector((state:RootState) => {
        let i = isMajor? 1 : 0;
        return state.programs.selectedPrograms[i].length > 1;
    });

    const dispatch = useDispatch();

    function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {  
        event.preventDefault();
        const move = Number(event.currentTarget.value);
        dispatch(handleSwitchProgram({move: move, isMajor: isMajor}));
    }
    
    return (
        <div className='hyperlink'
            style={{justifyContent: isShowButton? 'space-between' : 'center'}}
        >
            {isShowButton && 
                <button key='ChevronLeft'
                    style={{paddingLeft:'1.5rem'}} 
                    value={-1} onClick={handleOnClick}
                > 
                    <ChevronLeft/> 
                </button>}

            <a href={url} target='_blank' rel="noreferrer"> {name} </a>

            {isShowButton && 
                <button key='ChevronRight' 
                    style={{paddingRight:'2rem'}} 
                    value={1} onClick={handleOnClick}
                > 
                    <ChevronRight/> 
                </button>}
        </div>
    )
}

export default memo(ProgramCarousel);