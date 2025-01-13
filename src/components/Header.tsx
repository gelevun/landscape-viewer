import { Button } from "@/components/ui/button";
import { Building2, LogIn, Menu, UserPlus, LogOut, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  // Check for session on component mount and listen for auth changes
  useState(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Hata",
        description: "Çıkış yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Başarılı",
        description: "Başarıyla çıkış yapıldı.",
      });
      navigate("/auth");
    }
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
            {session && (
              <Link to="/properties/new">
                <Button variant="secondary">
                  <Plus className="mr-2 h-4 w-4" />
                  İlan Ver
                </Button>
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {session ? (
              <Button variant="secondary" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış Yap
              </Button>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="secondary">
                    <LogIn className="mr-2 h-4 w-4" />
                    Giriş Yap
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="secondary">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Kayıt Ol
                  </Button>
                </Link>
              </>
            )}
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
              {session && (
                <Link to="/properties/new">
                  <Button variant="secondary" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    İlan Ver
                  </Button>
                </Link>
              )}
              {session ? (
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Çıkış Yap
                </Button>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="secondary" className="w-full justify-start">
                      <LogIn className="mr-2 h-4 w-4" />
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="secondary" className="w-full justify-start">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Kayıt Ol
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;