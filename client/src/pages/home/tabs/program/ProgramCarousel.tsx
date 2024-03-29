import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ChevronLeft from '../../../../components/icon/ChervonLeft';
import ChevronRight from '../../../../components/icon/ChervonRight';
import { switchProgram } from '../../../../store/slices/ProgramsSlice';

interface ProgramCarouselProps {
    url: string;
    name: string;
    isMajor: boolean;
}

function ProgramCarousel ({url, name, isMajor}: ProgramCarouselProps) {
    const isShowButton = useSelector((state:RootState) => 
        state.programs.selectedPrograms[isMajor? 1 : 0].length > 1
    );
    
    const dispatch = useDispatch();

    function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {  
        event.preventDefault();
        dispatch(switchProgram({move: Number(event.currentTarget.value), isMajor: isMajor}));
    }
    
    return (
        <div className='hyperlink'
            style={{justifyContent: isShowButton ? 'space-between' : 'center'}}
        >
            {isShowButton 
            && <button key='ChevronLeft'
                    style={{paddingLeft:'1.5rem'}} 
                    value={-1} onClick={handleOnClick}
                > 
                    <ChevronLeft/> 
                </button>}

            <a href={url} target='_blank' rel="noreferrer"> {name} </a>

            {isShowButton 
            && <button key='ChevronRight' 
                    style={{paddingRight:'2rem'}} 
                    value={1} onClick={handleOnClick}
                > 
                    <ChevronRight/> 
                </button>}
        </div>
    )
}

export default memo(ProgramCarousel);