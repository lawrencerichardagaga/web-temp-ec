import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function NavBar() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.nav 
      className="bg-primary text-primary-foreground sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/attached_assets/WhatsApp Image 2025-02-26 at 12.28.40(2).jpeg" 
              alt="Soko Whole Sale Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold">Soko Whole Sale</span>
          </Link>

          <div className="flex-1 mx-8">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full max-w-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </motion.div>
              </div>
            ) : (
              <Link href="/auth">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button>Login</Button>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}