package com.example.demo;

// ✅ ไฟล์ใหม่ - DTO รับข้อมูล login จาก frontend
public class LoginRequests {

    private String email;
    private String password;

    public LoginRequests() {}

    public String getEmail() { return email; }
    public void setUserId(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getemail() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getemail'");
    }
}