import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Soko Whole Sale is your one-stop shop for quality products at wholesale prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/deals">Special Deals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/shipping">Shipping Info</Link></li>
              <li><Link href="/returns">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p>&copy; 2024 Soko Whole Sale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
