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

export function Projects_student() {
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

  // DELETE /api/project-details/:id
  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('ต้องการลบโครงการนี้ใช่หรือไม่?')) return;

    // Optimistic update
    setProjects((prev) => prev.filter((p) => p.id !== id));

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete project');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('เกิดข้อผิดพลาดในการลบโครงการ กรุณาลองใหม่อีกครั้ง');
      // Reload to restore state
      const response = await fetch(API_URL);
      const data: Project[] = await response.json();
      setProjects(data);
    }
  };

  // POST or PUT
  const handleSaveProject = async () => {
    if (!formData.name || !formData.course || !formData.dueDate) {
      alert('กรุณากรอกข้อมูลให้ครบ (ชื่อโครงการ, รายวิชา, วันครบกำหนด)');
      return;
    }

    setSaving(true);
    try {
      if (editingProject) {
        // PUT /api/project-details/:id
        const response = await fetch(`${API_URL}/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, status: editingProject.status }),
        });
        if (!response.ok) throw new Error('Failed to update project');
        const updated: Project = await response.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? updated : p))
        );
      } else {
        // POST /api/project-details
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, status: '' }),
        });
        if (!response.ok) throw new Error('Failed to create project');
        const created: Project = await response.json();
        setProjects((prev) => [...prev, created]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSaving(false);
    }
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
        <Button onClick={handleAddProject} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มโครงการ
        </Button>
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
                    <TableCell>
                      {project.dueDate
                        ? new Date(project.dueDate).toLocaleDateString('th-TH')
                        : '-'}
                    </TableCell>
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
          )}
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
            <div className="space-y-2">
  <Label>สถานะ</Label>
  <Select
    value={formData.status}
    onValueChange={(value) => setFormData({ ...formData, status: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="เลือกสถานะ" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="ยังไม่เริ่ม">ยังไม่เริ่ม</SelectItem>
      <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
      <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
    </SelectContent>
  </Select>
</div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={saving}>
              ยกเลิก
            </Button>
            <Button
              onClick={handleSaveProject}
              className="bg-green-600 hover:bg-green-700"
              disabled={saving}
            >
              {saving ? 'กำลังบันทึก...' : 'บันทึก'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
