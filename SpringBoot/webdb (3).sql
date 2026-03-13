-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 13, 2026 at 07:25 PM
-- Server version: 8.0.45
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `chart_data`
--

CREATE TABLE `chart_data` (
  `id` int NOT NULL,
  `course` varchar(50) DEFAULT NULL,
  `projects` int DEFAULT NULL,
  `completed` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chart_data`
--

INSERT INTO `chart_data` (`id`, `course`, `projects`, `completed`) VALUES
(1, 'CS 101', 4, 3),
(2, 'CS 201', 3, 2),
(3, 'CS 301', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int NOT NULL,
  `comment` text,
  `instructor_name` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `project_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `comment`, `instructor_name`, `date`, `project_name`) VALUES
(1, 'ความก้าวหน้าของการออกแบบ UI เป็นไปด้วยดี โปรดเน้นเรื่อง Responsive Design สำหรับอุปกรณ์มือถือเพิ่มเติม', 'ดร.สมหญิง มีชัย', '2026-02-28', 'โครงการพัฒนาเว็บไซต์'),
(2, 'โครงสร้างฐานข้อมูลมีความเหมาะสม แนะนำให้เพิ่ม Index เพื่อเพิ่มประสิทธิภาพ', 'ศ.ดร.สมชาย วิชาการ', '2026-02-27', 'การออกแบบฐานข้อมูล'),
(3, 'การเตรียมการเริ่มต้นดีมาก อย่าลืมทำเอกสารประกอบโค้ดให้ครบถ้วน', 'ดร.สมหญิง มีชัย', '2026-02-25', 'โครงการพัฒนาเว็บไซต์');

-- --------------------------------------------------------

--
-- Table structure for table `milestones`
--

CREATE TABLE `milestones` (
  `id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `progress` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `milestones`
--

INSERT INTO `milestones` (`id`, `name`, `due_date`, `status`, `progress`) VALUES
(1, 'การวางแผนโครงการ', '2026-03-05', 'เสร็จสิ้น', 100),
(2, 'การออกแบบ UI', '2026-03-10', 'กำลังดำเนินการ', 60),
(3, 'พัฒนา Backend', '2026-03-15', 'กำลังดำเนินการ', 30),
(4, 'ทดสอบและเผยแพร่', '2026-03-20', 'ยังไม่เริ่ม', 0);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `student` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `student`) VALUES
(1, 'โครงการพัฒนาเว็บไซต์', 'สมชาย ใจดี'),
(2, 'การออกแบบฐานข้อมูล', 'สมหญิง ใจงาม'),
(3, 'โมเดลแมชชีนเลิร์นนิง', 'สมศักดิ์ ทรงไทย');

-- --------------------------------------------------------

--
-- Table structure for table `project_details`
--

CREATE TABLE `project_details` (
  `id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `description` text,
  `course` varchar(50) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `project_details`
--

INSERT INTO `project_details` (`id`, `name`, `description`, `course`, `due_date`, `status`) VALUES
(1, 'โครงการพัฒนาเว็บไซต์', 'สร้างเว็บไซต์ที่รองรับหลายขนาดหน้าจอ', 'CS 101', '2026-03-15', 'กำลังดำเนินการ'),
(2, 'การออกแบบฐานข้อมูล', 'ออกแบบและสร้างโครงสร้างฐานข้อมูล', 'CS 201', '2026-03-20', 'กำลังดำเนินการ'),
(3, 'โมเดลแมชชีนเลิร์นนิง', 'ฝึกโมเดลการจำแนกประเภท', 'CS 301', '2026-04-01', 'ยังไม่เริ่ม');

-- --------------------------------------------------------

--
-- Table structure for table `project_progress`
--

CREATE TABLE `project_progress` (
  `id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `course` varchar(50) DEFAULT NULL,
  `progress` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `due_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `project_progress`
--

INSERT INTO `project_progress` (`id`, `name`, `course`, `progress`, `status`, `due_date`) VALUES
(1, 'โครงการพัฒนาเว็บไซต์', 'CS 101', 75, 'ตามแผน', '2026-03-15'),
(2, 'การออกแบบฐานข้อมูล', 'CS 201', 45, 'ตามแผน', '2026-03-20'),
(3, 'โมเดลแมชชีนเลิร์นนิง', 'CS 301', 20, 'มีความเสี่ยง', '2026-04-01'),
(4, 'แอปพลิเคชันมือถือ', 'CS 101', 100, 'เสร็จสิ้น', '2026-02-28'),
(5, 'โครงสร้างพื้นฐาน Cloud', 'CS 401', 90, 'ตามแผน', '2026-03-10');

-- --------------------------------------------------------

--
-- Table structure for table `recent_projects`
--

CREATE TABLE `recent_projects` (
  `id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `course` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `progress` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recent_projects`
--

INSERT INTO `recent_projects` (`id`, `name`, `course`, `status`, `progress`) VALUES
(1, 'โครงการพัฒนาเว็บไซต์', 'CS 101', 'กำลังดำเนินการ', 75),
(2, 'การออกแบบฐานข้อมูล', 'CS 201', 'กำลังดำเนินการ', 45),
(3, 'โมเดลแมชชีนเลิร์นนิง', 'CS 301', 'ยังไม่เริ่ม', 0),
(4, 'แอปพลิเคชันมือถือ', 'CS 101', 'เสร็จสิ้น', 100);

-- --------------------------------------------------------

--
-- Table structure for table `summary_data`
--

CREATE TABLE `summary_data` (
  `id` int NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `value` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `summary_data`
--

INSERT INTO `summary_data` (`id`, `title`, `value`) VALUES
(1, 'โครงการทั้งหมด', NULL),
(2, 'กำลังดำเนินการ', NULL),
(3, 'เสร็จสิ้น', NULL),
(4, 'ใกล้ครบกำหนด', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `summary_stats`
--

CREATE TABLE `summary_stats` (
  `id` int NOT NULL,
  `label` varchar(100) DEFAULT NULL,
  `value` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `summary_stats`
--

INSERT INTO `summary_stats` (`id`, `label`, `value`) VALUES
(1, 'โครงการทั้งหมด', '12'),
(2, 'ความก้าวหน้าเฉลี่ย', '68%'),
(3, 'ตรงเวลา', '8'),
(4, 'เกินกำหนด', '2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `user_id`, `email`, `role`) VALUES
(1, 'สมชาย ใจดี', 'STU001', 'somchai.j@university.ac.th', 'นักศึกษา'),
(2, 'สมหญิง ใจงาม', 'STU002', 'somying.j@university.ac.th', 'นักศึกษา'),
(3, 'ดร.สมหญิง มีชัย', 'INS001', 'somying.m@university.ac.th', 'อาจารย์'),
(4, 'ศ.ดร.สมชาย วิชาการ', 'INS002', 'somchai.w@university.ac.th', 'อาจารย์'),
(5, 'ผู้ดูแลระบบ', 'ADM001', 'admin@university.ac.th', 'ผู้ดูแลระบบ'),
(6, 'พุทธพร เหลืองสีเพชร', 'STU003', 'puttaporn.l@ku.th', 'นักศึกษา');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chart_data`
--
ALTER TABLE `chart_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `milestones`
--
ALTER TABLE `milestones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_details`
--
ALTER TABLE `project_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_progress`
--
ALTER TABLE `project_progress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recent_projects`
--
ALTER TABLE `recent_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `summary_data`
--
ALTER TABLE `summary_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `summary_stats`
--
ALTER TABLE `summary_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chart_data`
--
ALTER TABLE `chart_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_progress`
--
ALTER TABLE `project_progress`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recent_projects`
--
ALTER TABLE `recent_projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `summary_data`
--
ALTER TABLE `summary_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `summary_stats`
--
ALTER TABLE `summary_stats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
