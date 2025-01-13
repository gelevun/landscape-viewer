import { Button } from "@/components/ui/button";
import { Building2, LogIn, Menu, UserPlus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    toast({
      title: "Giriş yapma özelliği",
      description: "Bu özellik yakında eklenecektir.",
    });
  };

  const handleRegister = () => {
    toast({
      title: "Kayıt olma özelliği",
      description: "Bu özellik yakında eklenecektir.",
    });
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8" />
            <span className="text-xl font-bold">ArsaPort</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-primary-foreground">
              İlanlar
            </Button>
            <Button variant="ghost" className="text-primary-foreground">
              Hakkımızda
            </Button>
            <Button variant="ghost" className="text-primary-foreground">
              İletişim
            </Button>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              className="text-primary-foreground"
              onClick={handleLogin}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Giriş Yap
            </Button>
            <Button variant="secondary" onClick={handleRegister}>
              <UserPlus className="mr-2 h-4 w-4" />
              Kayıt Ol
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="text-primary-foreground w-full justify-start">
                İlanlar
              </Button>
              <Button variant="ghost" className="text-primary-foreground w-full justify-start">
                Hakkımızda
              </Button>
              <Button variant="ghost" className="text-primary-foreground w-full justify-start">
                İletişim
              </Button>
              <Button
                variant="ghost"
                className="text-primary-foreground w-full justify-start"
                onClick={handleLogin}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Giriş Yap
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={handleRegister}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Kayıt Ol
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;