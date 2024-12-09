import './Sidebar.css'
import {assets} from "../../assets/assets.js";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to='/orders' className="sidebar-option">
                    <img src={assets.order_icon} alt=""/>
                    <p>Заказы</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
