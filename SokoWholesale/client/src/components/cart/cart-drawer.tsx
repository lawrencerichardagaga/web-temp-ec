import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

export function CartDrawer({ 
  open, 
  onClose 
}: { 
  open: boolean;
  onClose: () => void;
}) {
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

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;
    await updateQuantity.mutateAsync({ id, quantity });
  };

  const handleRemove = async (id: number) => {
    await removeFromCart.mutateAsync(id);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : !items?.length ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <div className="space-y-4 mt-4">
                {items.map((item) => {
                  const product = products?.find(p => p.id === item.productId);
                  if (!product) return null;

                  const price = Number(product.price) * (1 - Number(product.discount));

                  return (
                    <div key={item.id} className="flex items-center gap-4 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          KSH {price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-medium">
                  KSH {cartTotal?.toFixed(2)}
                </span>
              </div>
              <div className="grid gap-2">
                <Link href="/cart" onClick={onClose}>
                  <Button className="w-full">View Cart</Button>
                </Link>
                <Link href="/checkout" onClick={onClose}>
                  <Button className="w-full" variant="default">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}