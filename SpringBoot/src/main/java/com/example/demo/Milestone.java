package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name="milestones")
public class Milestone {

    @Id
    private int id;

    private String name;

    @Column(name="due_date")
    private String dueDate;

    private String status;
    private int progress;

}