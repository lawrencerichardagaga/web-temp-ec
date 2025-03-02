import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ProductGrid } from "@/components/products/product-grid";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity,
      });

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-8">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  const discountedPrice = Number(product.price) * (1 - Number(product.discount));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
          {Number(product.discount) > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
              {Math.round(Number(product.discount) * 100)}% OFF
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold">
              KSH {discountedPrice.toFixed(2)}
            </span>
            {Number(product.discount) > 0 && (
              <span className="text-xl text-muted-foreground line-through">
                KSH {Number(product.price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={addToCart.isPending}
              className="flex-1"
            >
              {addToCart.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <ProductGrid category={product.category} />
      </div>
    </div>
  );
}