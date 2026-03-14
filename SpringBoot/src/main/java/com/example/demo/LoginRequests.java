package com.example.demo;

// ✅ ไฟล์ใหม่ - DTO รับข้อมูล login จาก frontend
public class LoginRequests {

    private String userId;
    private String password;

    public LoginRequests() {}

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}