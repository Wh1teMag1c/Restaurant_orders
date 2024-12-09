import pool from "../config/db.js";

// Проверка и создание таблицы cart_items, если она отсутствует
export const createCartTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS cart_items (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            item_id INT NOT NULL,
            quantity INT DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (user_id, item_id)
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log("Cart table is ready.");
    } catch (error) {
        console.error("Error ensuring cart table exists:", error.message);
        throw error;
    }
};

// Добавление товара в корзину
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const existingItem = await pool.query(
            "SELECT * FROM cart_items WHERE user_id = $1 AND item_id = $2",
            [userId, itemId]
        );

        if (existingItem.rows.length > 0) {
            // Увеличить количество
            await pool.query(
                "UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = $1 AND item_id = $2",
                [userId, itemId]
            );
        } else {
            // Добавить новый товар
            await pool.query(
                "INSERT INTO cart_items (user_id, item_id, quantity) VALUES ($1, $2, $3)",
                [userId, itemId, 1]
            );
        }

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Удаление товара из корзины
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const existingItem = await pool.query(
            "SELECT * FROM cart_items WHERE user_id = $1 AND item_id = $2",
            [userId, itemId]
        );

        if (existingItem.rows.length > 0) {
            const currentQuantity = existingItem.rows[0].quantity;

            if (currentQuantity > 1) {
                // Уменьшить количество
                await pool.query(
                    "UPDATE cart_items SET quantity = quantity - 1 WHERE user_id = $1 AND item_id = $2",
                    [userId, itemId]
                );
            } else {
                // Удалить товар
                await pool.query(
                    "DELETE FROM cart_items WHERE user_id = $1 AND item_id = $2",
                    [userId, itemId]
                );
            }

            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Удаление всех элементов из корзины пользователя
        await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);

        res.json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error.message);
        res.json({ success: false, message: "Error clearing cart" });
    }
};

// Получение данных корзины
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const cartData = await pool.query(
            "SELECT * FROM cart_items WHERE user_id = $1",
            [userId]
        );

        res.json({ success: true, cartData: cartData.rows });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart, clearCart};
