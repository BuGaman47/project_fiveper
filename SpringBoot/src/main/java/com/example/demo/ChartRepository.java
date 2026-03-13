package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Chart;

public interface ChartRepository extends JpaRepository<Chart, Integer>{
}