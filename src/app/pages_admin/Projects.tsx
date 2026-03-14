import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
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

// Backend: GET    /api/projects      → List<Project> { id, name, student }
// Backend: GET    /api/projects/{id} → Project
// Backend: POST   /api/projects      → Project
// Backend: PUT    /api/projects/{id} → Project
// Backend: DELETE /api/projects/{id} → void

interface Project {
  id: number;
  name: string;
  student: string;
}

const API_URL = 'http://localhost:8080/api/projects';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: '', student: '' });

  // Fetch all projects
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
    setFormData({ name: '', student: '' });
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({ name: project.name, student: project.student });
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโครงการนี้?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete project');
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('เกิดข้อผิดพลาดในการลบโครงการ');
    }
  };

  const handleSaveProject = async () => {
    if (!formData.name || !formData.student) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    try {
      if (editingProject) {
        // UPDATE
        const response = await fetch(`${API_URL}/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to update project');
        const updated: Project = await response.json();
        setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        // CREATE
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to create project');
        const created: Project = await response.json();
        setProjects([...projects, created]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกโครงการ');
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
                <TableHead>นักศึกษา</TableHead>
                <TableHead className="text-right">การดำเนินการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-500">
                    ไม่มีข้อมูลโครงการ
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="text-gray-900">{project.name}</TableCell>
                    <TableCell>{project.student}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
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
              <Label htmlFor="student">นักศึกษา</Label>
              <Input
                id="student"
                value={formData.student}
                onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                placeholder="กรอกชื่อนักศึกษา"
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