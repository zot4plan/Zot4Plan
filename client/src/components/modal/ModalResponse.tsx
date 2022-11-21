import Xmark from '../icon/Xmark';
import './ModalResponse.css';

interface ModalResponseProps {
    heading: string;
    body: any;
    buttonText: string;
    handleClose: () => void;
}

const ModalResponse = ({heading, body, buttonText, handleClose}: ModalResponseProps) => {
    return (       
        <div className="success-message-wrapper">
            <div className="checkmark_wrapper"> 
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <p> {heading} </p>
            </div>
            <p> {body} </p>
            <button onClick={handleClose} className='virtual-cafe-modal-button'> {buttonText} </button>
            <button onClick={handleClose} className='virtual-cafe-x-button'> <Xmark/> </button>
        </div>
    )
}

export default ModalResponse;