import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Calendar } from 'lucide-react';
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

const milestones: Milestone[] = [
  { id: 1, name: 'การวางแผนโครงการ', dueDate: '2026-03-05', status: 'เสร็จสิ้น', progress: 100 },
  { id: 2, name: 'การออกแบบ UI', dueDate: '2026-03-10', status: 'กำลังดำเนินการ', progress: 60 },
  { id: 3, name: 'พัฒนา Backend', dueDate: '2026-03-15', status: 'กำลังดำเนินการ', progress: 30 },
  { id: 4, name: 'ทดสอบและเผยแพร่', dueDate: '2026-03-20', status: 'ยังไม่เริ่ม', progress: 0 },
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

export function Milestones_student() {
  const [selectedProject, setSelectedProject] = useState('1');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">เป้าหมาย</h1>
        <p className="text-gray-600 mt-1">ติดตามความก้าวหน้าของโครงการ</p>
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

      {/* Milestones List - Read Only */}
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
                  {/* Read-only status badge (no dropdown) */}
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(milestone.status)}`}>
                    {milestone.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">ความก้าวหน้า</span>
                    <span className="text-gray-900">{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
