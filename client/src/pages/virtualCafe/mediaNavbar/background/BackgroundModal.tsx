import Xmark from "../../../../components/icon/Xmark";
import { backgrounds } from "../../data/data";
import styles from './BackgroundModal.module.css';

interface SelectBackgroundProps {
    setBackground: (background:any) => void;
    handleClose: () => void;
}

function BackgroundModal({ handleClose, setBackground }: SelectBackgroundProps) {
    return (
        <div className='popup'>
            <div className="popup-inner">
                <div className="popup-header">
                    <h5 className='title'> Select a Background </h5>
                    <div onClick={handleClose} >
                        <Xmark/>
                    </div>
                </div>
                <div className="popup-list-outer">
                    <ul className="popup-list">
                        {backgrounds.map((background) => (
                            <li key={background.id} className='background-info'>       
                                <img 
                                    className='icon' 
                                    src={background.path} 
                                    alt={background.description}
                                    onClick={() => 
                                    {
                                        setBackground(background); 
                                        handleClose();
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BackgroundModal;