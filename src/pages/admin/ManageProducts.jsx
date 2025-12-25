import React, { useState, useEffect } from 'react';
import client from '../../api/client';
import { Plus, Edit2, Trash2, X, ShoppingBag, Save, Search, Image as ImageIcon } from 'lucide-react';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        sku: '', name: '', price: '', stock: '',
        description: '', type: 'Refurbished',
        images: []
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    // NOTE: Backend endpoint for delete is /products/:id
    // Backend endpoint for create is /products/add
    // Backend endpoint for update is /products/:id

    const fetchProducts = async () => {
        try {
            const res = await client.get('/products');
            setProducts(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setCurrentProduct(product);
            setFormData({
                sku: product.sku,
                name: product.name,
                price: product.price,
                stock: product.stock,
                description: product.description,
                type: product.type || 'Refurbished',
                images: product.images || []
            });
        } else {
            setCurrentProduct(null);
            setFormData({
                sku: '', name: '', price: '', stock: '',
                description: '', type: 'Refurbished', images: []
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct) {
                await client.put(`/products/${currentProduct._id}`, formData);
            } else {
                await client.post('/products/add', formData);
            }
            fetchProducts();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error saving product:", err);
            const msg = err.response?.data?.message || "Failed to save product.";
            alert(msg);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await client.delete(`/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error(err);
                alert("Failed to delete product.");
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Shop Products</h2>
                    <p className="text-content-secondary">Manage selling inventory</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-accent-cyan text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors"
                >
                    <Plus size={20} /> Add Product
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Search products..."
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
                            <th className="p-4 text-white font-semibold">SKU / ID</th>
                            <th className="p-4 text-white font-semibold">Product</th>
                            <th className="p-4 text-white font-semibold">Price</th>
                            <th className="p-4 text-white font-semibold">Stock</th>
                            <th className="p-4 text-white font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center text-content-secondary">Loading...</td></tr>
                        ) : filteredProducts.map((p) => (
                            <tr key={p._id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-content-secondary font-mono text-sm">{p.sku || p._id.slice(-6).toUpperCase()}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-400">
                                            <ImageIcon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{p.name}</p>
                                            <p className="text-xs text-content-secondary">{p.type}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-white font-medium">${p.price}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => handleOpenModal(p)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400 transition-colors">
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
                    <div className="bg-background-secondary border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200 h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-background-secondary z-10">
                            <h3 className="text-xl font-bold text-white">{currentProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-content-secondary">Product Name</label>
                                <input required className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">SKU</label>
                                    <input className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Type</label>
                                    <input className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-content-secondary">Description</label>
                                <textarea className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Price ($)</label>
                                    <input type="number" required className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-content-secondary">Stock Qty</label>
                                    <input type="number" required className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-accent-cyan text-black font-bold py-4 rounded-xl mt-4 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                <Save size={20} /> Save Product
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
