import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import '../../styles/AdminDashboard.css';

const ProductList = () => {
    const { products, deleteProduct, addProduct } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        // Simple prompt for MVP - in real app would be a modal
        const name = prompt("Enter Product Name:");
        if (!name) return;
        const price = prompt("Enter Price:");
        const category = prompt("Enter Category (Rings, Necklaces, etc):");

        addProduct({
            name,
            price: Number(price) || 0,
            category: category || "Uncategorized",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", // Placeholder
            isNew: true
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const handleEdit = (product) => {
        const newPrice = prompt(`Enter new price for ${product.name}:`, product.price);
        if (newPrice !== null && !isNaN(newPrice)) {
            // In a real app, we'd call updateProduct()
            // For this MVP, we'll delete and re-add or just mock it.
            // Let's add updateProduct to store if we want to be thorough, 
            // but for now, we'll validly simulate it by alerting or console logging 
            // since updateProduct wasn't explicitly in StoreContext yet.
            // Wait, let's actually add it to context in next step if we want it real.
            // For now, let's just use the add/delete flow effectively or prompt user.
            // Actually, let's just alert for now as "Edit" often requires a full modal.
            // OR better:
            deleteProduct(product.id);
            addProduct({ ...product, price: Number(newPrice) });
        }
    };

    return (
        <div className="product-list-page">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>Products</h2>
                <button className="btn btn-primary" onClick={handleAddProduct} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>+ Add Product</button>
            </div>

            <div className="admin-card">
                <div className="table-actions" style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                </td>
                                <td style={{ fontWeight: '600' }}>{product.name}</td>
                                <td>{product.category}</td>
                                <td>₹{product.price.toLocaleString('en-IN')}</td>
                                <td><span className="badge delivered">Active</span></td>
                                <td>
                                    <button style={{ marginRight: '10px', color: '#666' }} onClick={() => handleEdit(product)}>Edit</button>
                                    <button style={{ color: 'red' }} onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;

