import { createContext, useState } from 'react';
const CartContext = createContext('CartContext');

export function CartProvider({children}){

    const [cart, setCart] = useState([]);
    const addToCart = (produtoAtual) => {

        const addProduct = {
            ...produtoAtual
        } 

        const exist = cart.find(produto => produto.id === produtoAtual.id);

        if(exist) {
            const newCart = cart.map((produto) => {
                if(produto.id === produtoAtual.id) {
                    return { ...produto, qtd: produto.qtd + 1}
                } else {
                    return produto;
                }
            });

            setCart(newCart);
        } else {
            
            setCart((prevState) => {
                return [...prevState, addProduct]
            });
        }
    }

    function deleteItem(produtoAtual){
        const newCart = cart.filter(
            (cart) => cart.id !== produtoAtual.id
        )
        setCart(newCart);
    }

    const remFromCart = (produtoAtual) => {

        const addProduct = {
            ...produtoAtual
        } 

        const delCart = cart.filter(
            (cart) => cart.id !== produtoAtual.id
        )
        setCart(delCart);

        const exist = cart.find(produto => produto.id === produtoAtual.id);

        if(exist) {
            const newCart = cart.map((produto) => {
                if(produto.id === produtoAtual.id) {
                    if(produto.qtd > 1) {
                        return { ...produto, qtd: produto.qtd - 1}
                    } else {
                        return deleteItem()
                    };
                  
                } else {
                    return produto;
                }
            });

            setCart([...newCart]);
        } else {
            
            setCart((prevState) => {
                return [...prevState, addProduct]
            });
        }
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, setCart, remFromCart, deleteItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;