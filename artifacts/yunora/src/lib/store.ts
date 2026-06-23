import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderItem } from '@workspace/api-client-react';

interface CartState {
  items: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
          );
          
          if (existingItemIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
            return { items: newItems };
          }
          
          return { items: [...state.items, item] };
        });
      },
      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.size === size && i.color === color)
          ),
        }));
      },
      updateQuantity: (productId, quantity, size, color) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.productId === productId && i.size === size && i.color === color) {
              return { ...i, quantity: Math.max(1, quantity) };
            }
            return i;
          }),
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'yunora-cart',
    }
  )
);

interface WishlistState {
  items: number[];
  toggleItem: (productId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId) => {
        set((state) => {
          if (state.items.includes(productId)) {
            return { items: state.items.filter((id) => id !== productId) };
          }
          return { items: [...state.items, productId] };
        });
      },
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (productId) => get().items.includes(productId),
    }),
    {
      name: 'yunora-wishlist',
    }
  )
);
