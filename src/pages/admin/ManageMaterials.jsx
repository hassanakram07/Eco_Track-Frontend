import React, { useState, useEffect } from 'react';
import client from '../../api/client';
import { Plus, Edit2, Trash2, X, AlertTriangle, Save, Search } from 'lucide-react';

const ManageMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        name: '', code: '', description: '',
        unit: 'kg', pricePerUnit: '', hazardous: false
    });

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await client.get('/materials/list');
            setMaterials(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleOpenModal = (material = null) => {
        if (material) {
            setCurrentMaterial(material);
            setFormData({
                name: material.name,
                code: material.code,
                description: material.description,
                unit: material.unit,
                pricePerUnit: material.pricePerUnit,
                hazardous: material.hazardous
            });
        } else {
            setCurrentMaterial(null);
            setFormData({
                name: '', code: '', description: '',
                unit: 'kg', pricePerUnit: '', hazardous: false
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentMaterial) {
                await client.put(`/materials/update/${currentMaterial._id}`, formData);
            } else {
                await client.post('/materials/create', formData);
            }
            fetchMaterials();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error saving material:", err);
            const msg = err.response?.data?.message || "Failed to save material.";
            alert(msg);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this material?")) {
            try {
                await client.delete(`/materials/delete/${id}`);
                fetchMaterials();
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete material.");
            }
        }
    };

    const filteredMaterials = materials.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Buying List (Materials)</h2>
                    <p className="text-content-secondary">Manage scrap types and prices</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-accent-cyan text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors"
                >
                    <Plus size={20} /> Add Material
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-background-secondary border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accent-cyan/50"
                />
            </div>

            {/* Table */}
            <div className="bg-background-secondary border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                        <tr>
                            <th className="p-4 text-white font-semibold">Name</th>
                            <th className="p-4 text-white font-semibold">Code</th>
                            <th className="p-4 text-white font-semibold">Price / Unit</th>
                            <th className="p-4 text-white font-semibold">Hazardous</th>
                            <th className="p-4 text-white font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center text-content-secondary">Loading...</td></tr>
                        ) : filteredMaterials.map((m) => (
                            <tr key={m._id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <p className="text-white font-medium">{m.name}</p>
                                    <p className="text-xs text-content-secondary truncate max-w-[200px]">{m.description}</p>
                                </td>
                                <td className="p-4 text-content-secondary font-mono">{m.code}</td>
                                <td className="p-4 text-accent-cyan font-bold">${m.pricePerUnit} / {m.unit}</td>
                                <td className="p-4">
                                    {m.hazardous ? (
                                        <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                                            <AlertTriangle size={12} /> Hazardous
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold w-fit">
                                            Safe
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => handleOpenModal(m)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(m._id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-background-secondary border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">{currentMaterial ? 'Edit Material' : 'Add New Material'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Name</label>
                                    <input required className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Code</label>
                                    <input required className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-content-secondary">Description</label>
                                <textarea className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Price</label>
                                    <input type="number" required className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.pricePerUnit} onChange={e => setFormData({ ...formData, pricePerUnit: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Unit</label>
                                    <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })}>
                                        <option value="kg">Per Kg</option>
                                        <option value="ton">Per Ton</option>
                                        <option value="lb">Per Lb</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input type="checkbox" id="haz" className="w-5 h-5 rounded border-gray-600 bg-black/30 text-accent-cyan focus:ring-accent-cyan" checked={formData.hazardous} onChange={e => setFormData({ ...formData, hazardous: e.target.checked })} />
                                <label htmlFor="haz" className="text-white select-none cursor-pointer">Hazardous Material</label>
                            </div>

                            <button type="submit" className="w-full bg-accent-cyan text-black font-bold py-4 rounded-xl mt-4 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                <Save size={20} /> Save Material
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMaterials;
