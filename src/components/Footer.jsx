import React from 'react';
import { Monitor, Battery, Zap, Recycle, Twitter, Linkedin, Facebook, Instagram, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-background-secondary border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-full bg-accent-cyan flex items-center justify-center shadow-[0_0_15px_rgba(2,213,224,0.4)]">
                                <Recycle className="w-6 h-6 text-black" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-wide">Eco_Track</span>
                        </div>
                        <p className="text-content-secondary leading-relaxed max-w-sm">
                            Empowering a sustainable future through smart waste management and circular economy solutions.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Linkedin, Facebook, Instagram].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent-cyan hover:text-black transition-all hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Explore</h4>
                        <ul className="space-y-4 text-content-secondary">
                            {['About Us', 'Buying List', 'Sustainable Shop', 'Success Stories', 'Partners'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-accent-cyan transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan scale-0 group-hover:scale-100 transition-transform"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Services</h4>
                        <ul className="space-y-4 text-content-secondary">
                            {['Industrial Recycling', 'E-Waste Solutions', 'Plastic Processing', 'Logistics Management', 'Consultancy'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-accent-cyan transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan scale-0 group-hover:scale-100 transition-transform"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Stay Updated</h4>
                        <p className="text-content-secondary mb-6">Join our newsletter for the latest eco-trends and market prices.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all pr-12"
                            />
                            <button className="absolute right-1 top-1 p-2 bg-accent-cyan rounded-lg text-black hover:bg-white transition-colors">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-content-secondary text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; 2025 Eco_Track Solutions. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
