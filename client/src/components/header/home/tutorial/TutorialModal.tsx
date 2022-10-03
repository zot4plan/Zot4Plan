import { useState, MouseEvent } from 'react';
import ChervonLeft from '../../../icon/ChervonLeft';
import ChervonRight from '../../../icon/ChervonRight';
import XCircle from '../../../icon/XCircle';
import pickMajor from '../../../../assets/gifs/pickMajor.gif';
import addCourse from '../../../../assets/gifs/addCourse.gif';
import showMoreInfo from '../../../../assets/gifs/showMoreInfo.gif';
import dragDropCourses from '../../../../assets/gifs/dragDropCourses.gif';

interface TutorialModalProps{
    handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
const images = [pickMajor, addCourse, showMoreInfo, dragDropCourses];
const titles = ['Pick a Major', 'Add Courses', 'More Information', 'Drag and Drop Courses']

function TutorialCarousel ({ handleClick }: TutorialModalProps) {
    const [index, setIndex] = useState(1);

    const handleLeftClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIndex(index === 1? images.length : index - 1);
    }
    
    const handleRightClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIndex(index === images.length? 1 : index + 1);
    }
      
    return (
    <>
        <button className='arrow' onClick={handleLeftClick}>
            <ChervonLeft/>
        </button>
        <div>
            <h1 className='gif-title'> {titles[index-1]} </h1>

            <div className="flex-container" style={{position: 'relative'}}>
                <button 
                    style={{position: 'absolute'}}
                    className= 'btn-outlined' 
                    id='close-tutorial-btn' 
                    onClick={handleClick}
                >
                    <XCircle/>
                </button>          
                <img
                    className={'tutorial-img'}
                    src={images[index - 1]} 
                    loading='lazy' 
                    alt='Website Tutorial Page 1'
                />
            </div>
        </div>
        <button className='arrow' onClick={handleRightClick}>
            <ChervonRight/>
        </button>
    </>
    )
}

export default TutorialCarousel