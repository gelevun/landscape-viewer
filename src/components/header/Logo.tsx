import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <span className="text-lg font-bold text-primary-foreground">ArsaPort</span>
    </Link>
  );
};

export default Logo;