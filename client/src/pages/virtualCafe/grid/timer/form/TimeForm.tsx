import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Xmark from "../../../../../components/icon/Xmark";
import { editTime } from "../../../../../store/slices/VirtualCafeSlice";
import { RootState } from "../../../../../store/store";
import './TimeForm.css';
function TimeForm({handleClose}: ModalProps) {
    const time = useSelector((state: RootState) => state.virtualCafe.time);
    const [form, setForm] = useState<VCTimeType>(time);
    const dispatch = useDispatch();

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(editTime({workTime: form.workTime, breakTime: form.breakTime}));
        handleClose();
    }

    const onChangeWorkTime = (event: ChangeEvent<HTMLInputElement>) => {
        setForm(prevState => ({...prevState, workTime: parseInt(event.target.value)}))
    }

    const onChangeBreakTime = (event: ChangeEvent<HTMLInputElement>) => {
        setForm(prevState => ({...prevState, breakTime: parseInt(event.target.value)}))
    }

    return (
        <form className='form' id="virtual-cafe-time-form" onSubmit={handleSubmit}>
            <label>
                <div>
                    <span> Work Time: </span>
                    <input type='number' max='120' min='5' value={form.workTime} step='5' onChange={onChangeWorkTime}/>
                    <span className='time-unit'> minutes </span>
                </div>
            </label>
            <label>
                <div>
                    <span>Break Time:</span>
                    <input type='number' max='30' min='0' value={form.breakTime} step='5' onChange={onChangeBreakTime}/>
                    <span className='time-unit'> minutes </span>
                </div>
            </label>
            <div></div>
            <div className='form-button-wrapper'>
                <button type='button' onClick={handleClose} className='virtual-cafe-modal-button'> Cancel </button>
                <button type='submit' className='virtual-cafe-modal-button'> Apply </button>
            </div>
            <button type='button' className='virtual-cafe-x-button' onClick={handleClose}> <Xmark/></button>
        </form>  
    )
}

export default TimeForm;