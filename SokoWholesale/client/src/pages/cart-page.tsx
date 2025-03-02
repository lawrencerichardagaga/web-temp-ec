import { useCart } from "@/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function CartPage() {
  const { items, isLoading, updateQuantity, removeFromCart } = useCart();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cartTotal = items?.reduce((total, item) => {
    const product = products?.find(p => p.id === item.productId);
    if (!product) return total;
    const price = Number(product.price) * (1 - Number(product.discount));
    return total + (price * item.quantity);
  }, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Add some products to your cart to continue shopping.
        </p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => {
            const product = products?.find(p => p.id === item.productId);
            if (!product) return null;

            const price = Number(product.price) * (1 - Number(product.discount));
            const total = price * item.quantity;

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 object-cover rounded"
                />
                <div className="flex-1">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    KSH {price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity.mutate({ 
                      id: item.id, 
                      quantity: item.quantity - 1 
                    })}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity.mutate({ 
                      id: item.id, 
                      quantity: item.quantity + 1 
                    })}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart.mutate(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-right min-w-[100px]">
                  <p className="font-medium">KSH {total.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit sticky top-4">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>KSH {cartTotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>KSH {cartTotal?.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}