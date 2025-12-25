import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { ShoppingCart, ArrowLeft, ArrowRight, Star } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await client.get(`/products/${id}`);
                setProduct(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch product failed", err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleBuyNow = () => {
        // Navigate to Checkout with product payload
        navigate('/checkout', { state: { product } });
    };

    if (loading) return <div className="text-white text-center py-20 animate-pulse">Loading Product...</div>;
    if (!product) return <div className="text-white text-center py-20">Product not found.</div>;

    return (
        <div className="bg-background-primary min-h-screen py-20">
            <div className="container mx-auto px-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-content-secondary hover:text-accent-cyan mb-8 transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Shop
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="rounded-3xl overflow-hidden border border-white/10 bg-background-secondary h-[500px]">
                        <img
                            src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/500'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <span className="text-accent-cyan font-bold tracking-wider text-sm mb-2 uppercase">{product.categoryId?.name || 'Product'}</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-white">${product.price}</span>
                            {product.stock > 0 ? (
                                <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20">
                                    In Stock ({product.stock})
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold border border-red-500/20">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <p className="text-content-secondary text-lg mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <span className="text-content-secondary">SKU</span>
                                <span className="text-white font-mono">{product.sku}</span>
                            </div>
                            {product.dimensions && (
                                <div className="flex items-center justify-between py-3 border-b border-white/5">
                                    <span className="text-content-secondary">Dimensions</span>
                                    <span className="text-white">{product.dimensions}</span>
                                </div>
                            )}
                            {product.weightKg && (
                                <div className="flex items-center justify-between py-3 border-b border-white/5">
                                    <span className="text-content-secondary">Weight</span>
                                    <span className="text-white">{product.weightKg} kg</span>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 mt-auto">
                            <button
                                onClick={handleBuyNow}
                                disabled={product.stock <= 0}
                                className="flex-1 py-4 bg-accent-cyan text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(2,213,224,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart size={20} /> Buy Now
                            </button>
                            <button className="px-6 py-4 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors">
                                <Star size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
