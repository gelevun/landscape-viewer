import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Plus, LogOut, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  // Check for session on component mount and listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Çıkış yapılırken bir hata oluştu.",
      });
    } else {
      toast({
        title: "Başarılı",
        description: "Başarıyla çıkış yapıldı.",
      });
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold text-primary-foreground">
            ArsaPort
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between flex-1 px-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
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
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            className="text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black border-b md:hidden">
            <nav className="container flex flex-col space-y-4 p-4">
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