import { useContext } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../images/kiwi.svg';
import CartContext from '../context/CartContext'

import "../styles/Navbar.css"

function Navbar() {

    const { cart } = useContext(CartContext);
    const sumItems = cart.reduce(function(acc, obj) { return acc + obj.qtd }, 0);

    return (
        <div className="menu">
            <div className="navbar">
                <div className="leftSide">
                    <img src={Logo} alt="kiwi" className="logo" />
                </div>
                <div className="shopName">
                    <h1>FruityVice shop</h1>
                </div>
                <div className="rightSide">
                    <Link to='/products' className="link">Products</Link>
                    <Link to='/checkout' className="link">Cart { sumItems }</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;