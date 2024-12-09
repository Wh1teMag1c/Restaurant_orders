import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import {Route, Routes} from "react-router-dom";
import Orders from "./pages/Orders/Orders.jsx";

const App = () => {

    const url = "http://138.124.51.156:5000";
    return (
        <div>
            <Navbar/>
            <hr/>
            <div className="app-content">
                <Sidebar/>
                <Routes>
                    <Route path='/orders' element={<Orders url={url}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
