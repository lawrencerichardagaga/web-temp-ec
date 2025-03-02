import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1 });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const discountedPrice = Number(product.price) * (1 - Number(product.discount));

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-4 flex-1">
        <div className="aspect-square relative mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full rounded-md"
          />
          {Number(product.discount) > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {Math.round(Number(product.discount) * 100)}% OFF
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">
            KSH {discountedPrice.toFixed(2)}
          </span>
          {Number(product.discount) > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              KSH {Number(product.price).toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}