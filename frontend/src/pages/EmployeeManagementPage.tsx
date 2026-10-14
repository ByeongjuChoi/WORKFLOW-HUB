import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./EmployeeManagementPage.css";
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../api/employeeApi";

import type {
    Employee,
    EmployeeCreateRequest,
    EmployeeUpdateRequest,
} from "../api/employeeApi";

type EmployeeRole = "SYSTEM_ADMIN" | "MANAGER" | "EMPLOYEE";
type EmployeeStatus = "ACTIVE" | "INACTIVE";

type EmployeeForm = Omit<
    Employee,
    "id" | "department" | "employmentDate"
> & {
    department: string;
    employmentDate: string;
    password: string;
};

const emptyForm: EmployeeForm = {
    username: "",
    password: "",
    name: "",
    email: "",
    department: "개발부",
    role: "EMPLOYEE",
    status: "ACTIVE",
    employmentDate: "",
};

function getRoleLabel(role: EmployeeRole) {
    switch (role) {
        case "SYSTEM_ADMIN":
            return "시스템 관리자";
        case "MANAGER":
            return "부서 관리자";
        case "EMPLOYEE":
            return "일반 직원";
    }
}

function EmployeeManagementPage() {

    
    const [employees, setEmployees] = useState<Employee[]>([]);           // 직원 목록
    const [isLoading, setIsLoading] = useState(true);                     // 직원 목록을 불러오는 중인지
    const [loadError, setLoadError] = useState("");                       // 조회 실패 시 표시할 오류 메시지

    const [keyword, setKeyword] = useState("");                           // 검색어
    const [departmentFilter, setDepartmentFilter] = useState("ALL");      // 선택한 부서
    const [statusFilter, setStatusFilter] = useState("ALL");              // 선택한 재직 상태

    const [isModalOpen, setIsModalOpen] = useState(false);                // 모달 표시 여부
    const [editingEmployee, setEditingEmployee] =
        useState<Employee | null>(null);                                  // 현재 수정 대상인 직원
    const [form, setForm] = useState<EmployeeForm>(emptyForm);
    const [formError, setFormError] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadEmployees() {
            try {
                setIsLoading(true);
                setLoadError("");

                const data = await getEmployees();

                if (!cancelled) {
                    setEmployees(data);
                }
            } catch (error) {
                if (!cancelled) {
                    setLoadError(
                        error instanceof Error
                            ? error.message
                            : "직원 목록을 불러오지 못했습니다.",
                    );
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        void loadEmployees();

        return () => {
            cancelled = true;
        };
    }, []);

    const departments = Array.from(
        new Set(
            employees
                .map((employee) => employee.department)
                .filter((department): department is string => Boolean(department))
        )
    );

    const filteredEmployees = useMemo(() => {
        const normalizedKeyword = keyword.trim().toLowerCase();

        return employees.filter((employee) => {
            const matchesKeyword = [
                employee.name,
                employee.username,
                employee.email,
            ].some((value) =>
                value.toLowerCase().includes(normalizedKeyword),
            );

            const matchesDepartment =
                departmentFilter === "ALL" ||
                employee.department === departmentFilter;

            const matchesStatus =
                statusFilter === "ALL" ||
                employee.status === statusFilter;

            return (
                matchesKeyword &&
                matchesDepartment &&
                matchesStatus
            );
        });
    }, [employees, keyword, departmentFilter, statusFilter]);

    const activeCount = employees.filter(
        (employee) => employee.status === "ACTIVE",
    ).length;

    const inactiveCount = employees.length - activeCount;

    const openCreateModal = () => {
        setEditingEmployee(null);
        setForm({ ...emptyForm });
        setFormError("");
        setIsModalOpen(true);
    };

    const openEditModal = (employee: Employee) => {
        setEditingEmployee(employee);

        setForm({
            username: employee.username,
            password: "",
            name: employee.name,
            email: employee.email,
            department: employee.department ?? "",
            role: employee.role,
            status: employee.status,
            employmentDate: employee.employmentDate ?? "",
        });

        setFormError("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEmployee(null);
        setFormError("");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        setFormError("");
        setSuccessMessage("");

        const employeeData: EmployeeForm = {
            ...form,
            username: form.username.trim(),
            name: form.name.trim(),
            email: form.email.trim(),
        };

        const duplicateUsername = employees.some(
            (employee) =>
                employee.username.toLowerCase() ===
                    employeeData.username.toLowerCase() &&
                employee.id !== editingEmployee?.id,
        );

        if (duplicateUsername) {
            setFormError("이미 사용 중인 로그인 ID입니다.");
            return;
        }

        const duplicateEmail = employees.some(
            (employee) =>
                employee.email.toLowerCase() ===
                    employeeData.email.toLowerCase() &&
                employee.id !== editingEmployee?.id,
        );

        if (duplicateEmail) {
            setFormError("이미 등록된 이메일입니다.");
            return;
        }

        const departmentIds: Record<string, number> = {
            경영관리부: 1,
            개발부: 2,
            인사부: 3,
            영업부: 4,
        };

        const organizationId = departmentIds[employeeData.department];

        if (!organizationId) {
            setFormError(
                "해당 부서는 백엔드에 등록되어 있지 않습니다.",
            );
            return;
        }

        setIsSubmitting(true);

        try {
            if (editingEmployee) {
                const requestData: EmployeeUpdateRequest = {
                    name: employeeData.name,
                    email: employeeData.email,
                    organizationId,
                    role: employeeData.role,
                    status: employeeData.status,
                    employmentDate: employeeData.employmentDate || null,
                };

                await updateEmployee(editingEmployee.id, requestData);
            } else {
                const requestData: EmployeeCreateRequest = {
                    username: employeeData.username,
                    password: employeeData.password,
                    name: employeeData.name,
                    email: employeeData.email,
                    organizationId,
                    role: employeeData.role,
                    employmentDate: employeeData.employmentDate || null,
                };

                await createEmployee(requestData);
            }

            const updatedEmployees = await getEmployees();
            setEmployees(updatedEmployees);

            closeModal();
            setSuccessMessage(
                editingEmployee
                    ? "직원 정보가 수정되었습니다."
                    : "직원이 성공적으로 등록되었습니다.",
            );
        } catch (error) {
            setFormError(
                error instanceof Error
                    ? error.message
                    : "직원 정보 처리 중 오류가 발생했습니다.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (employee: Employee) => {
        if (employee.role === "SYSTEM_ADMIN") {
            window.alert("시스템 관리자는 이 화면에서 삭제할 수 없습니다.");
            return;
        }

        const confirmed = window.confirm(
            `${employee.name} 직원을 삭제하시겠습니까?`,
        );

        if (!confirmed) {
            return;
        }

        setFormError("");
        setSuccessMessage("");

        try {
            await deleteEmployee(employee.id);

            const updatedEmployees = await getEmployees();
            setEmployees(updatedEmployees);

            setSuccessMessage(`${employee.name} 직원이 삭제되었습니다.`);
        } catch (error) {
            setFormError(
                error instanceof Error
                    ? error.message
                    : "직원 삭제 중 오류가 발생했습니다.",
            );
        }
    };


    return (
        <div className="employee-page">
            <div className="employee-page-heading">
                <div>
                    <p className="employee-eyebrow">USER MANAGEMENT</p>
                    <h1>직원관리</h1>
                    <p className="employee-description">
                        직원 정보와 소속 부서, 계정 상태를 관리합니다.
                    </p>
                </div>

                <button
                    type="button"
                    className="employee-primary-button"
                    onClick={openCreateModal}
                >
                    <span aria-hidden="true">＋</span>
                    직원 등록
                </button>
            </div>

            <section className="employee-summary">
                <article className="employee-summary-card">
                    <div className="employee-summary-icon total-icon">
                        <span aria-hidden="true">♙</span>
                    </div>
                    <div>
                        <p>전체 직원</p>
                        <strong>{employees.length}</strong>
                        <span>명</span>
                    </div>
                </article>

                <article className="employee-summary-card">
                    <div className="employee-summary-icon active-icon">
                        <span aria-hidden="true">✓</span>
                    </div>
                    <div>
                        <p>재직 중</p>
                        <strong>{activeCount}</strong>
                        <span>명</span>
                    </div>
                </article>

                <article className="employee-summary-card">
                    <div className="employee-summary-icon inactive-icon">
                        <span aria-hidden="true">−</span>
                    </div>
                    <div>
                        <p>비활성 계정</p>
                        <strong>{inactiveCount}</strong>
                        <span>명</span>
                    </div>
                </article>
            </section>

            <section className="employee-table-panel">
                <div className="employee-table-heading">
                    <div>
                        <h2>직원 목록</h2>
                        <p>등록된 직원 정보를 확인할 수 있습니다.</p>
                    </div>
                    <span className="employee-result-count">
                        검색 결과 <strong>{filteredEmployees.length}</strong>명
                    </span>
                </div>

                <div className="employee-filters">
                    <label className="employee-search">
                        <span aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            placeholder="이름, 로그인 ID, 이메일 검색"
                            value={keyword}
                            onChange={(event) =>
                                setKeyword(event.target.value)
                            }
                        />
                    </label>

                    <select
                        aria-label="부서 필터"
                        value={departmentFilter}
                        onChange={(event) =>
                            setDepartmentFilter(event.target.value)
                        }
                    >
                        <option value="ALL">전체 부서</option>
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="재직 상태 필터"
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                    >
                        <option value="ALL">전체 상태</option>
                        <option value="ACTIVE">재직 중</option>
                        <option value="INACTIVE">비활성</option>
                    </select>
                </div>

                {successMessage && (
                    <p className="employee-success-message" role="status">
                        {successMessage}
                    </p>
                )}

                <div className="employee-table-wrapper">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>직원</th>
                                <th>로그인 ID</th>
                                <th>부서</th>
                                <th>권한</th>
                                <th>입사일</th>
                                <th>상태</th>
                                <th>관리</th>
                            </tr>
                        </thead>                
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="employee-empty-state">
                                        직원 목록을 불러오는 중입니다...
                                    </td>
                                </tr>
                            ) : loadError ? (
                                <tr>
                                    <td colSpan={7} className="employee-empty-state">
                                        <p>{loadError}</p>
                                        <button
                                            type="button"
                                            className="employee-edit-button"
                                            onClick={() => window.location.reload()}
                                        >
                                            다시 시도
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {filteredEmployees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>
                                                <div className="employee-identity">
                                                    <div className="employee-avatar">
                                                        {employee.name.trim().charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="employee-identity-text">
                                                        <strong>{employee.name}</strong>
                                                        <span>{employee.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="employee-username">
                                                    {employee.username}
                                                </span>
                                            </td>
                                            <td>{employee.department || "-"}</td>
                                            <td>
                                                <span
                                                    className={`employee-role role-${employee.role
                                                        .toLowerCase()
                                                        .replace("_", "-")}`}
                                                >
                                                    {getRoleLabel(employee.role)}
                                                </span>
                                            </td>
                                            <td>{employee.employmentDate || "-"}</td>
                                            <td>
                                                <span
                                                    className={`employee-status ${
                                                        employee.status === "ACTIVE"
                                                            ? "status-active"
                                                            : "status-inactive"
                                                    }`}
                                                >
                                                    <span className="status-dot" />
                                                    {employee.status === "ACTIVE"
                                                        ? "재직 중"
                                                        : "비활성"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="employee-actions">
                                                    <button
                                                        type="button"
                                                        className="employee-edit-button"
                                                        onClick={() => openEditModal(employee)}
                                                    >
                                                        수정
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="employee-delete-button"
                                                        onClick={() => handleDelete(employee)}
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredEmployees.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="employee-empty-state">
                                                검색 조건에 맞는 직원이 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className="employee-modal-backdrop"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <section
                        className="employee-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="employee-modal-title"
                    >
                        <div className="employee-modal-heading">
                            <div>
                                <p className="employee-eyebrow">
                                    EMPLOYEE INFORMATION
                                </p>
                                <h2 id="employee-modal-title">
                                    {editingEmployee ? "직원 정보 수정" : "직원 등록"}
                                </h2>
                            </div>
                            <button
                                type="button"
                                className="employee-modal-close"
                                aria-label="닫기"
                                onClick={closeModal}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="employee-form-grid">
                                <label>
                                    이름 <span>*</span>
                                    <input
                                        required
                                        maxLength={100}
                                        value={form.name}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                name: event.target.value,
                                            })
                                        }
                                        placeholder="직원 이름"
                                    />
                                </label>

                                <label>
                                    로그인 ID <span>*</span>
                                    <input
                                        required
                                        maxLength={100}
                                        pattern="[A-Za-z0-9._-]+"
                                        title="영문자, 숫자, 점, 밑줄, 하이픈만 입력할 수 있습니다."
                                        value={form.username}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                username: event.target.value,
                                            })
                                        }
                                        placeholder="login_id"
                                    />
                                </label>

                                {!editingEmployee && (
                                    <label>
                                        비밀번호 <span>*</span>
                                        <input
                                            required
                                            type="password"
                                            minLength={8}
                                            maxLength={100}
                                            autoComplete="new-password"
                                            value={form.password}
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    password: event.target.value,
                                                })
                                            }
                                            placeholder="비밀번호를 입력해 주세요"
                                        />
                                    </label>
                                )}

                                <label className="employee-form-full">
                                    이메일 <span>*</span>
                                    <input
                                        required
                                        type="email"
                                        maxLength={254}
                                        value={form.email}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                email: event.target.value,
                                            })
                                        }
                                        placeholder="employee@example.com"
                                    />
                                </label>

                                <label>
                                    소속 부서 <span>*</span>
                                    <select
                                        required
                                        value={form.department}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                department: event.target.value,
                                            })
                                        }
                                    >
                                        <option value="경영관리부">경영관리부</option>
                                        <option value="개발부">개발부</option>
                                        <option value="인사부">인사부</option>
                                        <option value="영업부">영업부</option>
                                    </select>
                                </label>

                                <label>
                                    권한 <span>*</span>
                                    <select
                                        required
                                        value={form.role}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                role: event.target.value as EmployeeRole,
                                            })
                                        }
                                    >
                                        <option value="EMPLOYEE">일반 직원</option>
                                        <option value="MANAGER">부서 관리자</option>
                                        <option value="SYSTEM_ADMIN">
                                            시스템 관리자
                                        </option>
                                    </select>
                                </label>

                                <label>
                                    입사일
                                    <input
                                        type="date"
                                        value={form.employmentDate}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                employmentDate: event.target.value,
                                            })
                                        }
                                    />
                                </label>

                                <label>
                                    계정 상태 <span>*</span>
                                    <select
                                        required
                                        value={form.status}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                status: event.target.value as EmployeeStatus,
                                            })
                                        }
                                    >
                                        <option value="ACTIVE">재직 중</option>
                                        <option value="INACTIVE">비활성</option>
                                    </select>
                                </label>
                            </div>

                            {formError && (
                                <p className="employee-form-error" role="alert">
                                    {formError}
                                </p>
                            )}

                            <div className="employee-modal-actions">
                                <button
                                    type="button"
                                    className="employee-cancel-button"
                                    onClick={closeModal}
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="employee-primary-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "처리 중..."
                                        : editingEmployee
                                        ? "수정 완료"
                                        : "직원 등록"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}

export default EmployeeManagementPage;
