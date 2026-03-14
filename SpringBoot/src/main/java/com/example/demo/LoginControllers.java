package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// ✅ ไฟล์ใหม่ - endpoint สำหรับ login
@RestController
@RequestMapping("/api/login")
public class LoginControllers {

    private final UserRepository userRepository;

    public LoginControllers(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // POST /api/login  body: { "userId": "STU001", "password": "1234" }
    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequests request) {
        return userRepository.findByUserId(request.getUserId())
                .filter(user -> request.getPassword().equals(user.getPassword()))
                .map(user -> ResponseEntity.ok((Object) new LoginResponses(user)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"));
    }
}