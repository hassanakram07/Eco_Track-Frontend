import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-background-primary min-h-screen pt-20 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h1 className="text-h1 text-white mb-4">Get in Touch</h1>
                    <p className="text-content-secondary text-xl">We'd love to hear about your recycling needs.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        {[
                            { icon: <Mail />, title: "Email Us", info: "contact@ecotrack.com", sub: "Response within 24 hours" },
                            { icon: <Phone />, title: "Call Us", info: "+1 (555) 123-4567", sub: "Mon-Fri 9am-6pm" },
                            { icon: <MapPin />, title: "Visit Us", info: "123 Eco Valley, Green City", sub: "New York, USA" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-background-secondary/50 p-8 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-white font-medium mb-1">{item.info}</p>
                                <p className="text-content-secondary text-sm">{item.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-background-secondary/30 p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-content-secondary ml-1">First Name</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent-cyan/50 transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-content-secondary ml-1">Last Name</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent-cyan/50 transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-content-secondary ml-1">Email Address</label>
                                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent-cyan/50 transition-all" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-content-secondary ml-1">Message</label>
                                <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent-cyan/50 transition-all h-40 resize-none" placeholder="How can we help you?"></textarea>
                            </div>

                            <button className="w-full bg-accent-cyan text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(2,213,224,0.3)] transition-all flex items-center justify-center gap-2 group">
                                Send Message
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
