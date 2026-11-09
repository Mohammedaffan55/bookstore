export const MAX_QTY = 10;
export const initialCartState = { items: [] };

// items: [{ id, qty }] - book details are joined in CartContext
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const qty = action.qty ?? 1;
      const existing = state.items.find((i) => i.id === action.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.id ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i
          ),
        };
      }
      return { items: [...state.items, { id: action.id, qty: Math.min(qty, MAX_QTY) }] };
    }
    case 'SET_QTY': {
      if (action.qty <= 0) return { items: state.items.filter((i) => i.id !== action.id) };
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.min(action.qty, MAX_QTY) } : i
        ),
      };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) };
    case 'CLEAR':
      return initialCartState;
    default:
      return state;
  }
}
