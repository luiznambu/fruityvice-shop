import { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext'
import '../styles/Products.css';
import Placeholder from '../images/placeholder.svg';
import Cart from '../images/cart.svg';

function Products() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');

    const { addToCart } = useContext(CartContext);

    async function getData() {
        const res = await fetch('https://justcors.com/tl_4a216ec/https://www.fruityvice.com/api/fruit/all');
        const data = await res.json();
        const itensQtd = data.map((dados) => {
        return { ...dados, qtd:0};
    });
        setItems(itensQtd);
    } 

    useEffect(() => {
        getData();
    }, []);

    const handleFilter = (event) => {
        setSearch(event.target.value);
    }

  return (
    <div className="container">
        <div className="list">
            <div className="header">
                <h2>Products list</h2>
                <input type="text" placeholder="Search here..." onChange={handleFilter} />
            </div>
            {items.filter((val) => {
                if(search === "") {
                    return val
                } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                    return val
                } else {
                    return console.log('not found');
                }
            }).map(item => {
                const { name, id, genus, family, order  } = item;
                return (
                    <div key={id} className="itemCard">
                        <div className="image">
                            <img src={Placeholder} alt="placeholder" className="placeholder"/>
                        </div>
                        <div className="text">
                            <h3>{name}</h3>
                            <div>
                                <div className="nutrition">
                                    <span className="info">Carb: {item.nutritions.carbohydrates}</span>
                                    <span className="info">Protein: {item.nutritions.protein}</span>
                                    <span className="info">Fat: {item.nutritions.fat}</span>
                                    <span className="info">Cal: {item.nutritions.calories}</span>
                                    <span className="info">Sugar: {item.nutritions.sugar}</span>
                                </div>
                                <div className="specs">
                                    <span className="info">Gender: {genus}</span>
                                    <span className="info">Family: {family}</span>
                                    <span className="info">Order: {order}</span>
                                </div>
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="btn--cart" onClick={() => addToCart(item)}>
                                <img src={Cart} alt="cart" className="btn--img " />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
}

export default Products;