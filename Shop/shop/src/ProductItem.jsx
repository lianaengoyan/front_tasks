export default function ProductItem({product, moveToCart}) {
    return (
        <div>
            <img src={product.photo}/>
            <p>{product.title}</p>
            <strong>{product.price} USD </strong>
            <button onClick={() => moveToCart(product)}>move</button>
        </div>
    )
}