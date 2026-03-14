package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/project-details")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectDetailsController {

    private final ProjectDetailsRepository repo;

    public ProjectDetailsController(ProjectDetailsRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<ProjectDetails> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public ProjectDetails create(@RequestBody ProjectDetails p) {
        if (p.getStatus() == null) p.setStatus("");
        return repo.save(p);
    }

    @PutMapping("/{id}")
    public ProjectDetails update(@PathVariable int id, @RequestBody ProjectDetails p) {
        p.setId(id);
        return repo.save(p);
    }

    // ✅ endpoint สำหรับเปลี่ยนสถานะโดยเฉพาะ
    @PatchMapping("/{id}/status")
    public ProjectDetails updateStatus(@PathVariable int id, @RequestBody java.util.Map<String, String> body) {
        ProjectDetails p = repo.findById(id).orElseThrow();
        p.setStatus(body.get("status"));
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        repo.deleteById(id);
    }
}