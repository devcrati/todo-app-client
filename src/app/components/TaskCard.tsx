import { FC } from "react";
import { Task } from "../../types";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { MdOutlineCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, onToggleComplete, onDelete }) => {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(`/tasks/${task.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`flex items-center justify-between p-4 rounded-lg mb-2 transition-all duration-200 cursor-pointer ${
        task.completed
          ? "bg-[#262626] opacity-80"
          : "bg-[#262626] hover:bg-gray-700 border border-[#333333]"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="text-2xl focus:outline-none transition-colors duration-200"
        >
          {task.completed ? (
            <FaCheckCircle className="text-purple hover:text-purple/80" />
          ) : (
            <MdOutlineCircle className="text-blue hover:text-blue/80" />
          )}
        </button>
        <span
          className={`transition-all duration-200 ${
            task.completed ? "line-through text-gray-500" : "text-white"
          }`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={handleDelete}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TaskCard;
