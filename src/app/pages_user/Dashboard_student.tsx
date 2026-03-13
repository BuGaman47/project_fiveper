import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FolderKanban, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const summaryData = [
  { title: 'โครงการทั้งหมด', value: '3', icon: FolderKanban, color: 'bg-green-500' },
  { title: 'กำลังดำเนินการ', value: '2', icon: Clock, color: 'bg-yellow-500' },
  { title: 'เสร็จสิ้น', value: '1', icon: CheckCircle, color: 'bg-green-600' },
  { title: 'ใกล้ครบกำหนด', value: '1', icon: AlertCircle, color: 'bg-red-500' },
];

const chartData = [
  { course: 'CS 101', projects: 2, completed: 1 },
  { course: 'CS 201', projects: 1, completed: 0 },
  { course: 'CS 301', projects: 1, completed: 0 },
];

const recentProjects = [
  { name: 'โครงการพัฒนาเว็บไซต์', course: 'CS 101', status: 'กำลังดำเนินการ', progress: 75 },
  { name: 'การออกแบบฐานข้อมูล', course: 'CS 201', status: 'กำลังดำเนินการ', progress: 45 },
  { name: 'โมเดลแมชชีนเลิร์นนิง', course: 'CS 301', status: 'ยังไม่เริ่ม', progress: 0 },
  { name: 'แอปพลิเคชันมือถือ', course: 'CS 101', status: 'เสร็จสิ้น', progress: 100 },
];

export function Dashboard_student() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl text-gray-900">แดชบอร์ด</h1>
        <p className="text-gray-600 mt-1">ยินดีต้อนรับ, สมชาย ใจดี</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{item.title}</p>
                    <p className="text-3xl mt-2 text-gray-900">{item.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>ความก้าวหน้าโครงการแยกตามวิชา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="course" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="projects" fill="#16a34a" name="โครงการทั้งหมด" />
                <Bar dataKey="completed" fill="#22c55e" name="เสร็จสิ้น" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>โครงการล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-600">{project.course}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'เสร็จสิ้น' ? 'bg-green-100 text-green-800' :
                      project.status === 'กำลังดำเนินการ' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
