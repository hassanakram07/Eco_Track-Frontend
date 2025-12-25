import React, { useState, useEffect } from 'react';
import client from '../../api/client';
import { Truck, MapPin, Calendar, User, CheckCircle, XCircle, Clock, Smartphone, CreditCard } from 'lucide-react';

const ManagePickups = () => {
    const [pickups, setPickups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [adminAction, setAdminAction] = useState(null); // 'accept' or 'reject'
    const [actionForm, setActionForm] = useState({
        scheduledTime: '',
        driverName: '',
        rejectionReason: ''
    });

    useEffect(() => {
        fetchPickups();
    }, []);

    const fetchPickups = async () => {
        try {
            console.log("Fetching all pickups...");
            const res = await client.get('/pickups');
            console.log("Pickups fetched:", res.data);
            setPickups(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch pickups failed:", err);
            // alert("Failed to fetch pickups. Check console associated with Admin role."); 
            setLoading(false);
        }
    };

    const handleActionClick = (pickup, action) => {
        setSelectedPickup(pickup);
        setAdminAction(action);
        setActionForm({ scheduledTime: '', driverName: '', rejectionReason: '' });
    };

    const submitAction = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                status: adminAction === 'accept' ? 'Accepted' : adminAction === 'complete' ? 'Completed' : 'Rejected',
                ...actionForm
            };

            await client.patch(`/pickups/admin/${selectedPickup._id}`, payload);
            fetchPickups();
            setSelectedPickup(null);
            setAdminAction(null);
        } catch (err) {
            alert("Failed to update: " + err.message);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Manage Pickups</h2>
                    <p className="text-content-secondary">
                        Schedule requests.
                        <span className="ml-2 text-xs bg-white/10 px-2 py-1 rounded text-accent-cyan">
                            Debug: {JSON.parse(localStorage.getItem('user') || '{}').role}
                        </span>
                    </p>
                </div>
            </div>

            {/* Error Message */}
            {!loading && pickups.length === 0 && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 mb-6">
                    No pickups found. Check console for fetch details.
                    <br />If you are an Admin, you should see requests here.
                </div>
            )}

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center text-white py-10">Loading Requests...</div>
                ) : pickups.map((pickup) => (
                    <div key={pickup._id} className="bg-background-secondary border border-white/5 rounded-2xl p-6 hover:border-accent-cyan/30 transition-all">
                        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-full bg-accent-cyan/10 text-accent-cyan">
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-lg font-bold text-white capitalize">{pickup.materialType}</h4>
                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${pickup.status === 'Pending' ? 'text-yellow-500 border-yellow-500/30' :
                                                pickup.status === 'Accepted' ? 'text-green-500 border-green-500/30' :
                                                    'text-red-500 border-red-500/30'
                                                }`}>
                                                {pickup.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-content-secondary">{pickup.quantity} {pickup.unit} • Req: {new Date(pickup.preferredDate).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400 pl-14">
                                    <div className="flex items-start gap-2">
                                        <User size={14} className="mt-1" />
                                        <div>
                                            <p>{pickup.userId ? `${pickup.userId.firstName} ${pickup.userId.lastName || ''}`.trim() : pickup.customerName || 'Unknown User'}</p>
                                            {pickup.userId?.email && <p className="text-xs text-gray-500">{pickup.userId.email}</p>}
                                            {pickup.userId?.phone && <p className="text-xs text-gray-500">{pickup.userId.phone}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin size={14} className="mt-1" />
                                        <span className="break-words">{pickup.pickupAddress}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={14} />
                                        <span className={pickup.paymentMethod !== 'Cash' ? 'text-accent-cyan font-bold' : ''}>{pickup.paymentMethod}</span>
                                        {pickup.paymentDetails?.accountNumber && <span className="text-xs">({pickup.paymentDetails.accountNumber})</span>}
                                    </div>
                                </div>

                                {pickup.scheduledTime && (
                                    <div className="pl-14 text-green-400 text-sm flex items-center gap-2">
                                        <Clock size={14} /> Scheduled Pickup: {new Date(pickup.scheduledTime).toLocaleString()}
                                    </div>
                                )}
                            </div>

                            {pickup.status === 'Pending' && (
                                <div className="flex gap-2 pl-14 lg:pl-0">
                                    <button
                                        onClick={() => handleActionClick(pickup, 'accept')}
                                        className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <CheckCircle size={16} /> Accept & Schedule
                                    </button>
                                    <button
                                        onClick={() => handleActionClick(pickup, 'reject')}
                                        className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <XCircle size={16} /> Reject
                                    </button>
                                </div>
                            )}

                            {pickup.status === 'Accepted' && (
                                <div className="flex gap-2 pl-14 lg:pl-0">
                                    <button
                                        onClick={() => handleActionClick(pickup, 'complete')}
                                        className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <CheckCircle size={16} /> Mark Completed
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedPickup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-background-secondary border border-white/10 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95">
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white capitalize">{adminAction} Request</h3>
                        </div>
                        <form onSubmit={submitAction} className="p-6 space-y-4">
                            {adminAction === 'accept' ? (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm text-content-secondary">Set Pickup Schedule</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent-cyan [color-scheme:dark]"
                                            value={actionForm.scheduledTime}
                                            onChange={e => setActionForm({ ...actionForm, scheduledTime: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-content-secondary">Assign Driver Name (Optional)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent-cyan"
                                            placeholder="Mike Smith"
                                            value={actionForm.driverName}
                                            onChange={e => setActionForm({ ...actionForm, driverName: e.target.value })}
                                        />
                                    </div>
                                </>
                            ) : adminAction === 'complete' ? (
                                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                                    <p>Are you sure you want to mark this order as completed? This confirms the item has been picked up.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Rejection Reason</label>
                                    <textarea
                                        required
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent-cyan h-24"
                                        placeholder="Reason..."
                                        value={actionForm.rejectionReason}
                                        onChange={e => setActionForm({ ...actionForm, rejectionReason: e.target.value })}
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setSelectedPickup(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">Cancel</button>
                                <button
                                    type="submit"
                                    className={`flex-1 py-3 rounded-xl font-bold text-black transition-colors ${adminAction === 'accept' ? 'bg-green-500 hover:bg-green-400' : adminAction === 'complete' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-red-500 hover:bg-red-400'}`}
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePickups;
