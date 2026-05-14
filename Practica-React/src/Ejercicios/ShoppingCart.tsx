import { useState, useMemo } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialProducts: CartItem[] = [
  { id: 1, name: "Ajazz F75 Max", price: 80, quantity: 1 },
  { id: 2, name: "Ratón Gamer", price: 45, quantity: 1 },
  { id: 3, name: "Monitor 24'", price: 150, quantity: 1 },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>(initialProducts);

  const updateQuantity = (id: number, amount: number) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + amount) } 
        : item
    ));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalItems = useMemo(() => {
    console.log("Calculando total de items...");
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    console.log("Calculando precio total...");
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  return (
    <div className="exercise-container">
      <h2>7. Carrito de Compras (useMemo)</h2>

      {cart.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
          {cart.map(item => (
            <li key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '10px', 
              borderBottom: '1px solid rgba(255,255,255,0.1)' 
            }}>
              <div>
                <strong>{item.name}</strong>
                <br />
                <small>${item.price} c/u</small>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => updateQuantity(item.id, -1)} className="btn" style={{ width: '30px', padding: '5px' }}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="btn" style={{ width: '30px', padding: '5px' }}>+</button>
                <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', color: '#ff4646', cursor: 'pointer', marginLeft: '10px' }}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío.</p>
      )}

      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(100, 108, 255, 0.1)', borderRadius: '12px', textAlign: 'right' }}>
        <p>Total Productos: <strong>{totalItems}</strong></p>
        <p style={{ fontSize: '1.2rem' }}>Total a Pagar: <strong style={{ color: '#646cff' }}>${totalPrice}</strong></p>
      </div>
    </div>
  );
};

export default ShoppingCart;
