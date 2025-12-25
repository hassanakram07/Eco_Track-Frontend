import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, ShoppingBag, Truck, Calendar } from 'lucide-react';
import client from '../../api/client';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="p-6 rounded-2xl bg-background-secondary border border-white/5 hover:border-accent-cyan/20 transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-lg ${parseInt(change) > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {change}
            </span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-content-secondary text-sm">{title}</p>
    </div>
);

const AdminDashboard = () => {
    const [recentPickups, setRecentPickups] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeUsers: 0,
        pickupsCompleted: 0,
        productsSold: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [pickupsRes, statsRes] = await Promise.all([
                    client.get('/pickups'),
                    client.get('/admins/stats')
                ]);

                // Sort by date (newest first) and take top 10
                const sorted = pickupsRes.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
                setRecentPickups(sorted);
                setStats(statsRes.data.data);

                setLoading(false);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    change="+12.5%"
                    icon={TrendingUp}
                    color="bg-accent-cyan text-accent-cyan"
                />
                <StatCard
                    title="Active Users"
                    value={stats.activeUsers.toLocaleString()}
                    change="+5.2%"
                    icon={Users}
                    color="bg-purple-500 text-purple-500"
                />
                <StatCard
                    title="Pickups Completed"
                    value={stats.pickupsCompleted.toLocaleString()}
                    change="+18.3%"
                    icon={Truck}
                    color="bg-orange-500 text-orange-500"
                />
                <StatCard
                    title="Products Sold"
                    value={stats.productsSold.toLocaleString()}
                    change="-2.1%"
                    icon={ShoppingBag}
                    color="bg-pink-500 text-pink-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-background-secondary border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Recent Pickups</h3>
                        <button className="text-sm text-accent-cyan hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-white text-center py-10 animate-pulse">Loading activity...</div>
                        ) : recentPickups.length === 0 ? (
                            <div className="text-gray-500 text-center py-10">No recent activity</div>
                        ) : (
                            recentPickups.map((pickup) => (
                                <div key={pickup._id} className="flex items-center justify-between p-4 rounded-xl bg-background-primary/50 hover:bg-background-primary transition-colors border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
                                            {pickup.materialType.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium capitalize">{pickup.materialType}</p>
                                            <p className="text-xs text-content-secondary">
                                                {pickup.quantity} {pickup.unit} • {new Date(pickup.createdAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-gray-500">User: {pickup.customerName || 'Customer'}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${pickup.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                        pickup.status === 'Accepted' ? 'bg-blue-500/10 text-blue-500' :
                                            pickup.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {pickup.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 rounded-2xl bg-background-secondary border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 px-4 rounded-xl bg-accent-cyan/10 text-accent-cyan font-medium border border-accent-cyan/20 hover:bg-accent-cyan hover:text-black transition-all flex items-center justify-center gap-2">
                            <Truck size={18} /> Assign Driver
                        </button>
                        <button className="w-full py-3 px-4 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <TrendingUp size={18} /> Update Pricing
                        </button>
                        <button className="w-full py-3 px-4 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <ShoppingBag size={18} /> Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
