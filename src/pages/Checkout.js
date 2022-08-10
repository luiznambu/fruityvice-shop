import React from 'react';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import '../styles/Checkout.css'
import Placeholder from '../images/placeholder.svg';
import CartEmpty from '../images/cart-empty.svg';
import Remove from '../images/remove.svg';


function Checkout() {
  const { cart, addToCart, remFromCart, deleteItem } = useContext(CartContext);
  
  return (
    <div className="container">
      <div className="list">
        <div className="header">
          <h2>Your cart</h2>
        </div>        

        { cart.length > 0 ? (

          cart.map((item) => {

            return (
              <div key={item.id}>
                <div className="itemCard">
                  <div className="image">
                    <img src={Placeholder} alt="" />
                  </div>
                  <div className="text">
                    <h3>{ item.name }</h3>
                  
                    <div className="nutrition">
                        <span className="info">Carb: {item.nutritions.carbohydrates}</span>
                        <span className="info">Protein: {item.nutritions.protein}</span>
                        <span className="info">Fat: {item.nutritions.fat}</span>
                        <span className="info">Cal: {item.nutritions.calories}</span>
                        <span className="info">Sugar: {item.nutritions.sugar}</span>
                    </div>
                    <div className="specs">
                        <span className="info">Gender: {item.genus}</span>
                        <span className="info">Family: {item.family}</span>
                        <span className="info">Order: {item.order}</span>
                    </div>
                  </div>
                  <div>
                    <div className="qtd">
                      <h4>qtde: { item.qtd }</h4>
                    </div>
                    <div className="buttons" >
                      {/* botoes de adicionar e remover a quantidade de itens no carrinho, e em seguida, o botao de remover o item inteiro */}
                      <button className="btn" onClick={() => addToCart(item)} >+</button>
                      <button className="btn" onClick={() => remFromCart(item)}>-</button>
                      <button className="btn">
                        <img src={Remove} alt="remove" className="btn--img" onClick={() => deleteItem(item)} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })

        ) : (

          <div className="empty--text">
            <img src={CartEmpty} alt="cartempty" className="empty--cart"/>
            <h3>cart is empty</h3>
          </div>

        )}

      </div>
    </div>
  )
}

export default Checkout;