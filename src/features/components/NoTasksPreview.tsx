import emptySVG from "@/assets/empty.svg";
import { ScrollArea } from "@/components/ui/scroll-area";

const NoTasksPreview = () => {
  return (
    <ScrollArea className="relative w-full h-[calc(100vh-15rem)] md:h-[calc(100vh-12rem)]">
      <div className="lg:w-1/2 lg:mx-auto mt-[7rem] md:mt-[22rem] lg:mt-[10rem]">
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
