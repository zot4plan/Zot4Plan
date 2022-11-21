import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import VirtualCafe from './pages/virtualCafe/VirtualCafe';
import './App.css';

function App() {
    return (
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
            />
        </Routes>
    );
}

export default App;
