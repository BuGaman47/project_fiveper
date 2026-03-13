import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
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
import { Plus, Calendar } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import * as React from 'react';

interface Milestone {
  id: number;
  name: string;
  dueDate: string;
  status: string;
  progress: number;
}

const projects = [
  { id: 1, name: 'โครงการพัฒนาเว็บไซต์' },
  { id: 2, name: 'การออกแบบฐานข้อมูล' },
  { id: 3, name: 'โมเดลแมชชีนเลิร์นนิง' },
];

const initialMilestones: Milestone[] = [
  {
    id: 1,
    name: 'การวางแผนโครงการ',
    dueDate: '2026-03-05',
    status: 'เสร็จสิ้น',
    progress: 100,
  },
  {
    id: 2,
    name: 'การออกแบบ UI',
    dueDate: '2026-03-10',
    status: 'กำลังดำเนินการ',
    progress: 60,
  },
  {
    id: 3,
    name: 'พัฒนา Backend',
    dueDate: '2026-03-15',
    status: 'กำลังดำเนินการ',
    progress: 30,
  },
  {
    id: 4,
    name: 'ทดสอบและเผยแพร่',
    dueDate: '2026-03-20',
    status: 'ยังไม่เริ่ม',
    progress: 0,
  },
];

export function Milestones() {
  const [selectedProject, setSelectedProject] = useState('1');
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
  });

  const handleAddMilestone = () => {
    setFormData({ name: '', dueDate: '' });
    setIsModalOpen(true);
  };

  const handleSaveMilestone = () => {
    const newMilestone: Milestone = {
      id: Math.max(...milestones.map((m) => m.id), 0) + 1,
      ...formData,
      status: 'ยังไม่เริ่ม',
      progress: 0,
    };
    setMilestones([...milestones, newMilestone]);
    setIsModalOpen(false);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setMilestones(
      milestones.map((m) =>
        m.id === id
          ? {
              ...m,
              status: newStatus,
              progress:
                newStatus === 'เสร็จสิ้น' ? 100 :
                newStatus === 'กำลังดำเนินการ' ? 50 : 0,
            }
          : m
      )
    );
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
          <h1 className="text-3xl text-gray-900">เป้าหมาย</h1>
          <p className="text-gray-600 mt-1">ติดตามเป้าหมายและความก้าวหน้าโครงการ</p>
        </div>
        <Button onClick={handleAddMilestone} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มเป้าหมาย
        </Button>
      </div>

      {/* Project Selection */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label htmlFor="project" className="text-gray-700 whitespace-nowrap">
              เลือกโครงการ:
            </Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Milestones List */}
      <div className="grid gap-4">
        {milestones.map((milestone) => (
          <Card key={milestone.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900">{milestone.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>ครบกำหนด: {new Date(milestone.dueDate).toLocaleDateString('th-TH')}</span>
                    </div>
                  </div>
                  <Select
                    value={milestone.status}
                    onValueChange={(value) => handleStatusChange(milestone.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ยังไม่เริ่ม">ยังไม่เริ่ม</SelectItem>
                      <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
                      <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">ความก้าวหน้า</span>
                    <span className="text-gray-900">{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>

                <div>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(milestone.status)}`}>
                    {milestone.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Milestone Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>เพิ่มเป้าหมายใหม่</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="milestoneName">ชื่อเป้าหมาย</Label>
              <Input
                id="milestoneName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="กรอกชื่อเป้าหมาย"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="milestoneDueDate">วันครบกำหนด</Label>
              <Input
                id="milestoneDueDate"
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
            <Button onClick={handleSaveMilestone} className="bg-green-600 hover:bg-green-700">
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}