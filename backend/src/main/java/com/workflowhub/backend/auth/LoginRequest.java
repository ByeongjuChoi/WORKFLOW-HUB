
package com.workflowhub.backend.auth;

public record LoginRequest(
        String username,
        String password
) {
}
