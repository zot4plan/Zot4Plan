import Boba from "../assets/images/boba.png"
import Cookie from "../assets/images/cookie.png"
import "./Snacks.css"

function Snacks() {
    return (
        <div className="snack-table">
            <img className="snack-icon" src={Boba} alt="Cup of Boba Milk Tea Icon"/>
            <img className="snack-icon" src={Cookie} alt="Cup of Coffee Icon"/>
        </div>
    )
}

export default Snacks