import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import AuthButtons from "./header/AuthButtons";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

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
        <Logo />

        <div className="hidden md:flex justify-between flex-1 px-4">
          <DesktopNav session={session} />
          <AuthButtons 
            session={session} 
            onLogout={handleLogout} 
            className="hidden md:flex items-center space-x-2"
          />
        </div>

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

        <MobileMenu 
          isOpen={isMenuOpen}
          session={session}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;