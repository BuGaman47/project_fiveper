package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/milestones")
public class MilestoneController {

    private final MilestoneRepository repo;

    public MilestoneController(MilestoneRepository repo){
        this.repo=repo;
    }

    @GetMapping
    public List<Project> getAll(){
        return repo.findAll();
    }
}