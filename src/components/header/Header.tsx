import { Menu } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setOpen }) => {
  return (
    <header>
      <div>
        <div className="md:hidden mb-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
            onClick={() => setOpen(true)}
          >
            <Menu className="text-primary" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
