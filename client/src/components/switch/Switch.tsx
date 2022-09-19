import './Switch.css'

interface SwitchProps {
    label: string,
    isToggle: boolean,
    handleChange: () => void,
}

function Switch({label, isToggle, handleChange}: SwitchProps) {
    return ( 
        <div className="flex-container"
            style={{ 
                fontSize: '1.6rem', 
                color: isToggle ? 'var(--accent-color-2)' : '#ccc'
            }}
        >
            <label htmlFor={label} className='switch'>
                <input
                    type="checkbox"
                    checked={isToggle}
                    onChange={handleChange}
                    id={label}
                    name={label}
                />
                <span className='slider'/>
            </label>
            <span> {label} </span>
        </div>
    )
}

export default Switch;