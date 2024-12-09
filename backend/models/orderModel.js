import pool from "../config/db.js";

// Создание таблицы (выполняется один раз при запуске)
export const createOrderTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            items JSONB NOT NULL,
            amount NUMERIC(10, 2) NOT NULL,
            address JSONB NOT NULL,
            status VARCHAR(50) DEFAULT 'В обработке',
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            payment BOOLEAN DEFAULT false
        );
    `;
    try {
        await pool.query(query);
        console.log("Order table is ready.");
    } catch (error) {
        console.error("Error creating order table:", error.message);
    }
};

// Создание нового заказа
export const createOrder = async ({ userId, items, amount, address }) => {
    const query = `
        INSERT INTO orders (user_id, items, amount, address, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        userId,
        JSON.stringify(items), // Преобразуем items в строку JSON
        amount,
        address,
        'В обработке', // Устанавливаем статус по умолчанию
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};


// Обновление статуса оплаты заказа
export const updateOrderPayment = async (orderId, payment) => {
    const query = `
        UPDATE orders
        SET payment = $1
        WHERE id = $2
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [payment, orderId]);
    return rows[0];
};

// Удаление заказа
export const deleteOrder = async (orderId) => {
    const query = `
        DELETE FROM orders
        WHERE id = $1
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [orderId]);
    return rows[0];
};

// Получение всех заказов пользователя
export const getUserOrders = async (userId) => {
    const query = `
        SELECT * FROM orders
        WHERE user_id = $1
        ORDER BY date DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
};

// Получение всех заказов (для администратора)
export const getAllOrders = async () => {
    const query = `
        SELECT * FROM orders
        ORDER BY date DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

// Обновление статуса заказа
export const updateOrderStatus = async (orderId, status) => {
    const query = `
        UPDATE orders
        SET status = $1
        WHERE id = $2
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [status, orderId]);
    return rows[0];
};
