package com.example.demo;

// ✅ ไฟล์ใหม่ - DTO ส่งข้อมูล user กลับไปให้ frontend หลัง login สำเร็จ (ไม่ส่ง password)
public class LoginResponses {

    private int id;
    private String userId;
    private String name;
    private String email;
    private String role;

    public LoginResponses(User user) {
        this.id = user.getId();
        this.userId = user.getUserId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
    }

    public int getId() { return id; }
    public String getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
}