import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { format } from "date-fns";
import { useScreenSize } from "@/hooks/useScreenSize";

const Header = () => {
  const { title, color } = usePageTitle();
  const { isSmallScreen, setOpenMenu: setOpen } = useScreenSize();

  return (
    <header>
      <div className={isSmallScreen ? "mb-3" : "invisible"}>
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
            {/* {icon} */}
            <span>{title}</span>
          </h1>
          {title === "My Day" ? (
            <p className="text-sm mt-2">{format(new Date(), "EEEE, d MMMM")}</p>
          ) : null}
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
