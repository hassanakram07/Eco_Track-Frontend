import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Truck,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Recycle
} from 'lucide-react';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = React.useNavigate ? React.useNavigate() : null; // Safety check in case of version diff

    // Strict Role Check
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return; // Router will handle unauth via protected route usually, but double check

        try {
            const user = JSON.parse(storedUser);
            if (user.role !== 'Admin' && user.role !== 'Manager') {
                window.location.href = '/'; // Hard redirect if not admin
            }
        } catch (e) {
            console.error(e);
        }
    }, [location]);

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Buying List', path: '/admin/materials', icon: <Recycle size={20} /> },
        { name: 'Shop Products', path: '/admin/products', icon: <ShoppingBag size={20} /> },
        { name: 'Pickup Requests', path: '/admin/pickups', icon: <Truck size={20} /> },
        { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
        { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-background-primary text-content-primary font-poppins">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-background-secondary border-r border-white/5 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-20 flex items-center px-8 border-b border-white/5">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent-cyan flex items-center justify-center">
                                <Recycle size={18} className="text-black" />
                            </div>
                            <span className="text-xl font-bold text-white">Eco_Admin</span>
                        </Link>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 px-4 py-8 space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                        ? 'bg-accent-cyan/10 text-accent-cyan font-semibold border border-accent-cyan/20'
                                        : 'text-content-secondary hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <span className={isActive ? 'text-accent-cyan' : 'text-gray-500 group-hover:text-white'}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="p-4 border-t border-white/5">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/20 mb-2">
                            <div className="w-8 h-8 rounded-full bg-accent-cyan/20 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan font-bold text-xs">
                                AD
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Admin User</p>
                                <p className="text-xs text-content-secondary">Manager</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium">
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-background-primary/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
                    <button
                        className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>

                    <h1 className="text-xl font-bold text-white">
                        {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                    </h1>

                    <div className="flex items-center gap-4">
                        {/* Add Notifications or other actions here */}
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                        <span className="text-sm text-green-500 font-medium">System Online</span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;
