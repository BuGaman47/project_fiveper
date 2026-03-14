import React from 'react';
import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
  allowedRole: 'ผู้ดูแลระบบ' | 'อาจารย์' | 'นักศึกษา';
}

// map role → home path (ใช้ redirect เมื่อ role ไม่ตรง)
const roleHomePath: Record<string, string> = {
  'ผู้ดูแลระบบ': '/',
  'อาจารย์': '/teacher',
  'นักศึกษา': '/student',
};

export function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const raw = sessionStorage.getItem('currentUser');

  // ยังไม่ได้ login → ไป /login
  if (!raw) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(raw);

  // login แล้ว แต่ role ไม่ตรงกับ route นี้ → redirect ไปหน้าของ role ตัวเอง
  if (user.role !== allowedRole) {
    const redirectTo = roleHomePath[user.role] ?? '/login';
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
