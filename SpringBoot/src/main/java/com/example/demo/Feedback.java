package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String comment;

    @Column(name = "instructor_name")
    private String instructorName;

    private String date;

    @Column(name = "project_name")
    private String projectName;

    public Feedback() {}

    // ✅ เพิ่ม Getters & Setters (จำเป็นสำหรับ Jackson serialization)
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }
}