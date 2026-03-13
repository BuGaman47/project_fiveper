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
import { MessageSquare, User, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import * as React from 'react';

interface FeedbackItem {
  id: number;
  comment: string;
  instructorName: string;
  date: string;
  projectName: string;
}

const feedbackData: FeedbackItem[] = [
  {
    id: 1,
    comment: 'ความก้าวหน้าของการออกแบบ UI เป็นไปด้วยดี โปรดเน้นเรื่อง Responsive Design สำหรับอุปกรณ์มือถือเพิ่มเติม',
    instructorName: 'ดร.สมหญิง มีชัย',
    date: '2026-02-28',
    projectName: 'โครงการพัฒนาเว็บไซต์',
  },
  {
    id: 2,
    comment: 'โครงสร้างฐานข้อมูลมีความเหมาะสม แนะนำให้เพิ่ม Index เพื่อเพิ่มประสิทธิภาพ',
    instructorName: 'ศ.ดร.สมชาย วิชาการ',
    date: '2026-02-27',
    projectName: 'การออกแบบฐานข้อมูล',
  },
  {
    id: 3,
    comment: 'การเตรียมการเริ่มต้นดีมาก อย่าลืมทำเอกสารประกอบโค้ดให้ครบถ้วน',
    instructorName: 'ดร.สมหญิง มีชัย',
    date: '2026-02-25',
    projectName: 'โครงการพัฒนาเว็บไซต์',
  },
];

const projects = [
  { id: 1, name: 'โครงการพัฒนาเว็บไซต์', student: 'สมชาย ใจดี' },
  { id: 2, name: 'การออกแบบฐานข้อมูล', student: 'สมหญิง ใจงาม' },
  { id: 3, name: 'โมเดลแมชชีนเลิร์นนิง', student: 'สมศักดิ์ ทรงไทย' },
];

export function Feedback() {
  const [selectedProject, setSelectedProject] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmitFeedback = () => {
    if (!selectedProject || !feedbackText) {
      alert('กรุณาเลือกโครงการและกรอกข้อเสนอแนะ');
      return;
    }
    console.log('กำลังส่งข้อเสนอแนะ:', { selectedProject, feedbackText });
    setFeedbackText('');
    setSelectedProject('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">ข้อเสนอแนะ</h1>
        <p className="text-gray-600 mt-1">ดูและให้ข้อเสนอแนะโครงการ</p>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="student">มุมมองนักศึกษา</TabsTrigger>
          <TabsTrigger value="instructor">มุมมองอาจารย์</TabsTrigger>
        </TabsList>

        {/* Student View */}
        <TabsContent value="student" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>ข้อเสนอแนะของฉัน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.map((feedback) => (
                  <Card key={feedback.id} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-green-600 mt-1" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 leading-relaxed">
                              {feedback.comment}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 pl-8">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{feedback.instructorName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(feedback.date).toLocaleDateString('th-TH')}</span>
                          </div>
                        </div>
                        <div className="pl-8">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {feedback.projectName}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instructor View */}
        <TabsContent value="instructor" className="space-y-4 mt-6">
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
                        {project.name} - {project.student}
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

              <Button
                onClick={handleSubmitFeedback}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                ส่งข้อเสนอแนะ
              </Button>
            </CardContent>
          </Card>

          {/* Recent Feedback Given */}
          <Card>
            <CardHeader>
              <CardTitle>ข้อเสนอแนะล่าสุดที่ให้</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {feedbackData.slice(0, 2).map((feedback) => (
                  <div key={feedback.id} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="text-sm text-gray-900 mb-2">{feedback.comment}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{feedback.projectName}</span>
                      <span>{new Date(feedback.date).toLocaleDateString('th-TH')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}