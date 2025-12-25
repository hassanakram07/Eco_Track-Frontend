import React, { useState, useEffect } from 'react';
import client from '../../api/client';
import { Package, Truck, CheckCircle, Clock, MapPin, Search } from 'lucide-react';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await client.get('/orders');
            setOrders(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch orders failed", err);
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            // Ideally: PUT /api/orders/:id/status
            // For now, optimistic update or assume endpoint exists/mock it
            // const res = await client.put(\`/orders/\${id}\`, { status });
            // Refreshing list for now to simulate
            const updatedOrders = orders.map(o => o._id === id ? { ...o, status } : o);
            setOrders(updatedOrders);
            alert(`Order marked as ${status}`);
        } catch (err) {
            alert("Update failed");
        }
    };

    const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Customer Orders</h2>
                    <p className="text-content-secondary">Manage and track product shipments.</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['All', 'Pending', 'Shipped', 'Delivered'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px - 4 py - 2 rounded - full text - sm font - bold border transition - colors \${ filter === status ? 'bg-accent-cyan text-black border-accent-cyan' : 'border-white/10 text-content-secondary hover:bg-white/5'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center text-white py-10">Loading Orders...</div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center text-content-secondary border border-white/10 rounded-2xl p-10">
                    No orders found.
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map(order => (
                        <div key={order._id} className="bg-background-secondary border border-white/5 rounded-2xl p-6 hover:border-accent-cyan/30 transition-all">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-full bg-accent-cyan/10 text-accent-cyan">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Order #{order._id.slice(-6)}</h4>
                                            <p className="text-sm text-content-secondary">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="pl-14 space-y-1 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-bold">{order.customer?.name || 'Guest'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} /> {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                                        </div>
                                        <div>Items: {order.items?.length || 0} • Total: <span className="text-accent-cyan font-bold">${order.totalAmount}</span></div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                    <span className={`px - 3 py - 1 rounded - full text - xs font - bold border \${
            order.status === 'Pending' ? 'text-yellow-500 border-yellow-500/30' :
                order.status === 'Shipped' ? 'text-blue-500 border-blue-500/30' :
                    'text-green-500 border-green-500/30'
        } `}>
                                        {order.status}
                                    </span>

                                    <div className="flex gap-2">
                                        {order.status === 'Pending' && (
                                            <button
                                                onClick={() => updateStatus(order._id, 'Shipped')}
                                                className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm font-bold hover:bg-blue-500/20"
                                            >
                                                Mark Shipped
                                            </button>
                                        )}
                                        {order.status === 'Shipped' && (
                                            <button
                                                onClick={() => updateStatus(order._id, 'Delivered')}
                                                className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-sm font-bold hover:bg-green-500/20"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
