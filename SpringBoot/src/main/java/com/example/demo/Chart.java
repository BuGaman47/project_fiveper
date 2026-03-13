package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name = "chart_data")
public class Chart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String course;
    private int projects;
    private int completed;

    public Chart(){}

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getCourse(){
        return course;
    }

    public void setCourse(String course){
        this.course = course;
    }

    public int getProjects(){
        return projects;
    }

    public void setProjects(int projects){
        this.projects = projects;
    }

    public int getCompleted(){
        return completed;
    }

    public void setCompleted(int completed){
        this.completed = completed;
    }
}