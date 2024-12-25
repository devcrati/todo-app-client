"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm";

interface Task {
  id: string;
  title: string;
  color: string;
}

const EditTask: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const tasks = await response.json();
        const foundTask = tasks.find((t: Task) => t.id == params.id);
        setTask(foundTask || null);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  const handleSubmit = async (data: { title: string; color: string }) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <TaskForm
      initialData={{ title: task.title, color: task.color }}
      onSubmit={handleSubmit}
    />
  );
};

export default EditTask;
