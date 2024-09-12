import emptySVG from "@/assets/empty.svg";

const NoTasksPreview = () => {
  return (
    <div className="lg:w-1/2 lg:mx-auto mt-[10rem] md:mt-[22rem] lg:mt-[10rem]">
      <img src={emptySVG} alt="empty" className="w-1/3 mx-auto" />
      <p className="mt-5 text-sm text-primary text-center px-[3rem] sm:w-1/2 sm:px-0 md:w-[65%] lg:w-1/2 mx-auto">
        Tasks show up here if they aren&apos;t part of any lists you&apos;ve
        created.
      </p>
    </div>
  );
};

export default NoTasksPreview;
