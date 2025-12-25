import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Recycle, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check auth state on mount
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="fixed w-full z-50 bg-background-primary/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20 group-hover:border-accent-cyan/50 transition-all">
                            <Recycle className="w-6 h-6 text-accent-cyan group-hover:rotate-180 transition-transform duration-700" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Eco_Track
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Home', 'About', 'Contact', 'Buying List', 'Shop'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : item === 'Shop' ? '/products' : `/${item.toLowerCase().replace(' ', '-')}`}
                                className="text-content-secondary hover:text-accent-cyan transition-colors text-sm font-medium tracking-wide"
                            >
                                {item.toUpperCase()}
                            </Link>
                        ))}
                        {/* Desktop Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 text-white hover:text-accent-cyan transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                                            <User size={18} />
                                        </div>
                                        <span className="font-medium text-sm">{user.firstName}</span>
                                        <ChevronDown size={14} />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-background-secondary border border-white/10 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                            <Link
                                                to="/my-orders"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-accent-cyan"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Order Details
                                            </Link>
                                            {/* Admin Link if role allows */}
                                            {(user.role === 'Admin' || user.role === 'Manager') && (
                                                <Link
                                                    to="/admin"
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-accent-cyan"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <div className="h-px bg-white/10 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                                            >
                                                <LogOut size={14} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-white hover:text-accent-cyan transition-colors px-4 py-2 text-sm font-medium">
                                        Log In
                                    </Link>
                                    <Link to="/signup" className="bg-accent-cyan text-black px-6 py-2.5 rounded-full font-bold hover:shadow-[0_0_20px_rgba(2,213,224,0.4)] transition-all text-sm">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[300px] bg-background-secondary border-l border-white/10 z-50 transform transition-transform duration-300 md:hidden flex flex-col p-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center mb-10">
                    <span className="text-2xl font-bold text-white">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="bg-white/5 p-2 rounded-full text-white hover:bg-white/10 transition-colors">
                        <X />
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    {['Home', 'About', 'Contact', 'Buying List', 'Shop'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : item === 'Shop' ? '/products' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="text-lg text-content-secondary hover:text-accent-cyan transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="mt-auto flex flex-col gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan font-bold">
                                    {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-content-secondary capitalize">{user.role}</p>
                                </div>
                            </div>

                            <Link
                                to="/my-orders"
                                className="w-full py-4 text-center border border-white/10 rounded-xl text-white font-medium hover:bg-white/5 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                My Orders
                            </Link>

                            {(user.role === 'Admin' || user.role === 'Manager') && (
                                <Link
                                    to="/admin"
                                    className="w-full py-4 text-center bg-white/5 border border-white/10 rounded-xl text-accent-cyan font-bold hover:bg-white/10 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="w-full py-4 text-center bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500/20 transition-all"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="w-full py-4 text-center border border-white/10 rounded-xl text-white font-medium hover:bg-white/5 transition-colors" onClick={() => setIsOpen(false)}>
                                Login
                            </Link>
                            <Link to="/signup" className="w-full py-4 text-center bg-accent-cyan text-black font-bold rounded-xl hover:shadow-lg transition-all" onClick={() => setIsOpen(false)}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
