
package com.workflowhub.backend.auth;

import com.workflowhub.backend.user.User;
import com.workflowhub.backend.user.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserMapper userMapper,
            PasswordEncoder passwordEncoder
    ) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(String username, String password) {
        User user = userMapper.findByUsername(username);

        if (user == null) {
            throw new IllegalArgumentException(
                    "아이디 또는 비밀번호가 올바르지 않습니다."
            );
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException(
                    "아이디 또는 비밀번호가 올바르지 않습니다."
            );
        }

        return user;
    }
}
