"use client";

import { FC } from "react";
import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { FaRegFileAlt } from "react-icons/fa";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  const router = useRouter();
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="max-w-2xl mx-auto -mt-8 px-4">
      <Button
        handleClick={() => router.push("/create")}
        title="Create Task"
        variant="create"
      />

      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 font-bold">
          <span className="text-blue">Tasks</span>
          <span className="bg-gray-800 text-gray-200 px-2 py-0.5 rounded-full text-xs">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <span className="text-purple">Completed</span>
          <span className="bg-gray-800 text-gray-200 px-2 py-0.5 rounded-full text-xs">
            {`${completedTasks} de ${tasks.length}`}
          </span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="border-t border-neutral-700 rounded-lg p-16 flex flex-col items-center">
          <FaRegFileAlt size={80} className="text-gray-600" />
          <h3 className="text-gray-400 text-lg font-medium mb-2">
            You don&apos;t have any tasks registered yet.
          </h3>
          <p className="text-gray-600">
            Create tasks and organize your to-do items.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
