import Header from '../../components/header/Header';
import VirtualCafeNavList from './navbar/VirtualCafeNavList';
import VirtualCafeGrid from './grid/VirtualCafeGrid';
import VirtualCafeToolbar from './toolbars/VirtualCafeToolbar';
import UpdateVisitCount from '../../helpers/UpdateVisitCount';
// import Christmas from '../../components/theme/christmas/Christmas';
import './VirtualCafe.css';

function VirtualCafe() {
    return (
        <div className="virtual-cafe">
            <Header  
                navbarStyle={{ margin: '0.5rem 1rem', backgroundColor: '#B5838D', borderRadius: '2.4rem' }}
                heartColor='#FFF' 
                NavList={VirtualCafeNavList}
                // Theme={Christmas}
            />
            <VirtualCafeGrid/>
            <VirtualCafeToolbar/>
            <UpdateVisitCount page="virtualCafe"/>
            <footer id="footer" className='virtual-cafe-footer'>
                <ul>
                    <li>1. Keep myself away from watching other youtube videos.</li>
                    <li>2. Listen to music without ads.</li>
                    <li>3. Set background to match the mood.</li>
                </ul>
            </footer>
        </div>
    );
}

export default VirtualCafe;