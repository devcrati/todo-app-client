"use client";

import { useRouter } from "next/navigation";
import TaskForm from "../components/TaskForm";

const CreateTask: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: { title: string; color: string }) => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return <TaskForm onSubmit={handleSubmit} />;
};

export default CreateTask;
