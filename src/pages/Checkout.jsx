import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { CreditCard, MapPin, Truck, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state?.product;

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'Credit Card'
    });
    const [loading, setLoading] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen bg-background-primary flex items-center justify-center flex-col gap-4 text-white">
                <p>No product selected.</p>
                <button onClick={() => navigate('/products')} className="text-accent-cyan underline">Go to Shop</button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Mock API call since actual order placement logic might require more backend work
            // Ideally: POST /api/orders/place
            // For now, we simulate success

            // await client.post('/orders/place', { ...formData, productId: product._id });

            // Navigate to Success
            setTimeout(() => {
                alert("Order Placed Successfully! (Mock)");
                navigate('/my-orders');
            }, 1000);
        } catch (err) {
            console.error(err);
            alert("Order failed");
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-primary min-h-screen py-20 text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-background-secondary p-6 rounded-2xl border border-white/10 text-white">
                            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                            <div className="flex gap-4 mb-6">
                                <img src={product.images?.[0]} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                                <div>
                                    <h4 className="font-bold">{product.name}</h4>
                                    <p className="text-accent-cyan font-mono">${product.price}</p>
                                    <p className="text-xs text-content-secondary mt-1">Qty: 1</p>
                                </div>
                            </div>
                            <div className="border-t border-white/10 pt-4 space-y-2 text-sm text-content-secondary">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white">${product.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-white">$5.00</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10 mt-2">
                                    <span>Total</span>
                                    <span>${product.price + 5}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2"><MapPin size={20} className="text-accent-cyan" /> Shipping Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-content-secondary mb-1">Address</label>
                                <input
                                    required
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 focus:border-accent-cyan outline-none"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="123 Eco St"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-content-secondary mb-1">City</label>
                                    <input
                                        required
                                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 focus:border-accent-cyan outline-none"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="NY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-content-secondary mb-1">Postal Code</label>
                                    <input
                                        required
                                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 focus:border-accent-cyan outline-none"
                                        value={formData.postalCode}
                                        onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                                        placeholder="10001"
                                    />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold flex items-center gap-2 mt-8"><CreditCard size={20} className="text-accent-cyan" /> Payment</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {['Credit Card', 'Cash on Delivery'].map(method => (
                                <div
                                    key={method}
                                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-white/10 hover:border-white/30 text-content-secondary'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {method === 'Credit Card' ? <CreditCard size={18} /> : <Truck size={18} />}
                                        <span className="text-sm font-bold">{method}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-accent-cyan text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(2,213,224,0.4)] transition-all mt-8"
                        >
                            {loading ? 'Processing...' : `Pay $${product.price + 5}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
