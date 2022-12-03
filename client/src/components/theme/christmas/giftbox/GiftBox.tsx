import './GiftBox.css';
import reindeerGiftBox from '../../../../assets/theme/christmas/reindeer-gift-box.png'

interface IGiftBoxProps {
    isOpen: boolean;
}

function GiftBox({isOpen}:IGiftBoxProps) {
    return (
        <div className={"christmas-gift " + (isOpen ? "": "shake-box")}>
            <div className="gift">
                <div className='gift-lid' style={{transform: isOpen ? "rotate(-110deg) scaleX(0.9)" : ""}}></div>
                <img className="wishes" 
                    src={reindeerGiftBox}
                    alt="reindeer inside gift box"
                    style={{
                        transform: isOpen ? "translateY(-20px)" : "",
                        opacity: isOpen ? '1' : '0'
                }}/>
                <div className="sparkles" style={{display: isOpen ? 'block' : 'none'}}>
                    <div className="spark1"></div>
                    <div className="spark2"></div>
                    <div className="spark3"></div>
                    <div className="spark4"></div>
                    <div className="spark5"></div>
                    <div className="spark6"></div>
                </div>
            </div>
        </div>
    )
}

export default GiftBox;