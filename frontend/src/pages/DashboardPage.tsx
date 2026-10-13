
import { Link } from "react-router-dom";
import "./DashboardPage.css";

function DashboardPage() {
    const username =
        sessionStorage.getItem("workflowHubUsername") ?? "ユーザー";

    return (
        <div className="dashboard">
            <section className="dashboard-welcome">
                <div className="welcome-content">
                    <span className="eyebrow">
                        YOUR WORKSPACE
                    </span>

                    <h1>
                        お疲れ様です、{username} さん
                    </h1>

                    <p>
                        今日の業務状況を確認し、次のアクションを進めましょう。
                    </p>

                    <Link to="/tasks" className="welcome-button">
                        タスクを確認する
                        <span>→</span>
                    </Link>
                </div>

                <div className="welcome-decoration" aria-hidden="true">
                    <div className="decoration-circle circle-one" />
                    <div className="decoration-circle circle-two" />
                    <div className="decoration-card">
                        <div className="decoration-card-top">
                            <span className="decoration-dot" />
                            WORKFLOW
                        </div>
                        <div className="decoration-line line-long" />
                        <div className="decoration-line line-short" />
                        <div className="decoration-progress">
                            <span />
                        </div>
                        <div className="decoration-caption">
                            Make work flow better.
                        </div>
                    </div>
                </div>
            </section>

            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">OVERVIEW</span>
                        <h2>業務メニュー</h2>
                        <p>
                            日々の業務に必要な機能へすばやくアクセスできます。
                        </p>
                    </div>
                </div>

                <div className="dashboard-menu-grid">
                    <Link to="/tasks" className="dashboard-menu-card">
                        <div className="menu-card-top">
                            <div className="menu-icon task-icon">
                                ✓
                            </div>
                            <span className="menu-card-arrow">↗</span>
                        </div>

                        <h3>タスク管理</h3>
                        <p>
                            担当業務やタスクの進捗状況を確認します。
                        </p>

                        <div className="menu-card-footer">
                            <span>タスク一覧へ</span>
                            <span>→</span>
                        </div>
                    </Link>

                    <Link to="/notices" className="dashboard-menu-card">
                        <div className="menu-card-top">
                            <div className="menu-icon notice-icon">
                                ▤
                            </div>
                            <span className="menu-card-arrow">↗</span>
                        </div>

                        <h3>お知らせ</h3>
                        <p>
                            社内のお知らせや共有情報を確認します。
                        </p>

                        <div className="menu-card-footer">
                            <span>お知らせ一覧へ</span>
                            <span>→</span>
                        </div>
                    </Link>

                    <div className="dashboard-menu-card upcoming-card">
                        <div className="menu-card-top">
                            <div className="menu-icon organization-icon">
                                ◫
                            </div>
                            <span className="coming-soon">準備中</span>
                        </div>

                        <h3>組織管理</h3>
                        <p>
                            組織や所属メンバーの情報を管理します。
                        </p>

                        <div className="menu-card-footer disabled-footer">
                            <span>今後対応予定</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dashboard-bottom-grid">
                <div className="dashboard-panel task-panel">
                    <div className="panel-heading">
                        <div>
                            <span className="eyebrow">MY WORK</span>
                            <h2>タスクを管理する</h2>
                        </div>
                        <span className="panel-symbol">✓</span>
                    </div>

                    <p className="panel-description">
                        現在のタスク一覧から、対応が必要な業務や進行中の作業を確認できます。
                    </p>

                    <div className="task-guide">
                        <div className="guide-step">
                            <span className="step-number">01</span>
                            <span>タスク一覧を開く</span>
                        </div>
                        <div className="guide-step">
                            <span className="step-number">02</span>
                            <span>ステータスを確認する</span>
                        </div>
                        <div className="guide-step">
                            <span className="step-number">03</span>
                            <span>優先する業務に取り組む</span>
                        </div>
                    </div>

                    <Link to="/tasks" className="panel-link">
                        タスク一覧を開く <span>→</span>
                    </Link>
                </div>

                <div className="dashboard-panel info-panel">
                    <div className="panel-heading">
                        <div>
                            <span className="eyebrow">SYSTEM INFO</span>
                            <h2>WORKFLOW HUB</h2>
                        </div>
                        <div className="system-status">
                            <span />
                            Workspace
                        </div>
                    </div>

                    <p className="panel-description">
                        社内業務をひとつの場所で管理するためのワークスペースです。
                    </p>

                    <div className="info-divider" />

                    <div className="info-row">
                        <span>ログインユーザー</span>
                        <strong>{username}</strong>
                    </div>

                    <div className="info-row">
                        <span>利用機能</span>
                        <strong>タスク管理・お知らせ</strong>
                    </div>

                    <div className="info-row">
                        <span>バージョン</span>
                        <strong>v1.0</strong>
                    </div>
                </div>
            </section>

            <footer className="dashboard-footer">
                <span>WORKFLOW HUB</span>
                <span>Work smarter, together.</span>
            </footer>
        </div>
    );
}

export default DashboardPage;
