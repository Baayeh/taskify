import emptySVG from "@/assets/empty.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCheckPathname from "@/hooks/useCheckPathname";

const NoTasksPreview = () => {
  const { isPathnameMyDay } = useCheckPathname();

  return (
    <ScrollArea
      className={`relative w-full h-[calc(100vh-18rem)] md:h-[calc(100vh-15rem)] ${isPathnameMyDay ? "h-[calc(100vh-20rem)] md:h-[calc(100vh-16.8rem)]" : ""}`}
    >
      <div className="lg:w-1/2 lg:mx-auto mt-[7rem] sm:mt-[10rem] md:mt-[22rem] lg:mt-[8rem]">
        <img src={emptySVG} alt="empty" className="w-1/3 mx-auto" />
        <p className="mt-5 text-sm text-primary text-center px-[3rem] sm:w-1/2 sm:px-0 md:w-[65%] mx-auto">
          Tasks show up here if they aren&apos;t part of any lists you&apos;ve
          created.
        </p>
      </div>
    </ScrollArea>
  );
};

export default NoTasksPreview;
