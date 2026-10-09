package com.workflowhub.backend;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface TaskMapper {
    List<Task> findAll();
}
