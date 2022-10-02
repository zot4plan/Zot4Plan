import Xmark from "../../../components/icon/Xmark";
import { backgrounds } from "../data/backgrounds";
import './Background.css';

interface SelectBackgroundProps {
    setBackground: (task:any) => void;
    closeSelect: () => void;
}

const SelectBackground = ({ closeSelect, setBackground }: SelectBackgroundProps) => {
    return (
        <div className='popup'>
            <div className="popup-inner">
                <div className="popup-header">
                    <h5 className='title'> Select a Background </h5>
                    <div onClick={closeSelect} >
                        <Xmark/>
                    </div>
                </div>
                <div className="popup-list-outer">
                    <ul className="popup-list">
                        {backgrounds.map((task) => (
                            <li key={task.id} className='background-info'>       
                                <img 
                                    className='icon' 
                                    src={task.path} 
                                    alt={task.description}
                                    onClick={() => 
                                    {
                                        setBackground(task); closeSelect();
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

export default SelectBackground