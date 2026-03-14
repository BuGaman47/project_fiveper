import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
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

// Backend: GET /api/milestones → List<Milestone> { id, name, dueDate, status, progress }
// หมายเหตุ: ยังไม่มี POST/PUT endpoint ใน backend สำหรับ milestones
//           การเพิ่ม/แก้ไขสถานะจะอัปเดตใน local state เท่านั้น

interface Milestone {
  id: number;
  name: string;
  dueDate: string;
  status: string;
  progress: number;
}

const API_URL = 'http://localhost:8080/api/milestones';

export function Milestones_teacher() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', dueDate: '' });

  // Fetch milestones from API
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch milestones');
        const data: Milestone[] = await response.json();
        setMilestones(data);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  const handleAddMilestone = () => {
    setFormData({ name: '', dueDate: '' });
    setIsModalOpen(true);
  };

  // Local state update (ยังไม่มี POST endpoint ใน backend)
  const handleSaveMilestone = () => {
    if (!formData.name || !formData.dueDate) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    const newMilestone: Milestone = {
      id: Math.max(...milestones.map((m) => m.id), 0) + 1,
      name: formData.name,
      dueDate: formData.dueDate,
      status: 'ยังไม่เริ่ม',
      progress: 0,
    };
    setMilestones([...milestones, newMilestone]);
    setIsModalOpen(false);
  };

  // Local state update (ยังไม่มี PUT endpoint ใน backend)
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
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;

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

      {/* Milestones List */}
      {milestones.length === 0 ? (
        <p className="text-gray-500">ไม่มีข้อมูลเป้าหมาย</p>
      ) : (
        <div className="grid gap-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900">{milestone.name}</h3>
                      {milestone.dueDate && (
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            ครบกำหนด: {new Date(milestone.dueDate).toLocaleDateString('th-TH')}
                          </span>
                        </div>
                      )}
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
      )}

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