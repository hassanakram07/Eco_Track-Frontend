import React, { useState } from 'react';
import client from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, ChevronRight, Briefcase, Recycle } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: '',
        role: 'Manager'
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Updated path as per previous fix
            const response = await client.post('/auth/register', formData);
            if (response.status === 201 || response.status === 200) {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary p-6 relative overflow-hidden font-poppins">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>

            <div className="w-full max-w-md bg-background-secondary border border-white/5 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan border border-accent-cyan/20 mx-auto mb-6">
                        <Recycle size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-content-secondary">Join Eco_Track to start monitoring</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-content-secondary ml-1">First Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-secondary group-focus-within:text-accent-cyan transition-colors" />
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                                placeholder="John"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-content-secondary ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-secondary group-focus-within:text-accent-cyan transition-colors" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
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
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-content-secondary ml-1">Role</label>
                        <div className="relative group">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-secondary group-focus-within:text-accent-cyan transition-colors" />
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all appearance-none cursor-pointer"
                            >
                                <option value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent-cyan text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-4 transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(2,213,224,0.3)] hover:shadow-[0_0_30px_rgba(2,213,224,0.5)]"
                    >
                        Create Account
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center mt-8 text-content-secondary text-sm">
                    Already have an account? <Link to="/login" className="text-white font-bold hover:text-accent-cyan transition-colors">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
