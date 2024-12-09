import './MyOrders.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
import {assets} from "../../assets/assets.js";
import {useCallback, useContext, useEffect, useState} from "react";

const MyOrders = () => {

    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = useCallback(async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, {headers: {token}});
        setData(response.data.data);
    }, [url, token]); // Зависимости: url и token

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, fetchOrders]);


    return (
        <div className='my-orders'>
            <h2>История заказов</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.food_tray_icon} alt=""/>
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                } else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>Цена: {order.amount} ₽</p>
                            <p>Количество блюд: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                            <p>Статус: <span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Проверить статус заказа</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders