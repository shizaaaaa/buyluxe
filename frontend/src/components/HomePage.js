import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        categoryId: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5001/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));

        axios.get('http://localhost:5001/api/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleCategorySelect = (categoryId) => {
        setNewProduct({ ...newProduct, categoryId });
        if (categoryId) {
            setFilteredProducts(products.filter(product => product.category._id === categoryId));
        } else {
            setFilteredProducts(products);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleCategoryInputChange = (e) => setNewCategory(e.target.value);

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (!newCategory) return alert('Category name is required!');

        axios.post('http://localhost:5001/api/add/category', { name: newCategory })
            .then(response => {
                alert('Category added successfully!');
                setCategories([...categories, response.data.category]);
                setNewCategory('');
            })
            .catch(error => console.error('Error adding category:', error));
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        const { name, price, categoryId } = newProduct;
        if (!name || !price || !categoryId) return alert('All fields are required!');

        axios.post('http://localhost:5001/api/add/product', { name, price, categoryId })
            .then(response => {
                alert('Product added successfully!');
                setProducts([...products, response.data.product]);
                setFilteredProducts([...products, response.data.product]);
                setNewProduct({ name: '', price: '', categoryId: '' });
            })
            .catch(error => console.error('Error adding product:', error));
    };

    return (
        <div className="homepage">
            
            <header>
                <h1>  BUY - LUXE  </h1>
                <h3>A Luxury Skincare & Makeup Store</h3>
            </header>
            
            <main>
                <section className="category-section">
                    <h2>Add Category</h2>
                    <form onSubmit={handleCategorySubmit}>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={handleCategoryInputChange}
                            placeholder="Enter category name"
                            required
                        />
                        <button type="submit">Add Category</button>
                    </form>

                    <h3>Available Categories</h3>
                    <div className="category-buttons">
                        {categories.map(category => (
                            <button
                                key={category._id}
                                onClick={() => handleCategorySelect(category._id)}
                            >
                                {category.name}
                            </button>
                        ))}
                        <button onClick={() => handleCategorySelect('')}>All Products</button>
                    </div>
                </section>

                <section className="product-section">
                    <h2>Products</h2>
                    <div className="product-list">
                        {filteredProducts.map(product => (
                            <div className="product-card" key={product._id}>
                                <h4>{product.name}</h4>
                                <p>Price: ${product.price}</p>
                                <p>Category: {product.category.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="add-product-section">
                    <h2>Add New Product</h2>
                    <form onSubmit={handleProductSubmit}>
                        <div>
                            <label>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Category</label>
                            <select
                                name="categoryId"
                                value={newProduct.categoryId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Add Product</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
