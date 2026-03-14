package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginControllers {

    private final UserRepository userRepository;

    public LoginControllers(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // POST /api/login  body: { "email": "xxx@gmail.com", "password": "1234" }
    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequests request) {
        return userRepository.findByEmail(request.getEmail())  // ✅ ค้นหาด้วย email
                .filter(user -> request.getPassword().equals(user.getPassword()))
                .map(user -> ResponseEntity.ok((Object) new LoginResponses(user)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Email หรือรหัสผ่านไม่ถูกต้อง"));
    }
}