import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";
import TaskPage from "./pages/TaskPage";
import TaskCreatePage from "./pages/TaskCreatePage";

function App() {
return ( 
  <BrowserRouter> 
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/tasks/create" element={<TaskCreatePage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
