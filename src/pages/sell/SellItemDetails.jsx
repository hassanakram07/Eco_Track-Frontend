import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Truck, MapPin, Calendar, ArrowRight } from 'lucide-react';

const SellItemDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Auth Check
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
    }, [navigate]);

    const initialMaterial = location.state?.material || '';

    const [formData, setFormData] = useState({
        materialType: initialMaterial,
        quantity: '',
        unit: 'kg',
        pickupAddress: '',
        preferredDate: ''
    });

    const handleNext = (e) => {
        e.preventDefault();
        // Validation could go here
        navigate('/sell/payment', { state: { ...formData } });
    };

    return (
        <div className="min-h-screen bg-background-primary py-20 px-6 font-poppins">
            <div className="max-w-2xl mx-auto">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-10 px-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-accent-cyan text-black font-bold flex items-center justify-center">1</div>
                        <span className="text-accent-cyan text-sm font-bold">Details</span>
                    </div>
                    <div className="h-1 flex-1 bg-white/10 mx-4"></div>
                    <div className="flex flex-col items-center gap-2 opacity-50">
                        <div className="w-10 h-10 rounded-full bg-white/10 text-white font-bold flex items-center justify-center">2</div>
                        <span className="text-white text-sm">Payment</span>
                    </div>
                </div>

                <div className="bg-background-secondary border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Item Details</h2>

                    <form onSubmit={handleNext} className="space-y-6">
                        {/* Material Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                                <Truck size={20} className="text-accent-cyan" /> What are you selling?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Material Type</label>
                                    <input
                                        type="text"
                                        required
                                        readOnly={!!initialMaterial}
                                        className={`w-full border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent-cyan ${initialMaterial ? 'bg-white/10 cursor-not-allowed text-gray-400' : 'bg-black/30'}`}
                                        placeholder="e.g. Copper Wire"
                                        value={formData.materialType}
                                        onChange={e => setFormData({ ...formData, materialType: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="space-y-2 flex-1">
                                        <label className="text-sm text-content-secondary">Weight</label>
                                        <input
                                            type="number"
                                            required
                                            className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent-cyan"
                                            placeholder="0"
                                            value={formData.quantity}
                                            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 w-24">
                                        <label className="text-sm text-content-secondary">Unit</label>
                                        <select
                                            className="w-full h-[58px] bg-black/30 border border-white/10 rounded-xl px-2 text-white focus:outline-none focus:border-accent-cyan"
                                            value={formData.unit}
                                            onChange={e => setFormData({ ...formData, unit: e.target.value })}
                                        >
                                            <option value="kg">kg</option>
                                            <option value="ton">ton</option>
                                            <option value="lb">lb</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                                <MapPin size={20} className="text-accent-cyan" /> Pickup Location
                            </h3>
                            <div className="space-y-2">
                                <label className="text-sm text-content-secondary">Full Address</label>
                                <textarea
                                    required
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent-cyan h-24"
                                    placeholder="Street, Area, City..."
                                    value={formData.pickupAddress}
                                    onChange={e => setFormData({ ...formData, pickupAddress: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-content-secondary">Preferred Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="date"
                                        required
                                        className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-accent-cyan [color-scheme:dark]"
                                        value={formData.preferredDate}
                                        onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 hover:bg-accent-cyan transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            Next Step <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellItemDetails;
