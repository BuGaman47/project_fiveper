package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name="feedback")
public class Feedback {

    @Id
    private int id;

    private String comment;

    @Column(name="instructor_name")
    private String instructorName;

    private String date;

    @Column(name="project_name")
    private String projectName;

    // getters setters
}