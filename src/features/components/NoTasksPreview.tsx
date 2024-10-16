import emptySVG from "@/assets/empty.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCheckPathname from "@/hooks/useCheckPathname";

const NoTasksPreview = () => {
  const { isPathnameMyDay, isPathnameImportant, isPathnamePlanned } =
    useCheckPathname();

  return (
    <ScrollArea
      className={`relative w-full h-[calc(100vh-18rem)] md:h-[calc(100vh-15rem)] ${isPathnameMyDay ? "h-[calc(100vh-20rem)] md:h-[calc(100vh-16.8rem)]" : ""}`}
    >
      <div
        className={`lg:w-1/2 lg:mx-auto mt-[7rem] sm:mt-[10rem] md:mt-[22rem] lg:mt-[8rem] ${isPathnameMyDay ? "bg-black/50 lg:w-[20rem] rounded p-3" : ""}`}
      >
        <img
          src={emptySVG}
          alt="empty"
          className={`w-1/3 mx-auto ${isPathnameMyDay ? "w-1/2" : ""}`}
        />
        <p
          className={`mt-5 text-center px-[3rem] sm:w-1/2 sm:px-0 md:w-[45%] mx-auto ${isPathnameMyDay ? "text-white md:w-[60%]" : "text-sm text-primary"}`}
        >
          {isPathnameMyDay
            ? "You don't have any tasks for today."
            : isPathnameImportant
              ? "Try starring some tasks to see them here."
              : isPathnamePlanned
                ? "Tasks with due dates or reminders show up here."
                : "Tasks show up here if they aren't part of any lists you've created."}
        </p>
      </div>
    </ScrollArea>
  );
};

export default NoTasksPreview;
