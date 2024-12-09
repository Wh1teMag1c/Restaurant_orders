import './FoodDisplay.css'
import {StoreContext} from "../../context/StoreContext.jsx";
import FoodItem from "../FoodItem/FoodItem.jsx";
import {useContext} from "react";
import PropTypes from 'prop-types';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
    return (
        <div className='food-display' id='food-display'>
            <h2>{category === "All" ? "Все блюда" : category}</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item.id} name={item.name} description={item.description}
                                         price={item.price} image={item.image}/>
                    }
                })}
            </div>
        </div>
    )
}

FoodDisplay.propTypes = {
    category: PropTypes.string.isRequired,
};

export default FoodDisplay