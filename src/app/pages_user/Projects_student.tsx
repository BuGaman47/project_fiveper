import { Card, CardContent } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import * as React from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  course: string;
  dueDate: string;
  status: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'โครงการพัฒนาเว็บไซต์',
    description: 'สร้างเว็บไซต์ที่รองรับหลายขนาดหน้าจอ',
    course: 'CS 101',
    dueDate: '2026-03-15',
    status: 'กำลังดำเนินการ',
  },
  {
    id: 2,
    name: 'การออกแบบฐานข้อมูล',
    description: 'ออกแบบและสร้างโครงสร้างฐานข้อมูล',
    course: 'CS 201',
    dueDate: '2026-03-20',
    status: 'กำลังดำเนินการ',
  },
  {
    id: 3,
    name: 'โมเดลแมชชีนเลิร์นนิง',
    description: 'ฝึกโมเดลการจำแนกประเภท',
    course: 'CS 301',
    dueDate: '2026-04-01',
    status: 'ยังไม่เริ่ม',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'เสร็จสิ้น':
      return 'bg-green-100 text-green-800';
    case 'กำลังดำเนินการ':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function Projects_student() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">โครงการของฉัน</h1>
        <p className="text-gray-600 mt-1">โครงการที่ได้รับมอบหมาย</p>
      </div>

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อโครงการ</TableHead>
                <TableHead>รายวิชา</TableHead>
                <TableHead>วันครบกำหนด</TableHead>
                <TableHead>สถานะ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-600">{project.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{project.course}</TableCell>
                  <TableCell>{new Date(project.dueDate).toLocaleDateString('th-TH')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
