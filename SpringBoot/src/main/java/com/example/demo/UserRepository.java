package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    // ✅ เพิ่ม method สำหรับค้นหา user ด้วย userId (ใช้ใน LoginController)
    Optional<User> findByUserId(String userId);
}