import './PlaceOrder.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";

const PlaceOrder = () => {

    const {getTotalCartAmount, token, food_list, cartItems, setCartItems} = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        phone: "",
        city: "",
        street: "",
        flat_number: "",
        entrance_number: "",
        flat_floor: "",
        intercom: "",
        comment: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];

        // Формируем данные заказа
        food_list.map((item) => {
            if (cartItems[item.id] > 0) {
                let itemInfo = {...item, quantity: cartItems[item.id]}; // Копируем объект и добавляем количество
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 150,
        };

        try {
            // Отправляем данные заказа
            let response = await axios.post("/api/order/place", orderData, {
                headers: {token},
            });

            if (response.data.success) {
                // Очищаем корзину в базе данных
                await axios.post("/api/cart/clear", {cartItems}, {headers: {token}});

                // Очищаем корзину в состоянии приложения
                setCartItems({}); // Передайте пустой объект или другую логику для очистки состояния корзины

                // Перенаправляем пользователя на страницу заказов
                navigate('/myorders');
            } else {
                alert("Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order");
        }
    };


    return (
        <form onSubmit={placeOrder} className='place-order' action="">
            <div className="place-order-left">
                <p className="title">Информация о доставке</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text"
                           placeholder='Имя'/>
                    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="phone"
                           placeholder='Телефон'/>
                </div>
                <input required name='city' onChange={onChangeHandler} value={data.city} type="text"
                       placeholder='Город'/>
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text"
                       placeholder='Улица'/>
                <div className="multi-fields">
                    <input required name='flat_number' onChange={onChangeHandler} value={data.flat_number} type="text"
                           placeholder='Кв/офис'/>
                    <input required name='entrance_number' onChange={onChangeHandler} value={data.entrance_number}
                           type="text"
                           placeholder='Подъезд'/>
                    <input required name='flat_floor' onChange={onChangeHandler} value={data.flat_floor} type="text"
                           placeholder='Этаж'/>
                    <input required name='intercom' onChange={onChangeHandler} value={data.intercom} type="text"
                           placeholder='Домофон'/>
                </div>
                <div className="multi-fields">
                    <input name='comment' onChange={onChangeHandler} value={data.comment} type="text"
                           placeholder='Комментарий к заказу'/>
                </div>
            </div>
            <div className="place-order-right">
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
                    <button type='submit'>Оплатить</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder