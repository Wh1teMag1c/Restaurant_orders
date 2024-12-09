import {createFood, getAllFood, deleteFoodById} from '../models/foodModel.js';
import fs from 'fs';

// Добавление блюда
const addFood = async (req, res) => {
    try {
        const food = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename
        };
        const newFood = await createFood(food);
        res.json({success: true, message: "Food Added", data: newFood});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Error"});
    }
};

// Получение списка блюд
const listFood = async (req, res) => {
    try {
        const foods = await getAllFood();
        res.json({success: true, data: foods});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Error"});
    }
};

// Удаление блюда
const removeFood = async (req, res) => {
    try {
        const food = await deleteFoodById(req.body.id);
        if (!food) {
            return res.status(404).json({success: false, message: "Food not found"});
        }
        // Удаляем файл изображения
        fs.unlink(`uploads/${food.image}`, () => {
        });
        res.json({success: true, message: "Food Removed"});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Error"});
    }
};

export {addFood, listFood, removeFood};
