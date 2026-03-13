package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
public class FeedbackController {

    private final FeedbackRepository repo;

    public FeedbackController(FeedbackRepository repo){
        this.repo=repo;
    }

    @GetMapping
    public List<Feedback> getAll(){
        return repo.findAll();
    }

    @PostMapping
    public Feedback create(@RequestBody Feedback f){
        return repo.save(f);
    }

}
