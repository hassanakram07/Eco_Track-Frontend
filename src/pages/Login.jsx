import React, { useState } from 'react';
import client from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ChevronRight, Recycle } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await client.post('/auth/login', { email, password });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                navigate('/dashboard'); // or standard React route if not using full page refresh
            } else {
                setError('Login failed: No token received');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary p-6 relative overflow-hidden font-poppins">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

            <div className="w-full max-w-md bg-background-secondary border border-white/5 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan border border-accent-cyan/20 mx-auto mb-6">
                        <Recycle size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-content-secondary">Sign in to access your Eco_Track dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-content-secondary ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-secondary group-focus-within:text-accent-cyan transition-colors" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-content-secondary ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-secondary group-focus-within:text-accent-cyan transition-colors" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer w-4 h-4 rounded border-gray-600/50 bg-black/40 text-accent-cyan focus:ring-accent-cyan/50 opacity-0 absolute w-full h-full cursor-pointer z-10" />
                                <div className="w-4 h-4 border border-white/20 rounded bg-black/40 peer-checked:bg-accent-cyan peer-checked:border-accent-cyan transition-colors flex items-center justify-center">
                                    <svg className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <span className="text-content-secondary group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-accent-cyan hover:text-accent-hover transition-colors">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent-cyan text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(2,213,224,0.3)] hover:shadow-[0_0_30px_rgba(2,213,224,0.5)]"
                    >
                        Sign In
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center mt-8 text-content-secondary text-sm">
                    Don't have an account? <Link to="/signup" className="text-white font-bold hover:text-accent-cyan transition-colors">Create Account</Link>
                </p>
            </div>
        </div>
    );
}
