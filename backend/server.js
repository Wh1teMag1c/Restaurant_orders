import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import {createUserTable} from "./models/userModel.js";
import {createFoodTable} from "./models/foodModel.js";
import {createOrderTable} from "./models/orderModel.js";
import {createCartTable} from "./controllers/cartController.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const initializeDatabase = async () => {
    try {
        await connectDB();
        console.log("Database connection successful.");
        await createUserTable();
        await createFoodTable();
        await createOrderTable();
        await createCartTable();
        console.log("All tables initialized.");
    } catch (error) {
        console.error("Error during database initialization:", error.message);
        process.exit(1);
    }
};

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server started`);
    });
});

app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});
