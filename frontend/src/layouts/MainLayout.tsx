import { Link, Outlet } from "react-router-dom";

function MainLayout() {
return ( 
    <div> 
        <header> 
            <h1>WORKFLOW HUB</h1>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/notices">Notices</Link>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
    </div>

    );
}

export default MainLayout;
