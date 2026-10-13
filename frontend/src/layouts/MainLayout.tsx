
import { Link, Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
    const navigate = useNavigate();

    const username = sessionStorage.getItem("workflowHubUsername");

    const handleLogout = () => {
        sessionStorage.removeItem("workflowHubToken");
        sessionStorage.removeItem("workflowHubUsername");
        sessionStorage.removeItem("workflowHubRole");

        navigate("/login", { replace: true });
    };

    return (
        <div>
            <header>
                <h1>WORKFLOW HUB</h1>

                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/tasks">Tasks</Link>
                    <Link to="/notices">Notices</Link>
                </nav>

                <div>
                    <span>
                        {username ?? "ユーザー"}
                    </span>

                    <button
                        type="button"
                        onClick={handleLogout}
                    >
                        ログアウト
                    </button>
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
