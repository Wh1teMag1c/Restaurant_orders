import './Cart.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import {useNavigate} from "react-router-dom";
import {assets} from "../../assets/assets.js";
import {useContext} from "react";

const Cart = () => {
    const {cartItems, food_list, removeFromCart, getTotalCartAmount} = useContext(StoreContext);
    const navigate = useNavigate();
    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Блюдо</p>
                    <p>Название</p>
                    <p>Цена</p>
                    <p>Количество</p>
                    <p>Цена</p>
                    <p>Удалить</p>
                </div>
                <br/>
                <hr/>
                {food_list.map((item) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={item.id}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={assets[item.image.split(".")[0]]} alt=""/>
                                    <p>{item.name}</p>
                                    <p>{item.price} ₽</p>
                                    <p>{cartItems[item.id]}</p>
                                    <p>{item.price * cartItems[item.id]} ₽</p>
                                    <p onClick={() => removeFromCart(item.id)} className='cross'>x</p>
                                </div>
                                <hr/>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Итог по корзине</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Стоимость блюд</p>
                            <p>{getTotalCartAmount()} ₽</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <p>Стоимость доставки</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 150} ₽</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <b>Итог</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 150} ₽</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>Перейти к оформлению</button>
                </div>
            </div>
        </div>
    )
}

export default Cart