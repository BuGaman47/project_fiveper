package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chart")
public class ChartController {

    private final ChartRepository repo;

    public ChartController(ChartRepository repo){
        this.repo=repo;
    }

    @GetMapping
    public List<Chart> getAll(){
        return repo.findAll();
    }
}