import { useState } from 'react'
import LeftArrow from '../icons/LeftArrow'
import RightArrow from '../icons/RightArrow'
import XCircle from '../icons/XCircle'

interface TutorialSliderType{
    closedTutorial:any;

}

function TutorialSlider ({ closedTutorial }: TutorialSliderType) {

    const imagesSrc = ['../../images/HowTo1.png', '../../images/HowTo2.png']

    const [index, setIndex] = useState(1);
    function handleLeftClick( e: { preventDefault: () => void; }) {
        e.preventDefault();
        if(index == 1)
            setIndex(imagesSrc.length)
        else 
            setIndex(index - 1)
    }
    function handleRightClick( e: { preventDefault: () => void; }) {
        e.preventDefault();
        if(index == imagesSrc.length)
            setIndex(1)
        else 
            setIndex(index + 1)
      }
    
      console.log(imagesSrc[index]);
      return (
        <div id='tutorial' className='flex justify-center item-center'>
            <button className='arrow' onClick={handleLeftClick}>
                <LeftArrow/>
            </button>
            <div id='tutorial-image-container' 
                 className='flex justify-center relative'>
                <div 
                    className='absolute' 
                    id='x-circle' 
                    onClick={closedTutorial}>
                    <XCircle/>
                </div>
                <img
                    className='tutorial-img'
                    id={'HowTo' + index} 
                    src={require('../../images/HowTo' + index + '.png')} 
                    loading='lazy' 
                    alt='Website Tutorial Page 1'
                />
            </div>
            <button className='arrow' onClick={handleRightClick}>
                <RightArrow/>
            </button>
      </div>
      )
}

export default TutorialSlider