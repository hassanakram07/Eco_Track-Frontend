import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Recycle } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                        <Link to="/login" className="px-6 py-2 border border-white/10 rounded-full text-white hover:bg-white/5 transition-all text-sm font-medium">
                            Login
                        </Link>
                        <Link to="/signup" className="px-6 py-2 bg-accent-cyan text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(2,213,224,0.3)] transition-all text-sm">
                            Sign Up
                        </Link>
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
                    <Link to="/login" className="w-full py-4 text-center border border-white/10 rounded-xl text-white font-medium hover:bg-white/5 transition-colors" onClick={() => setIsOpen(false)}>
                        Login
                    </Link>
                    <Link to="/signup" className="w-full py-4 text-center bg-accent-cyan text-black font-bold rounded-xl hover:shadow-lg transition-all" onClick={() => setIsOpen(false)}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
