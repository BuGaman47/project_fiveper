import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import * as React from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!username || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }
    
    // Simulate login - in a real app, this would call an authentication API
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 -z-10"></div>
      
      <Card className="w-full max-w-md shadow-lg" style={{ borderRadius: '12px' }}>
        <CardHeader className="space-y-6 pt-10 pb-6">
          {/* University Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-green-100 flex items-center justify-center shadow-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695556575317-9d49e3dccf75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbG9nbyUyMGFjYWRlbWljJTIwZW1ibGVtfGVufDF8fHx8MTc3MjQ2NjM0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="University Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* System Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl text-gray-900">
              ระบบติดตามความก้าวหน้าโครงการ
            </h1>
            <p className="text-sm text-gray-600">เข้าสู่ระบบบัญชีของคุณ</p>
          </div>
        </CardHeader>
        
        <CardContent className="px-10 pb-10">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                ชื่อผู้ใช้
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้"
                className="h-11"
              />
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                รหัสผ่าน
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                className="h-11"
              />
            </div>
            
            {/* Error Message Area */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                {error}
              </div>
            )}
            
            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-green-600 hover:bg-green-700 text-white"
            >
              เข้าสู่ระบบ
            </Button>
            
            {/* Additional Links */}
            <div className="text-center text-sm text-gray-600">
              <a href="#" className="hover:text-green-600 transition-colors">
                ลืมรหัสผ่าน?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}