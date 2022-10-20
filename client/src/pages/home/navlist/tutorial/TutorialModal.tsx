import { useState, MouseEvent } from 'react';
import ChervonLeft from '../../../../components/icon/ChervonLeft';
import ChervonRight from '../../../../components/icon/ChervonRight';
import XCircle from '../../../../components/icon/XCircle';
import pickMajor from '../../../../assets/gifs/pickMajor.gif';
import addCourse from '../../../../assets/gifs/addCourse.gif';
import showMoreInfo from '../../../../assets/gifs/showMoreInfo.gif';
import dragDropCourses from '../../../../assets/gifs/dragDropCourses.gif';
import './TutorialModal.css';
import Spinner from '../../../../components/icon/Spinner';

const images = [pickMajor, addCourse, showMoreInfo, dragDropCourses];
const titles = ['Pick a Major', 'Add Courses', 'More Information', 'Drag and Drop Courses']

function TutorialCarousel ({ handleClose }: ModalProps) {
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(1);

    const handleLeftClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIndex(index === 1? images.length : index - 1);
    }
    
    const handleRightClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIndex(index === images.length? 1 : index + 1);
    }

    const imageLoaded = () => {
        setLoading(false);
    };
      
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
                        onClick={handleClose}
                    >
                        <XCircle/>
                    </button>  
                    <div style={{display: loading ? "block" : "none"}}>
                        <Spinner/>
                    </div>        
                    <img
                        style={{display: loading ? "none" : "block"}}
                        className={'tutorial-img'}
                        src={images[index - 1]} 
                        loading='lazy' 
                        alt='Website Tutorial Page 1'
                        onLoad={imageLoaded}
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