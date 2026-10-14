
const API_BASE_URL = "http://localhost:8080";

export type EmployeeRole = "SYSTEM_ADMIN" | "MANAGER" | "EMPLOYEE";
export type EmployeeStatus = "ACTIVE" | "INACTIVE";

export type Employee = {
    id: number;
    username: string;
    name: string;
    email: string;
    department: string | null;
    role: EmployeeRole;
    status: EmployeeStatus;
    employmentDate: string | null;
};

export async function getEmployees(): Promise<Employee[]> {
    const token = sessionStorage.getItem("workflowHubToken");

    const response = await fetch(`${API_BASE_URL}/api/employees`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        throw new Error(`직원 목록 조회 실패: HTTP ${response.status}`);
    }

    return response.json() as Promise<Employee[]>;
}

export type EmployeeCreateRequest = {
    username: string;
    password: string;
    name: string;
    email: string;
    organizationId: number;
    role: EmployeeRole;
    employmentDate: string | null;
};

export async function createEmployee(
    employee: EmployeeCreateRequest
): Promise<void> {
    const token = sessionStorage.getItem("workflowHubToken");

    const response = await fetch(`${API_BASE_URL}/api/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        throw new Error(
            errorBody?.message ??
            `직원 등록 실패: HTTP ${response.status}`
        );
    }
}


export type EmployeeUpdateRequest = {
    name: string;
    email: string;
    organizationId: number;
    role: EmployeeRole;
    status: EmployeeStatus;
    employmentDate: string | null;
};

export async function updateEmployee(
    id: number,
    employee: EmployeeUpdateRequest
): Promise<void> {
    const token = sessionStorage.getItem("workflowHubToken");

    const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        throw new Error(
            errorBody?.message ??
            `직원 수정 실패: HTTP ${response.status}`
        );
    }
}

export async function deleteEmployee(id: number): Promise<void> {
    const token = sessionStorage.getItem("workflowHubToken");

    const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        throw new Error(
            errorBody?.message ??
            `직원 삭제 실패: HTTP ${response.status}`
        );
    }
}
