import { useState } from "react";
import ProductList  from "./ProductList.jsx";
import Basket from "./Basket.jsx";
import './App.css';

export default function App() {
  const [products, setProducts] = useState([
    { id: 101, title: "Psychology", price: 28, photo: "https://images.booksense.com/images/568/458/9781465458568.jpg" },
    { id: 102, title: "Philosophy", price: 42.4, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKHts3AOgmZcSG2o3m-Fs1dkfglNm6ymyjaw&s" },
    { id: 103, title: "Biology", price: 12.8, photo: "https://m.media-amazon.com/images/I/81+CjBVdm8L._UF350,350_QL50_.jpg" },
    { id: 104, title: "History", price: 17, photo: "https://m.media-amazon.com/images/I/81tndPuXhSL._AC_UF1000,1000_QL80_.jpg" },
    { id: 105, title: "Math", price: 88, photo: "https://m.media-amazon.com/images/I/911G2nW1exL._AC_UF350,350_QL50_.jpg" },
  ]);

  const [basket, setBasket] = useState([]);

  const moveToCart = product => {
    // const copy = [...basket];
    // copy.push({...product, quantity: 1});
    // setBasket(copy);

    const existing = basket.find(item => item.id === product.id);
    if(existing) {
      setBasket(basket.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item));
    } else {
      setBasket([...basket, {...product, quantity: 1}])
    }
  }

  const increaseQuantity = id => {
    setBasket (
      basket.map(product => 
        product.id !== id ? product : {...product, quantity: product.quantity + 1} 
      )
    )
  }

  const decreaseQuantity = id => {
    let res = basket.map(product => product.id !== id ?
       product :  {...product, quantity: product.quantity - 1})
    .filter(product => product.quantity > 0);

    setBasket(res);
  }

  const deleteItem = id => {
    setBasket(basket.filter(product => product.id !== id));
  }

  return (
    <div>
      <h2>Shop</h2>
      <div className="shop-container">
        <ProductList products={products}
                    moveToCart={moveToCart}
        />

        <Basket basket={basket}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                deleteItem={deleteItem}
        />
      </div>
    </div>
  );
}