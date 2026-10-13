import { useEffect, useState } from "react";
import { getAllTasks } from "../api/taskApi";
import type { Task } from "../api/taskApi";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        console.error("작업 목록 조회 실패:", err);
        setError("작업 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>작업 목록을 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>WORKFLOW HUB - 작업 목록</h1>

      {tasks.length === 0 ? (
        <p>등록된 작업이 없습니다.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>설명: {task.description || "설명 없음"}</p>
              <p>상태: {task.status}</p>
              <p>담당자 ID: {task.assigneeId ?? "미지정"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
