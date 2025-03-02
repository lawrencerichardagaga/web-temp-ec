import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CartItem } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type CartContextType = {
  items: CartItem[] | undefined;
  isLoading: boolean;
  addToCart: ReturnType<typeof useMutation>;
  updateQuantity: ReturnType<typeof useMutation>;
  removeFromCart: ReturnType<typeof useMutation>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  
  const { data: items, isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const addToCart = useMutation({
    mutationFn: async (data: { productId: number; quantity: number }) => {
      const res = await apiRequest("POST", "/api/cart", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error adding to cart",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const res = await apiRequest("PATCH", `/api/cart/${id}`, { quantity });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating cart",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const removeFromCart = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error removing from cart",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
