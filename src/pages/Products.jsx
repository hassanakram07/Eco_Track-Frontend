import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Package } from 'lucide-react';
import client from '../api/client';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await client.get('/products');
                // Backend: { success: true, count: N, data: [...] }
                setProducts(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-background-primary min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h1 className="text-h1 text-white mb-2">Eco Shop</h1>
                        <p className="text-content-secondary text-lg">Premium products crafted from 100% recycled materials.</p>
                    </div>
                    <div className="flex gap-4">
                        <select className="bg-background-secondary text-white px-6 py-3 rounded-full border border-white/10 focus:outline-none focus:border-accent-cyan">
                            <option>All Categories</option>
                            <option>Refurbished Electronics</option>
                            <option>Recycled Furniture</option>
                            <option>Construction Material</option>
                        </select>
                        <select className="bg-background-secondary text-white px-6 py-3 rounded-full border border-white/10 focus:outline-none focus:border-accent-cyan">
                            <option>Sort by: Popular</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-white py-20 animate-pulse">Loading amazing products...</div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-content-secondary border border-white/10 rounded-3xl bg-background-secondary/50">
                        <Package size={48} className="mb-4 opacity-50" />
                        <p className="text-xl">No products available at the moment.</p>
                        <p className="text-sm">Check back later for new stock!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product._id} className="bg-background-secondary rounded-3xl overflow-hidden border border-white/5 group hover:border-accent-cyan/30 transition-all hover:-translate-y-2 flex flex-col h-full">
                                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                                    {/* Handle images - check if array or single string, default fallback */}
                                    <img
                                        src={product.images && product.images.length > 0 ? (Array.isArray(product.images) ? product.images[0] : product.images) : "https://images.unsplash.com/photo-1591123720764-9178054a45a7?q=80&w=2670&auto=format&fit=crop"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {product.stock === 0 && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold transform -rotate-12 border-2 border-white">SOLD OUT</span>
                                        </div>
                                    )}
                                    <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:bg-accent-cyan transition-colors z-10 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
                                        <ShoppingBag size={20} />
                                    </button>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors line-clamp-1">{product.name}</h3>
                                        {/* Mock Rating if not in DB, assuming random 4.5+ for now or just generic */}
                                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                            <Star size={14} fill="currentColor" />
                                            <span>4.8</span>
                                        </div>
                                    </div>
                                    <p className="text-content-secondary text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <p className="text-2xl font-bold text-white/90">${product.price}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                                            {product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
