
package com.workflowhub.backend.mapper;

import com.workflowhub.backend.dto.EmployeeCreateRequest;
import com.workflowhub.backend.dto.EmployeeResponse;
import com.workflowhub.backend.dto.EmployeeUpdateRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EmployeeMapper {

    List<EmployeeResponse> findAll();

    int insert(@Param("employee") EmployeeCreateRequest employee);
    int countByUsername(@Param("username") String username);
    int countByEmail(@Param("email") String email);
    int countByEmailExcludingId(@Param("email") String email, @Param("id") Long id);
    int countByOrganizationId(@Param("organizationId") Long organizationId);
    int update(@Param("id") Long id, @Param("employee") EmployeeUpdateRequest employee);
    int countById(@Param("id") Long id);
    int deleteById(@Param("id") Long id);
    String findRoleById(@Param("id") Long id);
}