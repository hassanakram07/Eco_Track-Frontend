import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import client from '../api/client';

const BuyingList = () => {
    const [scraps, setScraps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const res = await client.get('/materials/list');
                // Maps backend data to frontend structure if needed, or use directly
                // Backend returns: { success: true, count: N, data: [...] }
                setScraps(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch materials", err);
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    // Helper to get image based on category (mock images since backend might not store URL yet for materials)
    const getMaterialImage = (categoryName) => {
        const images = {
            "Metal": "https://images.unsplash.com/photo-1558611997-7686a7d65609?q=80&w=2574&auto=format&fit=crop",
            "Plastic": "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=2671&auto=format&fit=crop",
            "Electronic": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            "Paper": "https://images.unsplash.com/photo-1605600659908-0ef719419d42?q=80&w=2576&auto=format&fit=crop",
            "Glass": "https://images.unsplash.com/photo-1506093869263-149ba657cc1c?q=80&w=2670&auto=format&fit=crop"
        };
        // Simple string matching
        const cat = Object.keys(images).find(k => categoryName?.includes(k));
        return cat ? images[cat] : "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2670&auto=format&fit=crop";
    };

    return (
        <div className="bg-background-primary min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-h1 text-white mb-4">We Buy Scrap</h1>
                    <p className="text-content-secondary text-xl max-w-2xl mx-auto">Turn your waste into revenue. Live market rates updated daily.</p>
                </div>

                {loading ? (
                    <div className="text-center text-white text-xl animate-pulse">Loading current rates...</div>
                ) : scraps.length === 0 ? (
                    <div className="text-center text-content-secondary border border-white/10 rounded-2xl p-10">
                        No materials listed at the moment. Check back soon.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                        {scraps.map((scrap) => (
                            <div key={scrap._id} className="group relative rounded-3xl overflow-hidden bg-background-secondary border border-white/5 hover:border-accent-cyan/50 transition-all flex flex-col md:flex-row">
                                <div className="md:w-1/3 relative overflow-hidden min-h-[200px] md:min-h-0">
                                    <div className="absolute inset-0 bg-accent-cyan/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <img
                                        src={getMaterialImage(scrap.name)}
                                        alt={scrap.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-wide">{scrap.name}</h3>
                                        <div className="flex items-center gap-2">
                                            {scrap.hazardous && (
                                                <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold flex items-center gap-1 border border-red-500/20">
                                                    <AlertTriangle size={12} /> Hazardous
                                                </span>
                                            )}
                                            <span className="px-4 py-1 rounded-full border border-accent-cyan/30 text-accent-cyan font-bold bg-accent-cyan/5">
                                                ${scrap.pricePerUnit} / {scrap.unit}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-content-secondary mb-6">{scrap.description || "High quality industrial scrap material accepted."}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                                            Code: {scrap.code}
                                        </div>
                                        <button className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-accent-cyan transition-colors flex items-center gap-2 text-sm">
                                            Sell This <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-20 text-center bg-accent-cyan/10 rounded-3xl p-12 border border-accent-cyan/20">
                    <h2 className="text-3xl font-bold text-white mb-4">Have something else?</h2>
                    <p className="text-content-secondary mb-8">We handle custom removal requests for heavy machinery and specialized industrial waste.</p>
                    <button className="px-10 py-4 bg-accent-cyan text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(2,213,224,0.4)] transition-all">
                        Contact Sales Team
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyingList;
