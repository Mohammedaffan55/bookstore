import { describe, it, expect } from 'vitest';
import { cartReducer, initialCartState, MAX_QTY } from './cartReducer';

describe('cartReducer', () => {
  it('adds a new book', () => {
    const s = cartReducer(initialCartState, { type: 'ADD', id: 1 });
    expect(s.items).toEqual([{ id: 1, qty: 1 }]);
  });
  it('increases quantity when the book is already in the cart', () => {
    let s = cartReducer(initialCartState, { type: 'ADD', id: 1 });
    s = cartReducer(s, { type: 'ADD', id: 1, qty: 2 });
    expect(s.items[0].qty).toBe(3);
  });
  it('caps quantity at MAX_QTY', () => {
    const s = cartReducer(initialCartState, { type: 'ADD', id: 1, qty: 99 });
    expect(s.items[0].qty).toBe(MAX_QTY);
  });
  it('sets quantity and removes at zero', () => {
    let s = cartReducer(initialCartState, { type: 'ADD', id: 1 });
    s = cartReducer(s, { type: 'SET_QTY', id: 1, qty: 4 });
    expect(s.items[0].qty).toBe(4);
    s = cartReducer(s, { type: 'SET_QTY', id: 1, qty: 0 });
    expect(s.items).toHaveLength(0);
  });
  it('removes and clears', () => {
    let s = cartReducer(initialCartState, { type: 'ADD', id: 1 });
    s = cartReducer(s, { type: 'ADD', id: 2 });
    s = cartReducer(s, { type: 'REMOVE', id: 1 });
    expect(s.items.map((i) => i.id)).toEqual([2]);
    expect(cartReducer(s, { type: 'CLEAR' }).items).toEqual([]);
  });
});
