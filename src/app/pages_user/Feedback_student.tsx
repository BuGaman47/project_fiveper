import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MessageSquare, User, Calendar } from 'lucide-react';
import React from 'react';

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

export function Feedback_student() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">ข้อเสนอแนะ</h1>
        <p className="text-gray-600 mt-1">ข้อเสนอแนะจากอาจารย์</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ข้อเสนอแนะของฉัน</CardTitle>
        </CardHeader>
        <CardContent>
          {feedbackData.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">ยังไม่มีข้อเสนอแนะ</p>
          ) : (
            <div className="space-y-4">
              {feedbackData.map((feedback) => (
                <Card key={feedback.id} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                        <p className="text-sm text-gray-900 leading-relaxed">{feedback.comment}</p>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
