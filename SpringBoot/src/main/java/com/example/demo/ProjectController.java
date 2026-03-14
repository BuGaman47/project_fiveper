package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.Project;
import com.example.demo.ProjectRepository;

@RestController
@RequestMapping("/api/projects")

public class ProjectController {

    private final ProjectRepository repo;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
    }

    // GET all
    @GetMapping
    public List<Project> getAll() {
        return repo.findAll();
    }

    // GET by id
    @GetMapping("/{id}")
    public Project getById(@PathVariable int id) {
        return repo.findById(id).orElse(null);
    }

    // CREATE
    @PostMapping
    public Project create(@RequestBody Project project) {
        return repo.save(project);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Project update(@PathVariable int id, @RequestBody Project project) {
        project.setId(id);
        return repo.save(project);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        repo.deleteById(id);
    }
}