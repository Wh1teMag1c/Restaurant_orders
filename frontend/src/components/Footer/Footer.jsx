import './Footer.css'
import {assets} from "../../assets/assets.js";

const Footer = () => {
    return (
        <div className="footer" id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className="footer-content-left_logo" src={assets.white_logo} alt=""/>
                    <p className='footer_content-left_description'>Vasilchuki Chaihona №1 — флагман холдинга, бренд с
                        20-летней историей. Эта сеть ресторанов
                        насчитывает более 40 заведений на территории России и стран СНГ. Дизайн каждого ресторана
                        уникален, а ассортимент блюд представляет собой мировую кухню под руководством бренд-шефа Сергея
                        Сущенко. Отличительной чертой Vasilchuki Chaihona №1 является универсальность: DJ, концертные
                        вечера, детские мастер-классы и оборудованные детские комнаты.</p>
                    <div className="footer-social-icons">
                        <a href="https://vk.com/vasilchuki_msk" target="_blank" rel="noopener noreferrer">
                            <img src={assets.vk_icon} alt="VK Icon"/>
                        </a>
                        <a href="https://t.me/vasilchuki_tg" target="_blank" rel="noopener noreferrer">
                            <img src={assets.telegram_icon} alt="Telegram Icon"/>
                        </a>
                        <a href="https://www.instagram.com/vasilchuki_msk/" target="_blank" rel="noopener noreferrer">
                            <img src={assets.instagram_icon} alt="Instagram Icon"/>
                        </a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>КОМПАНИЯ</h2>
                    <ul>
                        <li>
                            <a href="https://franshiza-vasilchuki.ru/chaihona?utm_source=%D1%81%D0%B0%D0%B9%D1%82+chaihona.ru&utm_medium=%D0%BA%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0+%D0%BC%D0%B5%D0%BD%D1%8E&utm_campaign=%D1%84%D1%83%D1%82%D0%B5%D1%80"
                               target="_blank"
                               rel="noopener noreferrer">
                                Франшиза
                            </a>
                        </li>
                        <li>
                            <a href="https://rastimul.ru/" target="_blank"
                               rel="noopener noreferrer">
                                Вакансии
                            </a>
                        </li>
                        <li>
                            <a href="https://chaihona.ru/delivery" target="_blank"
                               rel="noopener noreferrer">
                                Доставка
                            </a>
                        </li>
                        <li>
                            <a href="https://chaihona.ru/agreement" target="_blank"
                               rel="noopener noreferrer">
                                Пользовательское соглашение
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>КОНТАКТЫ</h2>
                    <ul>
                        <li>+7 (495) 234-02-34</li>
                        <li>vasilchuki@yandex.ru</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">© 2024 Vasilchuki Restaurant Group</p>
        </div>
    )
}

export default Footer