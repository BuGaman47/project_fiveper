import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import * as React from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  course: string;
  dueDate: string;
  status: string;
}

const initialProjects: Project[] = [
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

export function Projects_teacher() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    course: '',
    dueDate: '',
  });

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({ name: '', description: '', course: '', dueDate: '' });
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      course: project.course,
      dueDate: project.dueDate,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleSaveProject = () => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? { ...p, ...formData }
            : p
        )
      );
    } else {
      const newProject: Project = {
        id: Math.max(...projects.map((p) => p.id), 0) + 1,
        ...formData,
        status: 'ยังไม่เริ่ม',
      };
      setProjects([...projects, newProject]);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'เสร็จสิ้น':
        return 'bg-green-100 text-green-800';
      case 'กำลังดำเนินการ':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">โครงการของฉัน</h1>
          <p className="text-gray-600 mt-1">จัดการโครงการที่ได้รับมอบหมาย</p>
        </div>
        <Button onClick={handleAddProject} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มโครงการ
        </Button>
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
                <TableHead className="text-right">การดำเนินการ</TableHead>
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
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'แก้ไขโครงการ' : 'เพิ่มโครงการใหม่'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อโครงการ</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="กรอกชื่อโครงการ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">รายละเอียด</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="กรอกรายละเอียดโครงการ"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">รายวิชา</Label>
              <Select
                value={formData.course}
                onValueChange={(value) => setFormData({ ...formData, course: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรายวิชา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS 101">CS 101 - การเขียนโปรแกรมเบื้องต้น</SelectItem>
                  <SelectItem value="CS 201">CS 201 - โครงสร้างข้อมูล</SelectItem>
                  <SelectItem value="CS 301">CS 301 - อัลกอริธึม</SelectItem>
                  <SelectItem value="CS 401">CS 401 - วิศวกรรมซอฟต์แวร์</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">วันครบกำหนด</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSaveProject} className="bg-green-600 hover:bg-green-700">
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}