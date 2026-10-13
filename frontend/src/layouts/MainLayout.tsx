
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css";

function MainLayout() {
    const navigate = useNavigate();
    const username = sessionStorage.getItem("workflowHubUsername");
    const role = sessionStorage.getItem("workflowHubRole");

    const handleLogout = () => {
        sessionStorage.removeItem("workflowHubToken");
        sessionStorage.removeItem("workflowHubUsername");
        sessionStorage.removeItem("workflowHubRole");

        navigate("/login", { replace: true });
    };

    const getRoleLabel = () => {
        switch (role) {
            case "SYSTEM_ADMIN":
                return "システム管理者";
            case "HR_ADMIN":
                return "人事管理者";
            case "MANAGER":
                return "マネージャー";
            case "ADMIN":
                return "管理者";
            default:
                return "一般社員";
        }
    };

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <div className="brand-mark">W</div>
                    <div className="brand-text">
                        <h1>WORKFLOW</h1>
                        <span>HUB</span>
                    </div>
                </div>

                <div className="sidebar-section-label">
                    WORKSPACE
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="nav-icon">▦</span>
                        <span>ダッシュボード</span>
                    </NavLink>

                    <NavLink
                        to="/tasks"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="nav-icon">✓</span>
                        <span>タスク管理</span>
                    </NavLink>

                    <NavLink
                        to="/notices"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="nav-icon">▤</span>
                        <span>お知らせ</span>
                    </NavLink>
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-help">
                        <div className="help-icon">i</div>
                        <div>
                            <strong>WORKFLOW HUB</strong>
                            <p>社内業務管理システム</p>
                        </div>
                    </div>

                    <span className="sidebar-version">
                        WORKSPACE · v1.0
                    </span>
                </div>
            </aside>

            <div className="app-main">
                <header className="topbar">
                    <div className="topbar-breadcrumb">
                        <span>WORKSPACE</span>
                        <span className="breadcrumb-divider">/</span>
                        <span className="breadcrumb-current">
                            WORKFLOW HUB
                        </span>
                    </div>

                    <div className="topbar-user">
                        <div className="user-avatar">
                            {(username ?? "U").charAt(0).toUpperCase()}
                        </div>

                        <div className="user-details">
                            <span className="user-name">
                                {username ?? "ユーザー"}
                            </span>
                            <span className="user-role">
                                {getRoleLabel()}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            ログアウト ↗
                        </button>
                    </div>
                </header>

                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
