import pool from "../config/db.js";

// Создание таблицы
export const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            cart_data JSON DEFAULT '{}'
        );
    `;
    try {
        await pool.query(query);
        console.log("User table is ready.");
    } catch (error) {
        console.error("Error creating user table:", error.message);
    }
};

// Найти пользователя по email
export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

// Найти пользователя по ID
export const findUserById = async (id) => {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// Создать нового пользователя
export const createUser = async ({ name, email, password }) => {
    const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, email, password]);
    return rows[0];
};

// Обновить данные корзины пользователя
export const updateUserCart = async (id, cartData) => {
    const query = `
        UPDATE users
        SET cart_data = $1
        WHERE id = $2
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [cartData, id]);
    return rows[0];
};
