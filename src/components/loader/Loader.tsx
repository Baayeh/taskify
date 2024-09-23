import { useLoader } from "@/hooks/useLoader";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="absolute inset-0 w-full h-full grid place-content-center bg-background/85">
      <div className="flex flex-col items-center">
        <FadeLoader color="#fff" className="ml-3" />
        <p>Please wait</p>
      </div>
    </div>
  );
};

export default Loader;
