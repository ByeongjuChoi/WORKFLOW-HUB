
package com.workflowhub.backend.service;

import com.workflowhub.backend.dto.EmployeeCreateRequest;
import com.workflowhub.backend.dto.EmployeeResponse;
import com.workflowhub.backend.mapper.EmployeeMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.workflowhub.backend.dto.EmployeeUpdateRequest;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeMapper employeeMapper;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(
            EmployeeMapper employeeMapper,
            PasswordEncoder passwordEncoder
    ) {
        this.employeeMapper = employeeMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<EmployeeResponse> getAllEmployees() {
        return employeeMapper.findAll();
    }

    @Transactional
    public void createEmployee(EmployeeCreateRequest request) {
        if (request.getUsername() == null
                || request.getUsername().isBlank()) {
            throw new IllegalArgumentException("아이디를 입력해 주세요.");
        }

        if (request.getPassword() == null
                || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("비밀번호를 입력해 주세요.");
        }

        if (request.getName() == null
                || request.getName().isBlank()) {
            throw new IllegalArgumentException("이름을 입력해 주세요.");
        }

        if (request.getEmail() == null
                || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("이메일을 입력해 주세요.");
        }

        if (!request.getEmail().matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new IllegalArgumentException("올바른 이메일 주소를 입력해 주세요.");
        }

        if (request.getOrganizationId() == null) {
            throw new IllegalArgumentException("부서를 선택해 주세요.");
        }

        if (employeeMapper.countByOrganizationId(
                request.getOrganizationId()
        ) == 0) {
            throw new IllegalArgumentException("존재하지 않는 부서입니다.");
        }

        if (request.getRole() == null
                || !List.of("SYSTEM_ADMIN", "MANAGER", "EMPLOYEE")
                .contains(request.getRole())) {
            throw new IllegalArgumentException("올바른 권한을 선택해 주세요.");
        }

        if (employeeMapper.countByUsername(request.getUsername()) > 0) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        if (employeeMapper.countByEmail(request.getEmail()) > 0) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        request.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        employeeMapper.insert(request);
    }

    @Transactional
    public void updateEmployee(Long id, EmployeeUpdateRequest request) {
        if (employeeMapper.countById(id) == 0) {
            throw new IllegalArgumentException("직원을 찾을 수 없습니다.");
        }

        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("이름을 입력해 주세요.");
        }

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("이메일을 입력해 주세요.");
        }

        if (!request.getEmail().matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new IllegalArgumentException("올바른 이메일 주소를 입력해 주세요.");
        }

        if (employeeMapper.countByEmailExcludingId(
                request.getEmail(), id
        ) > 0) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        if (request.getOrganizationId() == null
                || employeeMapper.countByOrganizationId(
                request.getOrganizationId()) == 0) {
            throw new IllegalArgumentException("올바른 부서를 선택해 주세요.");
        }

        if (request.getRole() == null
                || !List.of("SYSTEM_ADMIN", "MANAGER", "EMPLOYEE")
                .contains(request.getRole())) {
            throw new IllegalArgumentException("올바른 권한을 선택해 주세요.");
        }

        if (request.getStatus() == null
                || !List.of("ACTIVE", "INACTIVE")
                .contains(request.getStatus())) {
            throw new IllegalArgumentException("올바른 계정 상태를 선택해 주세요.");
        }

        employeeMapper.update(id, request);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        if (employeeMapper.countById(id) == 0) {
            throw new IllegalArgumentException("삭제할 직원을 찾을 수 없습니다.");
        }

        String role = employeeMapper.findRoleById(id);

        if ("SYSTEM_ADMIN".equals(role)) {
            throw new IllegalArgumentException(
                    "시스템 관리자는 삭제할 수 없습니다."
            );
        }

        employeeMapper.deleteById(id);
    }
}
