import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, ArrowRight, Home } from 'lucide-react';

const SellSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background-primary flex items-center justify-center p-6 relative overflow-hidden font-poppins">
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 bg-background-secondary border border-white/5 p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl animate-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle size={48} />
                </div>

                <h2 className="text-4xl font-bold text-white mb-4">Success!</h2>
                <p className="text-content-secondary text-lg mb-8">
                    Your pickup request has been successfully submitted. Our team will review it shortly.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/my-orders')}
                        className="w-full py-4 bg-accent-cyan text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(2,213,224,0.4)] transition-all flex items-center justify-center gap-2"
                    >
                        <Truck size={20} /> Track My Request
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={20} /> Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellSuccess;
