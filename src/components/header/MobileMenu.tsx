import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";
import AuthButtons from "./AuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
  session: Session | null;
  onLogout: () => void;
}

const MobileMenu = ({ isOpen, session, onLogout }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
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
        <AuthButtons 
          session={session} 
          onLogout={onLogout} 
          fullWidth={true}
        />
      </nav>
    </div>
  );
};

export default MobileMenu;