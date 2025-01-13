import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";

interface DesktopNavProps {
  session: Session | null;
}

const DesktopNav = ({ session }: DesktopNavProps) => {
  return (
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
  );
};

export default DesktopNav;