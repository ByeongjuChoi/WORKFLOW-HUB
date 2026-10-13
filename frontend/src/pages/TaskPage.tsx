import { Link } from "react-router-dom";
import TaskList from "../components/TaskList";

function TaskPage() {
return (
    <div> 
        <h2>Tasks</h2>
        <p>업무 목록</p>
        <Link to="/tasks/create">업무 등록</Link>

        <hr /> 
        
        <TaskList />
    </div>
);
}

export default TaskPage;
