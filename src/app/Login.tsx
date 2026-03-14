import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader } from './components/ui/card';
import React from 'react';

// Backend: POST /api/login  body: { userId, password }
//          → 200 { id, userId, name, email, role }
//          → 401 "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"

const API_URL = 'http://localhost:8080/api/login';

// ✅ map role จาก backend → path ที่จะ redirect ไป
const roleRedirectMap: Record<string, string> = {
  'ผู้ดูแลระบบ': '/',
  'อาจารย์': '/teacher',
  'นักศึกษา': '/student',
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: username, password }),
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        return;
      }

      const user = await response.json();

      // บันทึกข้อมูล user ลง sessionStorage — ProtectedRoute จะอ่านจากนี้
      sessionStorage.setItem('currentUser', JSON.stringify(user));

      // ✅ redirect ตาม role
      const redirectTo = roleRedirectMap[user.role] ?? '/login';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 -z-10"></div>

      <Card className="w-full max-w-md shadow-lg" style={{ borderRadius: '12px' }}>
        <CardHeader className="space-y-6 pt-10 pb-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-green-100 flex items-center justify-center shadow-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695556575317-9d49e3dccf75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbG9nbyUyMGFjYWRlbWljJTIwZW1ibGVtfGVufDF8fHx8MTc3MjQ2NjM0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="University Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl text-gray-900">ระบบติดตามการดำเนินงานของนิสิต</h1>
            <p className="text-sm text-gray-600">เข้าสู่ระบบบัญชีของคุณ</p>
          </div>
        </CardHeader>

        <CardContent className="px-10 pb-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">รหัสผู้ใช้</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="เช่น STU001"
                className="h-11"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">รหัสผ่าน</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                className="h-11"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <a href="#" className="hover:text-green-600 transition-colors">ลืมรหัสผ่าน?</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}