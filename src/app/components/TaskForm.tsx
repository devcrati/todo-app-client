import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Button from "./Button";
import Toast from "./Toast";

const COLORS = [
  "#FF4444",
  "#FF8C00",
  "#FFD700",
  "#4CAF50",
  "#2196F3",
  "#3F51B5",
  "#9C27B0",
  "#E91E63",
  "#795548",
];

interface TaskFormProps {
  initialData?: {
    title: string;
    color: string;
  };
  onSubmit: (data: { title: string; color: string }) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit }) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [selectedColor, setSelectedColor] = useState(
    initialData?.color || COLORS[0]
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      if (title.length > 100) {
        setError("Title must be less than 100 characters");
        return;
      }
      await onSubmit({ title: title.trim(), color: selectedColor });
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen p-4">
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white mb-8"
        >
          <IoArrowBack size={24} />
        </button>

        <div className="space-y-6">
          <div>
            <label className="block text-blue mb-2 font-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Brush your teeth"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue"
            />
          </div>

          <div>
            <label className="block text-blue mb-2 font-bold">Color</label>
            <div className="flex gap-4 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full transition-transform ${
                    selectedColor === color ? "scale-110 ring-2 ring-white" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <Button
            handleClick={handleSubmit}
            title={initialData ? "Save" : "Add Task"}
            variant={initialData ? "save" : "create"}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
