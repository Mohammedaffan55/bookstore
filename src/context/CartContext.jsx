import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { cartReducer, initialCartState } from './cartReducer';
import { books, getBook } from '../data/books';
import { readStorage, writeStorage } from '../utils/storage';

const CartContext = createContext(null);
const KEY = 'bookstore_cart';
const FREE_SHIPPING_ABOVE = 999;
const SHIPPING_FEE = 49;

function init() {
  const saved = readStorage(KEY, initialCartState);
  const valid = Array.isArray(saved.items) ? saved.items.filter((i) => getBook(i.id) && i.qty > 0) : [];
  return { items: valid };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, init);

  useEffect(() => {
    writeStorage(KEY, state);
  }, [state]);

  const value = useMemo(() => {
    const lines = state.items.map((i) => ({ ...getBook(i.id), qty: i.qty }));
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
    return {
      lines,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingAbove: FREE_SHIPPING_ABOVE,
      addToCart: (id, qty = 1) => dispatch({ type: 'ADD', id, qty }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      isInCart: (id) => state.items.some((i) => i.id === id),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

export { books };
