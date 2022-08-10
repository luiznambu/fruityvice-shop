import { createContext, useState } from 'react';
const CartContext = createContext('CartContext');

export function CartProvider({children}){

    //array que contem os produtos 
    const [cart, setCart] = useState([]);

    // funcao para adicionar um produto no carrinho
    const addToCart = (produtoAtual) => {

        const addProduct = {
            ...produtoAtual,
            qtd: produtoAtual.qtd + 1,
        } 

        //se o produtoatual que esta sendo adicionado ja consta no carrinho ou nao
        const exist = cart.find(produto => produto.id === produtoAtual.id);

        if(exist) { //caso conste, fazer uma varredura no carrinho procurando o produto com id igual, e entao aumentar a propriedade 'qtd'
            const newCart = cart.map((produto) => {
                if(produto.id === produtoAtual.id) {
                    return { ...produto, qtd: produto.qtd + 1} //adiciona +1 na quantidade do produto.id desejado
                } else {
                    return produto;
                }
            });

            setCart(newCart);   //atualiza o carrinho para as novas quantidades
        } else {    
            
            setCart((prevState) => {
                return [...prevState, addProduct] //caso nao exista no carrinho ainda, adiciona o produto
            });
        }
    }

    //deletar todos os produtos do mesmo tipo de uma vez
    function deleteItem(produtoAtual){
        const newCart = cart.filter( //filtra para o novo carrinho apenas os que possuem id diferente do procurado
            (cart) => cart.id !== produtoAtual.id
        )
        setCart(newCart);
    }

    //remover um item (qtd) do carrinho de cada vez, parecido com a funcao de adicionar
    const remFromCart = (produtoAtual) => {


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
                        return deleteItem() //caso quantidade > 1 entao chama a funcao de remover o produto
                    };
                  
                } else {
                    return produto;
                }
            });

            setCart([...newCart]);
        } else {    //caso nao exista no carrinho nao ha o que fazer (nao aparece)
            return cart;
        }
    }

    //context para conectar os filhos e passar as funcoes 
    return (
        <CartContext.Provider value={{ cart, addToCart, setCart, remFromCart, deleteItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;