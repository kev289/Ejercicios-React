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
    <div>
      <h2>Carrito de Compras</h2>

      {cart.length > 0 ? (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <br />
                <small>${item.price} c/u</small>
              </div>
              
              <div>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button onClick={() => removeItem(item.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío.</p>
      )}

      <div>
        <p>Total Productos: <strong>{totalItems}</strong></p>
        <p>Total a Pagar: <strong>${totalPrice}</strong></p>
      </div>
    </div>
  );
};

export default ShoppingCart;
