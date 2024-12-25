import { FC, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {message}
    </div>
  );
};

export default Toast;
