import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/home/Header';
import Home from './pages/home/Home';
import VirtualCafe from './pages/virtualCafe/VirtualCafe';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
    const location = useLocation();
    const show = location.pathname !== '/virtual-cafe' ? true : false;

    return (
        <>
            {show && <Header/>}
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/virtual-cafe' element={<VirtualCafe/>}/>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />s
            </Routes>
            {show && <Footer/>}
        </> 
    );
}

export default App;
