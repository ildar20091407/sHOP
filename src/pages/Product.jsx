import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Loader from "../components/Loader";
import bin from "../assets/images/pngtree-red-shopping-cart-icon-png-free-illustration-image_1187825.jpg"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProducts,
    selectProducts,
    selectLoading,
    selectError,
    setSortPrice,
    setSortName,
    setSortQuantity,
    selectSortPrice,
    selectSortQuantity,
    selectSortName,
} from '../store/weather/weatherSlice';
import s from '../pages/Product.module.scss';  // Import your CSS module

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const sortPrice = useSelector(selectSortPrice);
    const sortName = useSelector(selectSortName);
    const sortQuantity = useSelector(selectSortQuantity);
    const [searchTerm, setSearchTerm] = useState('');  // Added setSearchTerm

    const sortProducts = useCallback((productsToSort, sortField, sortOrder) => {
        if (!productsToSort || productsToSort.length === 0) {  // Corrected condition
            return [];
        }

        const sorted = [...productsToSort].sort((a, b) => {
            let comparison = 0;  // Added variable

            if (sortField === 'price') {
                comparison = a.price - b.price;
            } else if (sortField === 'name') {
                const nameA = a.title?.toUpperCase() ?? '';  
                const nameB = b.title?.toUpperCase() ?? '';
                comparison = nameA.localeCompare(nameB);
            } else if (sortField === 'stock') {
                comparison = a.stock - b.stock;
            } else {
                return 0; // For default case
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });
        return sorted;
    }, []);

    useEffect(() => {
        dispatch(fetchProducts({ skip: 0 }));  // Only dispatch once, initial loading.  No sort params here.
    }, [dispatch]);

    const filteredProducts = useMemo(() => {
        let results = [...products]; // Start with all products

        // Apply sorting
        if (sortPrice) {
            results = sortProducts(results, 'price', sortPrice);
        } else if (sortName) {
            results = sortProducts(results, 'name', sortName);
        } else if (sortQuantity) {
            results = sortProducts(results, 'stock', sortQuantity);
        }

        // Apply filtering
        if (searchTerm) {
            results = results.filter(product =>
                product.title?.toLowerCase().includes(searchTerm.toLowerCase()) // Safe access
            );
        }

        return results;
    }, [products, sortPrice, sortName, sortQuantity, searchTerm, sortProducts]);

    const toggleSortPrice = useCallback(() => {
        dispatch(setSortPrice(sortPrice === 'asc' ? 'desc' : 'asc'));
    }, [dispatch, sortPrice]);

    const toggleSortName = useCallback(() => {
        dispatch(setSortName(sortName === 'asc' ? 'desc' : 'asc'));
    }, [dispatch, sortName]);

    const toggleSortQuantity = useCallback(() => { // Corrected typo here
        dispatch(setSortQuantity(sortQuantity === 'asc' ? 'desc' : 'asc'));
    }, [dispatch, sortQuantity]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <div className={s.productsContainer}> {/* Wrap everything in a container with a CSS Module class */}
            {/* Search Input*/}
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={s.searchInput} // Add a CSS Module class for styling the input
            />

            <div className={s.buttonContainer}> {/* Container for buttons, for styling */}
                <button onClick={toggleSortPrice}>
                    Sort by Price ({sortPrice === 'asc' ? 'Ascending' : 'Descending'})
                </button>
                <button onClick={toggleSortName}>
                    Sort by Name ({sortName === 'asc' ? 'Ascending' : 'Descending'})
                </button>
                <button onClick={toggleSortQuantity}> {/* Corrected typo here */}
                    Sort by Quantity ({sortQuantity === 'asc' ? 'Ascending' : 'Descending'})
                </button>
            </div>

            {filteredProducts.length > 0 ? (
                <div className={s.productsGrid}> {/* Use a grid layout */}
                    {filteredProducts.map((product) => (
                        <div key={product.id} className={s.productCard}>
                                <h2 className={s.productTitle}>{product.title}</h2>
                                <img src={product.thumbnail} alt={product.title} className={s.productImage} />
                                <p className={s.description}>{product.description }</p>
                                <p className={s.productStock}>Stock: {product.stock}</p>
                                <p className={s.productPrice}>Price: ${product.price}</p>
                                <p className={s.productStockWithDiscount}>Price: ${Math.floor(product.price - ((product.price / 100) * Math.floor(product.discountPercentage)))}</p>
                                <p className={s.producDiscount}>Discount: {Math.floor(product.discountPercentage)}%</p>
                            <Link to={`/productpage/${product.id}`}>
                            <button className={s.btn}>Подробнее</button>
                            </Link>
                            <button  style={{ marginLeft: '10px' }}>

                            <Link to={`/productpage/${product.id}`}>
                            <img className={s.img} src={bin} alt="" />
                            </Link>
                            
                        </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={s.noProducts}>No products found.</p>
            )}
        </div>
    );
};

export default Products;
