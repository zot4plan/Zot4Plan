import {memo, MouseEvent} from 'react';
import {useDispatch} from 'react-redux';
import { clearSchedule } from '../../features/StoreSlice';

interface PopperClearProps{
    handleClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function PopperClear({handleClick}: PopperClearProps) {
    const dispatch = useDispatch();

    const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(clearSchedule());
        handleClick(event);
    }

    return ( 
    <>
        <div style={{
                position: 'absolute',
                zIndex: '0',
                top: '0rem',
                left: '50%',
                width: '1.2rem',
                height: '1.2rem',
                transform: 'rotate(45deg) translateX(-50%)',
                marginTop: '0.35rem',
                backgroundColor: 'white',
                boxShadow: '-1px -1px 1px 0px #1f1f1f50'
            }}
        />

        <div style={{
                width: "280px", 
                marginTop: "0.5rem",
                padding: '1rem 0rem',
                boxShadow: '0px 1px 3px 3px rgba(0,0,0,0.1)',
                border: '1px solid lightgrey',
                borderRadius: '0.8rem',
                backgroundColor: 'white',
            }}
        > 
            <div>
                <h1 style={{
                        marginBottom: '1rem',
                        padding: '0rem 1rem',
                        fontSize: '2rem',
                        fontWeight: '500',
                    }}
                >
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
                }}
            >
                <button onClick={handleClick}
                    data-value="cancel"
                    style= {{
                        marginRight: '1rem', 
                        border: '1px solid #307ABB', 
                        borderRadius: '0.4rem',
                        padding: '0.5rem 0.75rem',
                        color: '#307ABB',
                        fontSize:'1.4rem'
                    }}
                > 
                    Cancel 
                </button>

                <button onClick={handleClear}
                    data-value="cancel"
                    style= {{ 
                        marginRight: '1rem',
                        border: '1px solid red',
                        borderRadius: '0.4rem', 
                        padding: '0.5rem 0.75rem',
                        color: 'white',
                        backgroundColor: '#DF2935',
                        fontSize:'1.4rem',
                    }}
                > 
                    Remove
                </button>
            </div>
        </div>
    </>
    )
}

export default memo(PopperClear);