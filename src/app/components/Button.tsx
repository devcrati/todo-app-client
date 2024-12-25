import { FC } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

interface ButtonProps {
  handleClick: () => void;
  title: string;
  variant?: "create" | "save";
}

const Button: FC<ButtonProps> = ({
  handleClick,
  title,
  variant = "create",
}) => {
  return (
    <button
      onClick={handleClick}
      className="w-full bg-blueDark hover:bg-blue/90 text-white py-4 rounded-lg mb-8 flex items-center justify-center gap-2 font-bold"
    >
      {title}
      {variant === "create" ? (
        <IoMdAddCircleOutline size={24} />
      ) : (
        <IoCheckmark size={24} />
      )}
    </button>
  );
};

export default Button;
