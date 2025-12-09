import BasketItem from "./BasketItem";

export default function Basket({basket, increaseQuantity, decreaseQuantity, deleteItem}) {
    return (
        <div>
            <h3 id="basket">Basket</h3>
            <table>
                <thead>
                    <th>product</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>subtotal</th>
                    <th>actions</th>
                </thead>

                <tbody>
                    {basket.map(product => (
                        <BasketItem key={product.id}
                                        product={product}
                                        increaseQuantity={increaseQuantity}
                                        decreaseQuantity={decreaseQuantity}
                                        deleteItem={deleteItem}
                        />
                    ))} 
                </tbody>   
            </table>
        </div>
    )
}