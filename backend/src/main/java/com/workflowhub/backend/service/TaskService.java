package com.workflowhub.backend.service;

import java.util.List;

import com.workflowhub.backend.Task;
import com.workflowhub.backend.TaskMapper;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskMapper taskMapper;

    public TaskService(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    public List<Task> getAllTasks() {
        return taskMapper.findAll();
    }
}
