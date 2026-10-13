import { useState } from "react";
import type { SubmitEvent } from "react";

function TaskCreatePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log({
            title,
            description,
            status,
        });
    };

    return ( 
        <div>
            <h2>업무 등록</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">업무명</label>
                    <input id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <div>
                    <label htmlFor="description">업무 내용</label>
                    <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>

                <div>
                    <label htmlFor="status">상태</label>
                    <select id="status" value={status} onChange={(event) => setStatus(event.target.value)} >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">진행 중</option>
                        <option value="DONE">완료</option>
                    </select>
                </div>

                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default TaskCreatePage;
