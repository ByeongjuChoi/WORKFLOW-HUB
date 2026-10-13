import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  assigneeId: number | null;
  createdAt: string;
  updatedAt: string;
}

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/api/tasks");
  return response.data;
};

