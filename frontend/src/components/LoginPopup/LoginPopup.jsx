import {assets} from "../../assets/assets.js";
import './LoginPopup.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios"
import {useContext, useState} from "react";
import PropTypes from 'prop-types';

const LoginPopup = ({setShowLogin}) => {

    const {setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState('Вход');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data, [name]: value}))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = "";
        if (currState === "Вход") {
            newUrl = "/api/user/login";
        } else {
            newUrl = "/api/user/register";
        }
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            window.location.reload();
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt=""/>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Вход" ? <></> :
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text"
                               placeholder='Имя' required/>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email"
                           placeholder='Email' required/>
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password"
                           placeholder='Пароль' required/>
                </div>
                <button type='submit'>{currState === "Регистрация" ? "Зарегистрироваться" : "Войти"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>Продолжая, я соглашаюсь с условиями использования и политикой конфиденциальности</p>
                </div>
                {currState === "Вход"
                    ? <p>Нет аккаунта? <span onClick={() => setCurrState('Регистрация')}>Зарегистрироваться</span></p>
                    : <p>Уже есть аккаунт? <span onClick={() => setCurrState('Вход')}>Войти</span></p>
                }
            </form>
        </div>
    );
};

LoginPopup.propTypes = {
    setShowLogin: PropTypes.func.isRequired
};

export default LoginPopup;