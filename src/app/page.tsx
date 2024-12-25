"use client";

import { Task } from "@/types";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import Toast from "./components/Toast";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setError(null);
        const response = await fetch("http://localhost:3000/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch tasks"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleComplete = async (taskId: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (response.ok) {
        setTasks(
          tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          )
        );
      }
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks(tasks.filter((t) => t.id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </>
  );
}
