import './Home.css'
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import {useState} from "react";

const Home = () => {

    const [category, setCategory] = useState("All");

    return (
        <div>
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory}/>
            <FoodDisplay category={category}/>
        </div>
    )
}

export default Home