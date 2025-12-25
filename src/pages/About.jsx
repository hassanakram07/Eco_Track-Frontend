import React from 'react';
import { Target, Users, Globe, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-background-primary min-h-screen">
            {/* Header */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-h1 text-white mb-6">Our Mission</h1>
                    <p className="text-xl text-content-secondary max-w-3xl mx-auto">
                        To revolutionize the global waste management industry by creating a circular economy where every piece of scrap finds a new purpose.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 border-y border-white/5 bg-background-secondary/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: "Tons Recycled", value: "50k+" },
                            { label: "Active Partners", value: "200+" },
                            { label: "Cities Covered", value: "15" },
                            { label: "Years Experience", value: "12" },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-5xl font-bold text-accent-cyan mb-2 font-poppins">{stat.value}</div>
                                <div className="text-content-secondary uppercase tracking-wider text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                                    <Target size={24} />
                                </div>
                                <h2 className="text-h2 text-white">Who We Are</h2>
                            </div>
                            <p className="text-content-secondary text-lg leading-relaxed">
                                Eco_Track was founded in 2024 with a vision to streamline the fragmented recycling industry. We identified a critical gap: efficient logistics and transparency were missing from the equation.
                            </p>
                            <p className="text-content-secondary text-lg leading-relaxed">
                                By leveraging cutting-edge technology, we've built a platform that connects collectors, processors, and manufacturers, ensuring that materials are tracked, valued, and reused efficiently.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent-cyan/20 blur-[50px] rounded-full"></div>
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2626&auto=format&fit=crop"
                                alt="Recycling Facility"
                                className="relative rounded-3xl border border-white/10 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
