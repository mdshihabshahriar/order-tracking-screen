import { IconPackage } from './Icons';

export default function ProductSummary({ product, productImage }) {
  return (
    <div className="product-row">
      <div className="product-image">
        {productImage ? (
          <img src={productImage} alt={product.name} />
        ) : (
          <IconPackage size={28} style={{ color: 'var(--gray-300)' }} />
        )}
      </div>
      <div className="product-details">
        <div className="product-name">{product.name}</div>
        <div className="product-variant">{product.variant}</div>
        <div className="product-price-qty">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-qty">× {product.quantity}</span>
        </div>
      </div>
    </div>
  );
}
