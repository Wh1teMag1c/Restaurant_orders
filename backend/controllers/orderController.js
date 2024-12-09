import {
    createOrder,
    deleteOrder,
    getAllOrders,
    getUserOrders,
    updateOrderPayment,
    updateOrderStatus
} from "../models/orderModel.js";
import {findUserById} from "../models/userModel.js";

// Создание нового заказа
export const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        // Проверяем, существует ли пользователь
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        // Создаем новый заказ
        const newOrder = await createOrder({userId, items, amount, address});

        // Возвращаем успех
        res.status(201).json({success: true, data: newOrder});
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({success: false, message: "Error placing order"});
    }
};

// Проверка оплаты
export const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;

    try {
        if (success === "true") {
            // Обновляем статус оплаты
            const updatedOrder = await updateOrderPayment(orderId, true);
            return res.json({success: true, message: "Order paid", data: updatedOrder});
        } else {
            // Удаляем заказ
            const deletedOrder = await deleteOrder(orderId);
            return res.json({success: false, message: "Order not paid", data: deletedOrder});
        }
    } catch (error) {
        console.error("Error verifying order:", error.message);
        res.status(500).json({success: false, message: "Error verifying order"});
    }
};

// Получение заказов пользователя
export const userOrders = async (req, res) => {
    try {
        const orders = await getUserOrders(req.body.userId);
        res.json({success: true, data: orders});
    } catch (error) {
        console.error("Error fetching user orders:", error.message);
        res.status(500).json({success: false, message: "Error fetching user orders"});
    }
};

// Получение всех заказов (для администратора)
export const listOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json({success: true, data: orders});
    } catch (error) {
        console.error("Error listing orders:", error.message);
        res.status(500).json({success: false, message: "Error listing orders"});
    }
};

// Обновление статуса заказа
export const updateStatus = async (req, res) => {
    try {
        const updatedOrder = await updateOrderStatus(req.body.orderId, req.body.status);
        res.json({success: true, message: "Status updated", data: updatedOrder});
    } catch (error) {
        console.error("Error updating order status:", error.message);
        res.status(500).json({success: false, message: "Error updating order status"});
    }
};
