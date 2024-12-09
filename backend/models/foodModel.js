import pool from '../config/db.js';

// Создание таблицы
export const createFoodTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS food_items
        (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            image VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL
        );
    `;
    try {
        await pool.query(query);
        console.log("Food table is ready.");
    } catch (error) {
        console.error("Error creating food table:", error.message);
    }
};

// Добавление нового блюда
export const createFood = async (food) => {
    const query = `
        INSERT INTO food_items (name, description, price, image, category)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [food.name, food.description, food.price, food.image, food.category];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Получение всех блюд
export const getAllFood = async () => {
    const query = `SELECT * FROM food_items;`;
    const result = await pool.query(query);
    return result.rows;
};

// Удаление блюда
export const deleteFoodById = async (id) => {
    const query = `DELETE FROM food_items WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};
