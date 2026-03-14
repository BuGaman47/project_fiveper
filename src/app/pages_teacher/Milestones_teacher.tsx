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
  const [saving, setSaving] = useState(false);
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

  // POST /api/milestones
  const handleSaveMilestone = async () => {
    if (!formData.name || !formData.dueDate) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    setSaving(true);
    try {
      const newMilestone = {
        name: formData.name,
        dueDate: formData.dueDate,
        status: 'ยังไม่เริ่ม',
        progress: 0,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMilestone),
      });

      if (!response.ok) throw new Error('Failed to create milestone');

      const created: Milestone = await response.json();
      setMilestones((prev) => [...prev, created]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating milestone:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSaving(false);
    }
  };

  // PUT /api/milestones/:id
  const handleStatusChange = async (id: number, newStatus: string) => {
    const newProgress =
      newStatus === 'เสร็จสิ้น' ? 100 :
      newStatus === 'กำลังดำเนินการ' ? 50 : 0;

    // Optimistic update
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: newStatus, progress: newProgress } : m
      )
    );

    try {
      const target = milestones.find((m) => m.id === id);
      if (!target) return;

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...target,
          status: newStatus,
          progress: newProgress,
        }),
      });

      if (!response.ok) throw new Error('Failed to update milestone');

      const updated: Milestone = await response.json();
      // Sync with server response
      setMilestones((prev) =>
        prev.map((m) => (m.id === id ? updated : m))
      );
    } catch (error) {
      console.error('Error updating milestone:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ กรุณาลองใหม่อีกครั้ง');
      // Revert optimistic update on error
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, status: milestones.find((x) => x.id === id)?.status ?? m.status } : m
        )
      );
    }
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

     
    </div>
  );
}
