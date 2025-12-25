import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import client from '../../api/client';
import { CreditCard, DollarSign, CheckCircle, Smartphone } from 'lucide-react';

const SellPaymentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const prevData = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [paymentDetails, setPaymentDetails] = useState({
        accountName: '',
        accountNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...prevData,
            paymentMethod,
            paymentDetails: paymentMethod !== 'Cash' ? paymentDetails : {}
        };

        try {
            await client.post('/pickups/create', payload);
            setSuccess(true);
            setLoading(false);
            navigate('/sell/success'); // Redirect to success page
        } catch (err) {
            console.error(err);
            alert("Submission failed: " + (err.response?.data?.message || err.message));
            setLoading(false);
        }
    };

    if (success) return null; // Handled by navigate

    return (
        <div className="min-h-screen bg-background-primary py-20 px-6 font-poppins">
            <div className="max-w-4xl mx-auto">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-10 px-8 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
                        <div className="w-10 h-10 rounded-full bg-green-500 text-black font-bold flex items-center justify-center">✓</div>
                        <span className="text-green-500 text-sm font-bold">Details</span>
                    </div>
                    <div className="h-1 flex-1 bg-accent-cyan mx-4"></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-accent-cyan text-black font-bold flex items-center justify-center">2</div>
                        <span className="text-accent-cyan text-sm font-bold">Payment</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <div className="bg-background-secondary border border-white/5 rounded-3xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-content-secondary border-b border-white/5 pb-2">
                                    <span>Material</span>
                                    <span className="text-white font-medium capitalize">{prevData.materialType}</span>
                                </div>
                                <div className="flex justify-between text-content-secondary border-b border-white/5 pb-2">
                                    <span>Quantity</span>
                                    <span className="text-white font-medium">{prevData.quantity} {prevData.unit}</span>
                                </div>
                                <div className="flex justify-between text-content-secondary border-b border-white/5 pb-2">
                                    <span>Pickup Date</span>
                                    <span className="text-white font-medium">{prevData.preferredDate}</span>
                                </div>
                                <div className="pt-2">
                                    <p className="text-xs text-center text-gray-500">
                                        *Final price calculated on pickup based on quality & weight verification.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="lg:col-span-2 order-1 lg:order-2 bg-background-secondary border border-white/5 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('Cash')}
                                    className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'Cash' ? 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan scale-105 shadow-glow' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    <DollarSign size={32} />
                                    <span className="font-bold">Cash on Pickup</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('JazzCash')}
                                    className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'JazzCash' ? 'bg-red-500/10 border-red-500 text-red-500 scale-105 shadow-glow-red' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    <Smartphone size={32} />
                                    <span className="font-bold">JazzCash</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('EasyPaisa')}
                                    className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'EasyPaisa' ? 'bg-green-500/10 border-green-500 text-green-500 scale-105 shadow-glow-green' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    <Smartphone size={32} />
                                    <span className="font-bold">EasyPaisa</span>
                                </button>
                            </div>

                            {paymentMethod !== 'Cash' && (
                                <div className="space-y-4 pt-4 animate-in slide-in-from-top-4">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                            Enter {paymentMethod} Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm text-content-secondary">Account Holder Name</label>
                                                <input
                                                    required
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent-cyan"
                                                    placeholder="e.g. John Doe"
                                                    value={paymentDetails.accountName}
                                                    onChange={e => setPaymentDetails({ ...paymentDetails, accountName: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-content-secondary">Mobile / Account Number</label>
                                                <input
                                                    required
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent-cyan"
                                                    placeholder="0300-1234567"
                                                    value={paymentDetails.accountNumber}
                                                    onChange={e => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent-cyan text-black font-bold py-4 rounded-xl mt-4 hover:shadow-[0_0_20px_rgba(2,213,224,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? 'Submitting...' : 'Confirm Request'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellPaymentDetails;
