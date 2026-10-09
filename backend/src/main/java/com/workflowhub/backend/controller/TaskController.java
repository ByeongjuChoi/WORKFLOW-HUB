package com.workflowhub.backend.controller;

import com.workflowhub.backend.Task;
import com.workflowhub.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public String insertTask(@RequestBody Task task) {
        int result = taskService.insertTask(task);

        if (result == 1) {
            return "Task created successfully";
        }
        return "Fail";
    }
}
