import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { MessageSquare, Calendar } from 'lucide-react';
import React from 'react';

interface FeedbackItem {
  id: number;
  comment: string;
  date: string;
  projectName: string;
  studentName: string;
}

const initialFeedback: FeedbackItem[] = [
  {
    id: 1,
    comment: 'ความก้าวหน้าของการออกแบบ UI เป็นไปด้วยดี โปรดเน้นเรื่อง Responsive Design สำหรับอุปกรณ์มือถือเพิ่มเติม',
    date: '2026-02-28',
    projectName: 'โครงการพัฒนาเว็บไซต์',
    studentName: 'สมชาย ใจดี',
  },
  {
    id: 2,
    comment: 'โครงสร้างฐานข้อมูลมีความเหมาะสม แนะนำให้เพิ่ม Index เพื่อเพิ่มประสิทธิภาพ',
    date: '2026-02-27',
    projectName: 'การออกแบบฐานข้อมูล',
    studentName: 'สมหญิง ใจงาม',
  },
];

const projects = [
  { id: 1, name: 'โครงการพัฒนาเว็บไซต์', student: 'สมชาย ใจดี' },
  { id: 2, name: 'การออกแบบฐานข้อมูล', student: 'สมหญิง ใจงาม' },
  { id: 3, name: 'โมเดลแมชชีนเลิร์นนิง', student: 'สมศักดิ์ ทรงไทย' },
];

export function Feedback_teacher() {
  const [selectedProject, setSelectedProject] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(initialFeedback);

  const handleSubmitFeedback = () => {
    if (!selectedProject || !feedbackText.trim()) {
      alert('กรุณาเลือกโครงการและกรอกข้อเสนอแนะ');
      return;
    }
    const project = projects.find((p) => p.id.toString() === selectedProject);
    if (!project) return;
    const newFeedback: FeedbackItem = {
      id: Date.now(),
      comment: feedbackText,
      date: new Date().toISOString().split('T')[0],
      projectName: project.name,
      studentName: project.student,
    };
    setFeedbackList([newFeedback, ...feedbackList]);
    setFeedbackText('');
    setSelectedProject('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">ข้อเสนอแนะ</h1>
        <p className="text-gray-600 mt-1">ให้ข้อเสนอแนะแก่นิสิต</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ให้ข้อเสนอแนะ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectSelect">เลือกโครงการ</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger id="projectSelect">
                  <SelectValue placeholder="เลือกโครงการ" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name} — {project.student}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedbackInput">ข้อเสนอแนะ</Label>
              <Textarea
                id="feedbackInput"
                placeholder="กรอกข้อเสนอแนะของคุณที่นี่..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>
            <Button onClick={handleSubmitFeedback} className="w-full bg-green-600 hover:bg-green-700">
              ส่งข้อเสนอแนะ
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ประวัติข้อเสนอแนะ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {feedbackList.map((feedback) => (
                <Card key={feedback.id} className="border-l-4 border-l-purple-500">
                  <CardContent className="pt-4 pb-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
                        <p className="text-sm text-gray-900 leading-relaxed">{feedback.comment}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 pl-6">
                        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                          {feedback.projectName}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(feedback.date).toLocaleDateString('th-TH')}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 pl-6">นิสิต: {feedback.studentName}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
