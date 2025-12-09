export default function BasketItem({product, increaseQuantity, decreaseQuantity, deleteItem}) {
    return (
        <tr>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{Math.ceil(product.quantity * product.price)}</td>

            <td>
                <button onClick={() => increaseQuantity(product.id)}> + </button>
                <button onClick={() => decreaseQuantity(product.id)}> - </button>
                <button onClick={() => deleteItem(product.id)}> X </button>
            </td>
        </tr>
    )
}