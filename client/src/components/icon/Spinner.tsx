import './Spinner.css'

interface SpinnerProps {
    width?: string;
    height?: string;
}
function Spinner({width = '80px', height= '80px'}: SpinnerProps) {
    return (
        <div className="lds-spinner" style={{width: width , height: height}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner;