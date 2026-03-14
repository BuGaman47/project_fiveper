package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackRepository repo;

    public FeedbackController(FeedbackRepository repo){
        this.repo = repo;
    }

    @GetMapping
    public List<Feedback> getAll(){
        return repo.findAll();
    }

    @PostMapping
public Feedback create(@RequestBody Feedback f) {
    if (f.getInstructorName() == null || f.getInstructorName().isBlank()) {
        f.setInstructorName("อาจารย์");
    }
    if (f.getDate() == null) {
        f.setDate(java.time.LocalDate.now()); // ✅ ใส่ LocalDate แทน String
    }
    return repo.save(f);
}
}
