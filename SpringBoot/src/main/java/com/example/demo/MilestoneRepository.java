package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MilestoneRepository extends JpaRepository<Milestone, Integer> {  // ✅ แก้จาก Project → Milestone
}