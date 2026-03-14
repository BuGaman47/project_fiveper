package com.example.demo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "project_details")
public class ProjectDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private String course;

    @Column(name = "due_date")
    private LocalDate dueDate;

    private String status;

    public ProjectDetails() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}