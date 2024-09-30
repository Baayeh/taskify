import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

interface HeaderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setOpen }) => {
  const { title, icon, color } = usePageTitle();

  return (
    <header>
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
      <section className="flex items-center justify-between">
        <div>
          <h1
            className={`text-3xl font-semibold flex items-center gap-x-5 ${color}`}
          >
            {icon}
            <span>{title}</span>
          </h1>
        </div>

        <div>
          {
            // TODO: Add button to change theme and do other stuff
          }
        </div>
      </section>
    </header>
  );
};

export default Header;
