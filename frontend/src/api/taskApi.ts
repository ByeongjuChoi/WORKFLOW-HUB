
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

// API 요청 전에 JWT 토큰을 자동으로 첨부합니다.
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("workflowHubToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// 인증 오류가 발생하면 로그인 화면으로 이동합니다.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem("workflowHubToken");
            sessionStorage.removeItem("workflowHubUsername");
            sessionStorage.removeItem("workflowHubRole");

            if (window.location.pathname !== "/login") {
                window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    }
);

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

export default api;
