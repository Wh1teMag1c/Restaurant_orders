import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import {Route, Routes} from "react-router-dom";
import Orders from "./pages/Orders/Orders.jsx";

const App = () => {

    return (
        <div>
            <Navbar/>
            <hr/>
            <div className="app-content">
                <Sidebar/>
                <Routes>
                    <Route path='/admin/orders' element={<Orders/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
