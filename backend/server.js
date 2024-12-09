import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import { createUserTable } from "./models/userModel.js";
import { createFoodTable } from "./models/foodModel.js";
import { createOrderTable } from "./models/orderModel.js";
import { createCartTable } from "./controllers/cartController.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(cors());

// db connection and table setup
const initializeDatabase = async () => {
    try {
        await connectDB(); // Проверка соединения с базой
        console.log("Database connection successful.");
        await createUserTable(); // Создание таблицы пользователей
        await createFoodTable(); // Создание таблицы блюд
        await createOrderTable(); // Создание таблицы заказов
        await createCartTable(); // Создание таблицы корзины
        console.log("All tables initialized.");
    } catch (error) {
        console.error("Error during database initialization:", error.message);
        process.exit(1); // Прерывание запуска сервера в случае ошибки
    }
};

// Initialize database and start server only after successful DB connection
initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});
