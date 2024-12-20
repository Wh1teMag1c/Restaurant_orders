import './ExploreMenu.css'
import {menu_list} from "../../assets/assets.js"
import PropTypes from 'prop-types'

const ExploreMenu = ({category, setCategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Наше меню</h1>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                             key={index} className='explore-menu-list-item'>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt=""/>
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr/>
        </div>
    )
}

ExploreMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired
}

export default ExploreMenu