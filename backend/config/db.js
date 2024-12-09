import pkg from 'pg';
import dotenv from 'dotenv';

const {Pool} = pkg;

dotenv.config();


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT),
});

export const connectDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log("Database Connected:", res.rows[0]);
    } catch (error) {
        console.error("Database Connection Error: ", error.message);
        process.exit(1);
    }
};

export default pool;
