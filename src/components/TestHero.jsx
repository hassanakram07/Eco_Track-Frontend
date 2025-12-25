import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const TestHero = () => {
    return (
        <div className=" bg-background-primary overflow-hidden relative font-poppins flex items-center pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="space-y-8 animate-in slide-in-from-left-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-semibold tracking-wide">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
                            </span>
                            Leading the Green Revolution
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                            Turning Waste into <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-400">
                                Wealth & Wonder
                            </span>
                        </h1>

                        <p className="text-lg text-content-secondary max-w-xl leading-relaxed">
                            Eco_Track connects collectors, businesses, and recyclers in a unified ecosystem. Seamlessly track, trade, and transform scrap into sustainable value.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="flex items-center justify-center gap-2 bg-accent-cyan text-black px-8 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(2,213,224,0.4)] transition-all transform hover:-translate-y-1">
                                Start Recycling
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all group">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent-cyan group-hover:text-black transition-colors">
                                    <Play className="w-3 h-3 fill-current" />
                                </div>
                                View Process
                            </button>
                        </div>

                        <div className="pt-8 flex items-center gap-8 border-t border-white/10">
                            <div>
                                <p className="text-3xl font-bold text-white">50K+</p>
                                <p className="text-sm text-content-secondary">Tons Recycled</p>
                            </div>
                            <div className="w-px h-12 bg-white/10"></div>
                            <div>
                                <p className="text-3xl font-bold text-white">12K+</p>
                                <p className="text-sm text-content-secondary">Active Partners</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image/Graphic */}
                    <div className="relative animate-in slide-in-from-right-4 duration-1000 hidden lg:block">
                        <div className="relative z-10 rounded-[60px] overflow-hidden border border-white/10 shadow-2xl skew-y-[-2deg] hover:skew-y-0 transition-transform duration-700">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/20 to-transparent mix-blend-overlay z-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2670&auto=format&fit=crop"
                                alt="Future of Recycling"
                                className="w-full h-[600px] object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                            />
                            {/* Floating Badge */}
                            <div className="absolute bottom-10 left-10 z-30 bg-background-primary/90 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl max-w-xs">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <ArrowRight className="w-5 h-5 -rotate-45" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Carbon Offset</p>
                                        <p className="text-green-400 text-sm">-24% This Month</p>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[70%] bg-green-400"></div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements around image */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-accent-cyan/30 rounded-full animate-spin-slow dashed"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestHero;
