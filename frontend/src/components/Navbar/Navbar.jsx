import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, useNavigate} from "react-router-dom";
import {StoreContext} from "../../context/StoreContext.jsx";
import {useContext, useState} from "react";

const Navbar = ({setShowLogin}) => {

    const {getTotalCartAmount, token, setToken, cartItems} = useContext(StoreContext)

    const [menu, setMenu] = useState("home");

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        window.location.reload();
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div className='navbar'>
            <div className="container">
                <Link to='/' onClick={scrollToTop}><img src={assets.logo} alt="" className="logo"/></Link>
                <ul className="navbar-menu">
                    <Link to='/'
                          onClick={() => {
                              setMenu("home");
                              scrollToTop();
                          }}
                          className={menu === "home" ? "active" : ""}>Главная</Link>
                    <a href='#explore-menu' onClick={() => setMenu("menu")}
                       className={menu === "menu" ? "active" : ""}>Меню</a>
                    <a href='#footer' onClick={() => setMenu("contact-us")}
                       className={menu === "contact-us" ? "active" : ""}>Контакты</a>
                </ul>
                <div className="navbar-right">
                    <div className="navbar-search-icon">
                        <Link to='/cart' onClick={scrollToTop}><img className="cart_logo" src={assets.cart_icon}
                                                                    alt=""/></Link>
                        <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    </div>
                    {!token ? <button onClick={() => setShowLogin(true)}>Войти</button>
                        : <div className='navbar-profile'>
                            <img className='profile_image' src={assets.profile_icon} alt=""/>
                            <ul className="nav-profile-dropdown">
                                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt=""/>
                                    <p>Заказы</p></li>
                                <hr/>
                                <li onClick={logout}><img src={assets.logout_icon} alt=""/><p>Выйти</p></li>
                            </ul>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar