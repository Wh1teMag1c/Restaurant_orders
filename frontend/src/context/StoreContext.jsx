import {createContext, useEffect, useState} from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 1}))
        } else {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        }
        if (token) {
            await axios.post("/api/cart/add", {itemId}, {headers: {token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
        if (token) {
            await axios.post("/api/cart/remove", {itemId}, {headers: {token}});
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product['id'] === Number(item));
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get("/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post("/api/cart/get", {}, {headers: {token}});
        const cartArray = response.data.cartData; // массив из API
        const cartObject = cartArray.reduce((acc, item) => {
            acc[item.item_id] = item.quantity;
            return acc;
        }, {});
        setCartItems(cartObject);
    };


    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }

        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
};

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreContextProvider;