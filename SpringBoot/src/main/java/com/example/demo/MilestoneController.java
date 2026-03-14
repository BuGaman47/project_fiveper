package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/milestones")
public class MilestoneController {

    private final MilestoneRepository repo;

    public MilestoneController(MilestoneRepository repo){
        this.repo = repo;
    }

    @GetMapping
    public List<Milestone> getAll(){
        return repo.findAll();
    }
    // GET BY ID
    @GetMapping("/{id}")
    public Milestone getById(@PathVariable int id){
        return repo.findById(id).orElse(null);
    }

    @PostMapping
    public Milestone create(@RequestBody Milestone m) {
        return repo.save(m);
    }
     // UPDATE
     @PutMapping("/{id}")
     public Milestone update(@PathVariable int id, @RequestBody Milestone m){
        Milestone existing = repo.findById(id).orElse(null);
         if(existing == null){
            return null;
        }
        existing.setStatus(m.getStatus());
        existing.setProgress(m.getProgress());
         return repo.save(m);
     }
     // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        repo.deleteById(id);
    }
}