import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  FolderKanban,
  Target,
  MessageSquare,
  LogOut,
  User,
  GraduationCap,
} from 'lucide-react';
import React from 'react';

const menuItems = [
  { path: '/student', label: 'แดชบอร์ด', icon: LayoutDashboard },
  { path: '/student/projects', label: 'โครงการของฉัน', icon: FolderKanban },
  { path: '/student/milestones', label: 'เป้าหมาย', icon: Target },
  { path: '/student/feedback', label: 'ข้อเสนอแนะ', icon: MessageSquare },
];

export function DashboardLayout_student() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl text-green-700">ติดตามโครงการ</h2>
          <p className="text-xs text-gray-600 mt-1">ระบบมหาวิทยาลัย</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="text-xs text-blue-600 font-medium">นิสิต</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/student'
                ? location.pathname === '/student' || location.pathname === '/student/'
                : location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-end gap-4">
            <span className="text-sm text-gray-700">สมชาย ใจดี</span>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
