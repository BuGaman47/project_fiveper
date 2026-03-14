import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FolderKanban, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

// Backend: GET /api/chart → List<Chart> { id, course, projects, completed }
// Backend: GET /api/projects → List<Project> { id, name, student }

interface ChartItem {
  id: number;
  course: string;
  projects: number;
  completed: number;
}

interface Project {
  id: number;
  name: string;
  student: string;
}

const CHART_API_URL = 'http://localhost:8080/api/chart';
const PROJECTS_API_URL = 'http://localhost:8080/api/projects';

export function Dashboard_teacher() {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chartRes, projectsRes] = await Promise.all([
          fetch(CHART_API_URL),
          fetch(PROJECTS_API_URL),
        ]);

        if (!chartRes.ok) throw new Error('Failed to fetch chart data');
        if (!projectsRes.ok) throw new Error('Failed to fetch projects data');

        const chartJson: ChartItem[] = await chartRes.json();
        const projectsJson: Project[] = await projectsRes.json();

        setChartData(chartJson);
        setRecentProjects(projectsJson.slice(0, 5)); // แสดงแค่ 5 โครงการล่าสุด
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('ไม่สามารถโหลดข้อมูลได้');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // คำนวณ summary จาก chartData
  const totalProjects = chartData.reduce((sum, item) => sum + item.projects, 0);
  const totalCompleted = chartData.reduce((sum, item) => sum + item.completed, 0);
  const inProgress = totalProjects - totalCompleted;

  const summaryData = [
    { title: 'โครงการทั้งหมด', value: totalProjects, icon: FolderKanban, color: 'bg-green-500' },
    { title: 'กำลังดำเนินการ', value: inProgress, icon: Clock, color: 'bg-yellow-500' },
    { title: 'เสร็จสิ้น', value: totalCompleted, icon: CheckCircle, color: 'bg-green-600' },
    { title: 'จำนวนวิชา', value: chartData.length, icon: AlertCircle, color: 'bg-red-500' },
  ];

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl text-gray-900">แดชบอร์ด</h1>
        <p className="text-gray-600 mt-1">ยินดีต้อนรับ</p>
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
            {recentProjects.length === 0 ? (
              <p className="text-gray-500 text-sm">ไม่มีข้อมูลโครงการ</p>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-600">{project.student}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}