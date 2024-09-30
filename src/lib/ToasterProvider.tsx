import { Toaster } from "react-hot-toast";

function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          zIndex: 40,
        },
        duration: 3500,
      }}
    />
  );
}
export default ToasterProvider;
