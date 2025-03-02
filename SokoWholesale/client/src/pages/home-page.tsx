import { ProductGrid } from "@/components/products/product-grid";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const CATEGORIES = [
  "Electronics",
  "Sports",
  "Kitchen",
  "Home & Garden",
  "Groceries",
  "Books",
  "Beauty",
  "Fashion"
] as const;

const FEATURED_IMAGES = [
  "https://images.unsplash.com/photo-1506544777-64cfbe1142df",
  "https://images.unsplash.com/photo-1669049722859-454862ea1851",
  "https://images.unsplash.com/photo-1669049710619-759425f48b3e",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Carousel className="w-full max-w-6xl mx-auto my-8">
          <CarouselContent>
            {FEATURED_IMAGES.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-[21/9] relative rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Featured ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <motion.h2 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Featured Products
        </motion.h2>
        <ProductGrid />
      </div>

      <div className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Shop by Category
          </motion.h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {CATEGORIES.map((category) => (
              <motion.div
                key={category}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="aspect-square relative rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/category/${category.toLowerCase()}`}
              >
                <span className="text-lg font-semibold">{category}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}