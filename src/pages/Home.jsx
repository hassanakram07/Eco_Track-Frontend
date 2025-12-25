import React from 'react';
import TestHero from '../components/TestHero';
import { ArrowRight, Leaf, Recycle, TrendingUp } from 'lucide-react';

const HomePage = () => {
    return (
        <>
            <TestHero /> {/* Reusing the hero we made */}

            {/* Features Section */}
            <section className="py-24 bg-background-primary relative">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-h2 text-white mb-6">Why Choose Eco_Track?</h2>
                        <p className="text-content-secondary">We bridge the gap between waste and worth. Our platform empowers you to turn scrap into capital while saving the planet.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Recycle className="w-8 h-8 text-accent-cyan" />, title: "Smart Collection", desc: "Automated scheduling for scrap pickup at your doorstep." },
                            { icon: <TrendingUp className="w-8 h-8 text-indigo-400" />, title: "Real-time Tracking", desc: "Monitor your recycling impact and earnings in real-time." },
                            { icon: <Leaf className="w-8 h-8 text-green-400" />, title: "Eco-Friendly Products", desc: "Buy sustainable products made directly from recycled materials." }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-background-secondary border border-white/5 hover:border-accent-cyan/30 transition-all hover:-translate-y-2 group">
                                <div className="w-16 h-16 rounded-2xl bg-black/30 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-accent-cyan/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-content-secondary">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats / Impact Section */}
            <section className="py-20 border-y border-white/5 bg-background-primary">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
                        {[
                            { label: "CO2 Saved", value: "120T" },
                            { label: "Energy Saved", value: "450MWh" },
                            { label: "Trees Planted", value: "8.5k" },
                            { label: "Water Saved", value: "2M Liters" }
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <h4 className="text-4xl font-bold text-accent-cyan mb-2">{stat.value}</h4>
                                <p className="text-sm text-content-secondary uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Buying/Selling Teaser */}
            <section className="py-24 bg-background-secondary relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-h2 text-white">We Buy Your Scrap</h2>
                            <p className="text-content-secondary text-lg">
                                Got industrial waste, e-waste, or bulk manufacturing scrap? We offer competitive rates and seamless logistics support.
                            </p>

                            <div className="space-y-4">
                                {['Copper & Wiring', 'Industrial Steel', 'Electronic Waste', 'Heavy Machinery'].map((item) => (
                                    <div key={item} className="flex items-center gap-4 p-4 rounded-xl bg-background-primary border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-accent-cyan box-shadow-[0_0_10px_#02D5E0]"></div>
                                        <span className="text-white font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="flex items-center gap-2 text-accent-cyan font-bold hover:gap-4 transition-all group">
                                Check Buying List <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="flex-1 relative">
                            <div className="aspect-square rounded-[50px] bg-gradient-to-tr from-background-primary to-black border border-white/10 overflow-hidden relative group">
                                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 mix-blend-overlay" alt="Scrap Metal" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-primary to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-background-primary">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-h2 text-white mb-4">How It Works</h2>
                        <p className="text-content-secondary max-w-2xl mx-auto">Simple steps to start your recycling journey with Eco_Track.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/50 to-accent-cyan/0 border-t border-dashed border-white/20"></div>

                        {[
                            { step: "01", title: "Schedule Pickup", desc: "Use our app to request a pickup for your scrap materials." },
                            { step: "02", title: "We Collect", desc: "Our verified fleet arrives at your doorstep for hassle-free collection." },
                            { step: "03", title: "Get Paid", desc: "Digital weighing and instant payment to your wallet." }
                        ].map((item, idx) => (
                            <div key={idx} className="relative flex flex-col items-center text-center group">
                                <div className="w-24 h-24 rounded-full bg-background-secondary border border-white/10 flex items-center justify-center text-2xl font-bold text-accent-cyan mb-6 z-10 group-hover:border-accent-cyan/50 group-hover:shadow-[0_0_30px_rgba(2,213,224,0.2)] transition-all">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-content-secondary">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-background-secondary border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-h2 text-white">Trusted by Leaders</h2>
                        <div className="flex gap-2">
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"><ArrowRight className="rotate-180" /></button>
                            <button className="w-12 h-12 rounded-full bg-accent-cyan text-black flex items-center justify-center hover:bg-accent-hover transition-colors"><ArrowRight /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { name: "Sarah Johnson", role: "Facility Manager, TechCorp", quote: "Eco_Track transformed how we handle e-waste. The transparency and ease of use are unmatched." },
                            { name: "David Chen", role: "Sustainability Lead, GreenBuild", quote: "Finally, a platform that makes industrial recycling profitable and traceable. Highly recommended." }
                        ].map((t, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-background-primary border border-white/5 hover:border-accent-cyan/20 transition-colors">
                                <div className="flex gap-1 text-accent-cyan mb-6">
                                    {[1, 2, 3, 4, 5].map(i => <Leaf key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-lg text-white mb-6 leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                                    <div>
                                        <h4 className="font-bold text-white">{t.name}</h4>
                                        <p className="text-sm text-content-secondary">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
