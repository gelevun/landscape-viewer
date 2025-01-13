import { Link } from "react-router-dom";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";

interface AuthButtonsProps {
  session: Session | null;
  onLogout: () => void;
  className?: string;
  fullWidth?: boolean;
}

const AuthButtons = ({ session, onLogout, className = "", fullWidth = false }: AuthButtonsProps) => {
  return (
    <div className={className}>
      {session ? (
        <Button 
          variant="secondary" 
          onClick={onLogout}
          className={fullWidth ? "w-full justify-start" : ""}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      ) : (
        <>
          <Link to="/auth" className={fullWidth ? "w-full block" : ""}>
            <Button 
              variant="secondary"
              className={fullWidth ? "w-full justify-start mb-2" : ""}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Giriş Yap
            </Button>
          </Link>
          <Link to="/auth" className={fullWidth ? "w-full block" : ""}>
            <Button 
              variant="secondary"
              className={fullWidth ? "w-full justify-start" : ""}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Kayıt Ol
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;