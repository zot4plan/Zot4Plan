import { useDispatch } from "react-redux";
import Xmark from "../../../../components/icon/Xmark";
import { backgrounds } from "../../data/data";
import Youtube from '../../../../components/icon/Youtube'
import styles from './BackgroundModal.module.css';
import { changeBackground } from "../../../../store/slices/VirtualCafeSlice";

function BackgroundModal({ handleClose }: ModalProps) {
    const dispatch = useDispatch();

    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <h1> Select a Background </h1>
                <button className='virtual-cafe-x-button' onClick={handleClose}>
                    <Xmark/>
                </button>
            </div>
            <div className={styles.modal_body}>
                <ul>
                    {backgrounds.map((background) => (
                        <li key={background.background_id} 
                            onClick={() => 
                            {
                                dispatch(changeBackground(background))
                                handleClose();
                            }}
                        > 
                            {background.url 
                            ?   <img 
                                    className={styles.img_bg}
                                    src={background.url} 
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