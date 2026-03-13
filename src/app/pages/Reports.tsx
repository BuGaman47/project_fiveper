import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import * as React from 'react';

const summaryStats = [
  { label: 'โครงการทั้งหมด', value: '12', icon: TrendingUp, color: 'text-green-600' },
  { label: 'ความก้าวหน้าเฉลี่ย', value: '68%', icon: TrendingUp, color: 'text-green-600' },
  { label: 'ตรงเวลา', value: '8', icon: CheckCircle2, color: 'text-green-600' },
  { label: 'เกินกำหนด', value: '2', icon: AlertCircle, color: 'text-red-600' },
];

const projectData = [
  {
    name: 'โครงการพัฒนาเว็บไซต์',
    course: 'CS 101',
    progress: 75,
    status: 'ตามแผน',
    dueDate: '2026-03-15',
  },
  {
    name: 'การออกแบบฐานข้อมูล',
    course: 'CS 201',
    progress: 45,
    status: 'ตามแผน',
    dueDate: '2026-03-20',
  },
  {
    name: 'โมเดลแมชชีนเลิร์นนิง',
    course: 'CS 301',
    progress: 20,
    status: 'มีความเสี่ยง',
    dueDate: '2026-04-01',
  },
  {
    name: 'แอปพลิเคชันมือถือ',
    course: 'CS 101',
    progress: 100,
    status: 'เสร็จสิ้น',
    dueDate: '2026-02-28',
  },
  {
    name: 'โครงสร้างพื้นฐาน Cloud',
    course: 'CS 401',
    progress: 90,
    status: 'ตามแผน',
    dueDate: '2026-03-10',
  },
];

const chartData = [
  { project: 'เว็บไซต์', completion: 75 },
  { project: 'ฐานข้อมูล', completion: 45 },
  { project: 'ML Model', completion: 20 },
  { project: 'Mobile App', completion: 100 },
  { project: 'Cloud Infra', completion: 90 },
];

export function Reports() {
  const handleExportPDF = () => {
    console.log('กำลังส่งออกรายงานเป็น PDF...');
    alert('ฟังก์ชันการส่งออกรายงานจะถูกพัฒนาในส่วนนี้');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'เสร็จสิ้น':
        return 'bg-green-100 text-green-800';
      case 'ตามแผน':
        return 'bg-green-100 text-green-800';
      case 'มีความเสี่ยง':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">รายงาน</h1>
          <p className="text-gray-600 mt-1">วิเคราะห์ความก้าวหน้าและประสิทธิภาพโครงการ</p>
        </div>
        <Button onClick={handleExportPDF} className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          ส่งออกเป็น PDF
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl mt-2 text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion Chart */}
      <Card>
        <CardHeader>
          <CardTitle>เปอร์เซ็นต์ความสำเร็จของโครงการ</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="project" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="completion" fill="#16a34a" name="ความสำเร็จ %" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project Progress Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดความก้าวหน้าโครงการ</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อโครงการ</TableHead>
                <TableHead>รายวิชา</TableHead>
                <TableHead>ความก้าวหน้า</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>วันครบกำหนด</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.map((project, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-900">{project.name}</TableCell>
                  <TableCell>{project.course}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                        <div
                          className={`h-2 rounded-full ${
                            project.progress === 100 ? 'bg-green-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(project.dueDate).toLocaleDateString('th-TH')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}