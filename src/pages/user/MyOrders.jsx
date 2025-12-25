import React, { useState, useEffect } from 'react';
import client from "../../api/client";
import { Truck, Calendar, MapPin, Clock } from 'lucide-react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        try {
            // Need to ensure backend has this route, otherwise currently using custom fix
            const res = await client.get('/pickups/my');
            setOrders(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch orders error", err);
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
            case 'accepted': return 'text-blue-500 border-blue-500/20 bg-blue-500/10';
            case 'completed': return 'text-green-500 border-green-500/20 bg-green-500/10';
            case 'rejected': return 'text-red-500 border-red-500/20 bg-red-500/10';
            default: return 'text-gray-500 border-gray-500/20 bg-gray-500/10';
        }
    };

    return (
        <div className="min-h-screen bg-background-primary py-20 px-6 font-poppins">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-white mb-2">My Requests</h1>
                <p className="text-content-secondary mb-8">Track status of your pickup requests</p>

                {loading ? (
                    <div className="text-white animate-pulse">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="bg-background-secondary border border-white/5 rounded-2xl p-10 text-center text-content-secondary">
                        You haven't placed any pickup requests yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-background-secondary border border-white/5 rounded-2xl p-6 hover:border-accent-cyan/30 transition-all">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-accent-cyan/10 text-accent-cyan shrink-0">
                                            <Truck size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-white capitalize">{order.materialType}</h3>
                                                <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-content-secondary text-sm mb-2">{order.quantity} {order.unit}</p>

                                            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1"><Calendar size={12} /> Req: {new Date(order.preferredDate).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><MapPin size={12} /> {order.pickupAddress}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {order.status === 'Accepted' && order.scheduledTime && (
                                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 min-w-[200px]">
                                            <div className="text-green-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                                <Clock size={12} /> Scheduled Pickup
                                            </div>
                                            <div className="text-white font-mono font-bold text-lg">
                                                {new Date(order.scheduledTime).toLocaleString()}
                                            </div>
                                            {order.assignedDriverName && (
                                                <div className="text-xs text-gray-400 mt-1">Driver: {order.assignedDriverName}</div>
                                            )}
                                        </div>
                                    )}

                                    {order.status === 'Rejected' && order.adminResponse && (
                                        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 max-w-xs">
                                            <div className="text-red-500 text-xs font-bold uppercase tracking-wider mb-1">Reason</div>
                                            <p className="text-sm text-gray-400">{order.adminResponse}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
