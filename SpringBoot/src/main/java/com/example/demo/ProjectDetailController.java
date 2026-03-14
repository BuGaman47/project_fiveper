package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project-details")
public class ProjectDetailController {

    private final ProjectDetailRepository repo;

    public ProjectDetailController(ProjectDetailRepository repo) {
        this.repo = repo;
    }

    // GET all
    @GetMapping
    public List<ProjectDetail> getAll() {
        return repo.findAll();
    }

    // GET by id
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetail> getById(@PathVariable int id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create
    @PostMapping
    public ProjectDetail create(@RequestBody ProjectDetail project) {
        project.setId(0); // ให้ DB auto-generate id
        if (project.getStatus() == null || project.getStatus().isBlank()) {
            project.setStatus("ยังไม่เริ่ม");
        }
        return repo.save(project);
    }

    // PUT - update
    @PutMapping("/{id}")
    public ResponseEntity<ProjectDetail> update(@PathVariable int id,
                                                 @RequestBody ProjectDetail project) {
        return repo.findById(id).map(existing -> {
            if (project.getName() != null)        existing.setName(project.getName());
            if (project.getDescription() != null) existing.setDescription(project.getDescription());
            if (project.getCourse() != null)      existing.setCourse(project.getCourse());
            if (project.getDueDate() != null)     existing.setDueDate(project.getDueDate());
            if (project.getStatus() != null)      existing.setStatus(project.getStatus());
            return ResponseEntity.ok(repo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
