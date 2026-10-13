
package com.workflowhub.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderTest {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String password = "admin1234";
        String hash = encoder.encode(password);

        System.out.println("BCrypt 해시:");
        System.out.println(hash);

        System.out.println("검증 결과:");
        System.out.println(encoder.matches(password, hash));
    }
}
