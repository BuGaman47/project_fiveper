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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { Plus, Edit, Trash2 } from 'lucide-react';
import React from 'react';

interface Project {
  id: number;
  name: string;
  student: string;
  status: string;
}

const API_URL = 'http://localhost:8080/api/projects';

export function Projects_student() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    student: '',
    status: 'ยังไม่เริ่ม'
  });

  // Fetch
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      student: '',
      status: 'ยังไม่เริ่ม'
    });
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      student: project.student,
      status: project.status
    });
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('ต้องการลบโครงการหรือไม่')) return;

    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    setProjects(projects.filter(p => p.id !== id));
  };

  const handleSaveProject = async () => {

    if (!formData.name || !formData.student) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {

      if (editingProject) {

        const res = await fetch(`${API_URL}/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const updated = await res.json();

        setProjects(projects.map(p =>
          p.id === updated.id ? updated : p
        ));

      } else {

        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const created = await res.json();

        setProjects([...projects, created]);

      }

      setIsModalOpen(false);

    } catch (error) {

      console.error(error);
      alert("บันทึกข้อมูลไม่สำเร็จ");

    }

  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl text-gray-900">โครงการของฉัน</h1>
          <p className="text-gray-600 mt-1">จัดการโครงการ</p>
        </div>

        <Button
          onClick={handleAddProject}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มโครงการ
        </Button>

      </div>

      <Card>
        <CardContent className="p-0">

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>ชื่อโครงการ</TableHead>
                <TableHead>นักศึกษา</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="text-right">จัดการ</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    ไม่มีข้อมูล
                  </TableCell>
                </TableRow>
              ) : (

                projects.map(project => (

                  <TableRow key={project.id}>

                    <TableCell>{project.name}</TableCell>

                    <TableCell>{project.student}</TableCell>

                    <TableCell>

                      <Select
                        value={project.status}
                        onValueChange={async (value) => {

                          const res = await fetch(`${API_URL}/${project.id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              ...project,
                              status: value
                            })
                          });

                          const updated = await res.json();

                          setProjects(projects.map(p =>
                            p.id === updated.id ? updated : p
                          ));

                        }}
                      >

                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="ยังไม่เริ่ม">ยังไม่เริ่ม</SelectItem>
                          <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
                          <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
                        </SelectContent>

                      </Select>

                    </TableCell>

                    <TableCell className="text-right">

                      <div className="flex gap-2 justify-end">

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

                ))

              )}

            </TableBody>

          </Table>

        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              {editingProject ? "แก้ไขโครงการ" : "เพิ่มโครงการ"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <div>
              <Label>ชื่อโครงการ</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
              />
            </div>

            <div>
              <Label>นักศึกษา</Label>
              <Input
                value={formData.student}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    student: e.target.value
                  })
                }
              />
            </div>

            <div>
              <Label>สถานะ</Label>

              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value
                  })
                }
              >

                <SelectTrigger>
                  <SelectValue />
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

            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              ยกเลิก
            </Button>

            <Button
              onClick={handleSaveProject}
              className="bg-green-600 hover:bg-green-700"
            >
              บันทึก
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

    </div>
  );
}