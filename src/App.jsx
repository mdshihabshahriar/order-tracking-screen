import OrderTrackingScreen from './components/OrderTrackingScreen';
import productImg from './assets/product.png';
import './index.css';

export default function App() {
  return <OrderTrackingScreen productImage={productImg} />;
}
