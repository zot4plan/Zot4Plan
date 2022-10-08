import Xmark from "../../../../components/icon/Xmark";
import { backgrounds } from "../../data/data";
import Youtube from '../../../../components/icon/Youtube'
import styles from './BackgroundModal.module.css';

interface SelectBackgroundProps {
    setBackground: (background:any) => void;
    handleClose: () => void;
}

function BackgroundModal({ handleClose, setBackground }: SelectBackgroundProps) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <h1> Select a Background </h1>
                <button className={styles.x_icon} onClick={handleClose}>
                    <Xmark/>
                </button>
            </div>
            <div className={styles.modal_body}>
                <ul>
                    {backgrounds.map((background) => (
                        <li key={background.id} 
                            onClick={() => 
                            {
                                setBackground(background); 
                                handleClose();
                            }}
                        > 
                            {background.path 
                            ?   <img 
                                    className={styles.img_bg}
                                    src={background.path} 
                                    alt={background.description}
                                />
                            : <div className={styles.default}> <Youtube/> </div>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BackgroundModal;