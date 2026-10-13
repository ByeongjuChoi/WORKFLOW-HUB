import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

type LoginResponse = {
    token: string;
    username: string;
    role: string;
};

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const responseText = await response.text();

            let data: LoginResponse | null = null;

            try {
                data = JSON.parse(responseText) as LoginResponse;
            } catch {
                // JSON이 아닌 응답은 오류 메시지로 처리합니다.
            }

            if (!response.ok) {
                setErrorMessage(
                    responseText ||
                    "ログインに失敗しました。"
                );
                return;
            }

            if (!data?.token || !data.username || !data.role) {
                setErrorMessage(
                    "サーバーから正しい応答を取得できませんでした。"
                );
                return;
            }

            sessionStorage.setItem(
                "workflowHubToken",
                data.token
            );
            sessionStorage.setItem(
                "workflowHubUsername",
                data.username
            );
            sessionStorage.setItem(
                "workflowHubRole",
                data.role
            );

            navigate("/dashboard", { replace: true });
        } catch {
            setErrorMessage(
                "サーバーに接続できません。時間をおいて再度お試しください。"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="login-page">
            <section className="login-visual">
                <div className="brand">
                    <div className="brand-icon">
                        <span>W</span>
                    </div>
                    <span className="brand-name">WORKFLOW HUB</span>
                </div>

                <div className="visual-content">
                    <p className="eyebrow">
                        WORKSPACE MANAGEMENT PLATFORM
                    </p>

                    <h1>
                        Work smarter.
                        <br />
                        <span>Grow together.</span>
                    </h1>

                    <p className="visual-description">
                        チームの業務を、もっとシンプルに。
                        <br />
                        タスク管理から進捗確認まで、
                        <br />
                        すべてをひとつの場所で。
                    </p>

                    <div className="preview-card">
                        <div className="preview-header">
                            <div>
                                <span className="preview-label">
                                    WORKSPACE OVERVIEW
                                </span>
                                <h2>Project Dashboard</h2>
                            </div>
                            <span className="status-dot" />
                        </div>

                        <div className="preview-stats">
                            <div className="stat-item">
                                <span>Total Tasks</span>
                                <strong>24</strong>
                            </div>
                            <div className="stat-item">
                                <span>Completed</span>
                                <strong>16</strong>
                            </div>
                            <div className="stat-item">
                                <span>In Progress</span>
                                <strong>08</strong>
                            </div>
                        </div>

                        <div className="progress-heading">
                            <span>Project progress</span>
                            <span>67%</span>
                        </div>

                        <div className="progress-track">
                            <div className="progress-value" />
                        </div>
                    </div>
                </div>

                <p className="visual-footer">
                    ORGANIZE WORK. ACHIEVE MORE.
                </p>
            </section>

            <section className="login-panel">
                <div className="login-form-container">
                    <div className="mobile-brand">
                        <div className="brand-icon">
                            <span>W</span>
                        </div>
                        <span className="brand-name">
                            WORKFLOW HUB
                        </span>
                    </div>

                    <div className="login-heading">
                        <p className="form-eyebrow">
                            WELCOME BACK
                        </p>
                        <h2>ログイン</h2>
                        <p>
                            アカウント情報を入力してください。
                        </p>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-field">
                            <label htmlFor="username">
                                ユーザー名
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="ユーザー名を入力"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                    setErrorMessage("");
                                }}
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="password">
                                パスワード
                            </label>

                            <div className="password-wrapper">
                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="パスワードを入力"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        setErrorMessage("");
                                    }}
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    className="password-toggle"
                                    type="button"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    aria-label={
                                        showPassword
                                            ? "パスワードを隠す"
                                            : "パスワードを表示"
                                    }
                                >
                                    {showPassword ? "隠す" : "表示"}
                                </button>
                            </div>
                        </div>

                        {errorMessage && (
                            <p
                                className="login-error"
                                role="alert"
                            >
                                {errorMessage}
                            </p>
                        )}

                        <button
                            className="login-button"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "ログイン中..."
                                : "ログイン"}
                            {!isLoading && (
                                <span aria-hidden="true">→</span>
                            )}
                        </button>
                    </form>

                    <div className="login-security">
                        <span aria-hidden="true">◇</span>
                        <span>
                            安全なワークスペースへのアクセス
                        </span>
                    </div>
                </div>

                <footer className="login-footer">
                    <span>© 2026 WORKFLOW HUB</span>
                    <span>BUSINESS TASK MANAGEMENT</span>
                </footer>
            </section>
        </main>
    );
}

export default LoginPage;