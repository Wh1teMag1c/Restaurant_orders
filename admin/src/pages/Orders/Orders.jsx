import './Orders.css'
import axios from "axios";
import {assets} from "../../assets/assets.js";
import {useCallback, useEffect, useState} from "react";
import PropTypes from 'prop-types';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const fetchAllOrders = useCallback(async () => {
        const response = await axios.get("/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
        } else {
            console.log("Error");
        }
    }, []);

    const statusHandler = async (event, orderId) => {
        const response = await axios.post("/api/order/status", {
            orderId,
            status: event.target.value
        });
        if (response.data.success) {
            await fetchAllOrders();
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    return (
        <div className='order add'>
            <h3>Все заказы</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.food_tray_icon} alt=""/>
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className="order-item-name">{order.address.firstName}</p>
                            <p className='order-item-phone'>{order.address.phone}</p>
                            <div className="order-item-address">
                                <p>{"Адрес: г. " + order.address.city + ", ул. " + order.address.street + ", кв. " + order.address.flat_number + ", этаж " + order.address.flat_floor}</p>
                                <p>{"Домофон: " + order.address.intercom}</p>
                            </div>
                            <p className='order-item-comment'>{"Комментарий: " + order.address.comment}</p>
                        </div>
                        <p>Количество блюд: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                        <p>Цена: {order.amount} ₽</p>
                        <select onChange={() => statusHandler(event, order.id)} value={order.status}>
                            <option value="В обработке">В обработке</option>
                            <option value="Готовится">Готовится</option>
                            <option value="Доставляется">Доставляется</option>
                            <option value="Получен">Получен</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
};

Orders.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Orders