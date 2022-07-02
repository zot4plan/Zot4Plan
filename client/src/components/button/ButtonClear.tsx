import {memo, useState} from 'react';
import {useDispatch} from 'react-redux';
import ReactTooltip from "react-tooltip";
import { clearYears } from '../../features/StoreSlice';

function ButtonClear() {
    const [isShow, setIsShow] = useState(false);
    const dispatch = useDispatch();

    const refresh = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(clearYears());
        setIsShow(!isShow);
    }

    const toggleShow = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsShow(!isShow);
    }

    return ( 
    <div>
        <button className="btn" 
            onClick={toggleShow}
            data-tip data-for='refreshTip'
            aria-label='remove all courses'
        >  
            Clear
        </button>

        <ReactTooltip id="refreshTip" place="top" effect="solid">
            Remove all courses
        </ReactTooltip>

        <div style={{
            display: isShow? "block": "none",
            position: "fixed", zIndex: '999',
            left: '0', top: '0',
            width: '100%', height: '100%',
            backgroundColor: "#8080804d",
        }}>
            <div style={{
                    position: "fixed", zIndex: '999',
                    left: '50%', top: '34%',
                    transform: 'translate(-50%, -66%)', 
                    width: "320px", height: "auto",
                    padding: '1rem 0rem',
                    boxShadow: '0px 1px 3px 3px rgba(0,0,0,0.1)',
                    border: '1px solid lightgrey',
                    borderRadius: '0.8rem',
                    backgroundColor: "snow",
            }}> 
                <div>
                    <h1 style={{
                            marginBottom: '1rem',
                            fontSize: '2rem',
                            fontWeight: '500',
                            padding: '0rem 1rem'}}>
                        Confirmation
                    </h1>
                    <p style={{fontSize: '1.4rem', marginBottom: '1rem', padding:'0rem 1rem'}}>
                        Are your sure you want to remove all courses from your schedule? 
                    </p>
                </div>

                <div style={{
                        display: 'flex', 
                        justifyContent: 'end', 
                        alignItems: 'center',
                        borderTop: '1px solid lightgrey',
                        paddingTop: '1rem'
                }}>
                    <button onClick={toggleShow}
                        style= {{
                            marginRight: '1rem', 
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #307ABB', 
                            borderRadius: '0.4rem',
                            color: '#307ABB',
                            fontSize:'1.4rem'
                        }}
                    > 
                        Cancel 
                    </button>
                    <button onClick={refresh}
                        style= {{ 
                            marginRight: '1rem',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid red',
                            borderRadius: '0.4rem', 
                            color: 'white',
                            backgroundColor: '#DF2935',
                            fontSize:'1.4rem',
                        }}> 
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
    )

}

export default memo(ButtonClear);