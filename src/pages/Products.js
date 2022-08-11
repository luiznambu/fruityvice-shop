import { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext'
import '../styles/Products.css';
import Placeholder from '../images/placeholder.svg';
import Cart from '../images/cart.svg';

function Products() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');

    const { addToCart } = useContext(CartContext);

    //requisicao da api - IMPORTANTE: a api sozinha estava dando erro de CORS, por isso usei um link diferente (que expira a cada 24h)
    //para requisitar outro link, deve-se ir no site justcors e copiar o novo codigo. ex: 'tl_4a216ec'

    //foi feito o fix para esse erro CORS, agora n eh necesasrio link temporario
    async function getData() {
        const res = await fetch('/api/fruit/all');
        const data = await res.json();
        const itensQtd = data.map((dados) => { //aqui foi feito um itensQtd com uma prop de quantidade para ser atualizada conforme necessario no projeto
        return { ...dados, qtd:0};
    });
        setItems(itensQtd); //passando os dados para Items
    } 

    useEffect(() => { //realiza a chamada de API sempre que a pagina eh carregada
        getData();
        console.log(window.location.href)
    }, []);

    const handleFilter = (event) => { //funcao para a barra de procura
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
                // tranforma a string para lower case e procura qualquer 'nome' que contenha a pesquisa
                } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                    return val
                } else {
                    return console.log('not found');
                }
            }).map(item => {
                //destruturando o objeto
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
                                <img src={Cart} alt="cart" className="btn--img" />
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