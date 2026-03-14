import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
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

const API_URL = 'http://localhost:8080/api/project-details';

export function Projects_teacher() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    course: '',
    dueDate: '',
    status: '', // Default status
  });

  // GET all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({ name: '', description: '', course: '', dueDate: '', status: '' });
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      course: project.course,
      dueDate: project.dueDate,
      status: project.status,
    });
    setIsModalOpen(true);
  };

 

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'เสร็จสิ้น':
        return 'bg-green-100 text-green-800';
      case 'กำลังดำเนินการ':
        return 'bg-yellow-100 text-yellow-800';
      case 'ยังไม่เริ่ม':
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">โครงการของฉัน</h1>
          <p className="text-gray-600 mt-1">จัดการโครงการที่ได้รับมอบหมาย</p>
        </div>
        
      </div>

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          {projects.length === 0 ? (
            <p className="text-gray-500 p-6">ไม่มีข้อมูลโครงการ</p>
          ) : (
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
                    <TableCell>
                      {project.dueDate
                        ? new Date(project.dueDate).toLocaleDateString('th-TH') : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </TableCell> 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
