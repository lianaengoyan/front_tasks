import ProductItem from "./ProductItem.jsx";

export default function ProductList ({products, moveToCart}) {
    return (
        <div>
            <h3> Products </h3>
            <div className="list">
                {products.map(product => (
                    <ProductItem key={product.id}
                                 product={product} 
                                 moveToCart={moveToCart}
                    />
                ))}
            </div>
        </div>
    )
}