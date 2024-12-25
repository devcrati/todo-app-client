"use client";

import { useRouter } from "next/navigation";

const EmptyState: React.FC = () => {
  const router = useRouter();

  const handleCreateTask = (): void => {
    router.push("/create");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="w-full py-4 bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-400">Todo</span>{" "}
            <span className="text-purple-500">App</span>
          </h1>
          <button
            onClick={handleCreateTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Create Task <span className="ml-2">➕</span>
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center mt-10 text-center">
        <div className="flex space-x-10 text-lg mb-6">
          <div>
            <span className="font-bold">Tasks:</span>{" "}
            <span className="text-blue-400">0</span>
          </div>
          <div>
            <span className="font-bold">Completed:</span>{" "}
            <span className="text-green-400">0</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-10 shadow-lg flex flex-col items-center">
          <div className="text-6xl text-gray-500 mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-300">
            You don&apos;t have any tasks registered yet.
          </h2>
          <p className="text-gray-500 mt-2">
            Create tasks and organize your to-do items.
          </p>
        </div>
      </main>
    </div>
  );
};

export default EmptyState;
