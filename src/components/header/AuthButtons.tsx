import { Link } from "react-router-dom";
import { LogIn, LogOut, UserPlus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthButtonsProps {
  session: Session | null;
  onLogout: () => void;
  className?: string;
  fullWidth?: boolean;
}

const AuthButtons = ({ session, onLogout, className = "", fullWidth = false }: AuthButtonsProps) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      setUserEmail(session.user.email || "");
      
      // Fetch user profile data
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .single();
        
        if (!error && data) {
          setFirstName(data.first_name || "");
        }
      };

      fetchProfile();
    }
  }, [session]);

  const displayName = firstName || userEmail?.split('@')[0] || "Kullanıcı";

  return (
    <div className={className}>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className={fullWidth ? "w-full justify-start" : ""}>
              <User className="mr-2 h-4 w-4" />
              {displayName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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