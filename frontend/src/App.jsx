import Navbar from "./components/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import {useState} from "react";

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <div className="app-container">
            {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
            <div className='app'>
                <Navbar setShowLogin={setShowLogin}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/order" element={<PlaceOrder/>}/>
                    <Route path='/myorders' element={<MyOrders/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}

export default App