import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/weather/weatherSlice'; // Assuming you have these

import Navbar from "./components/Navbar";

import Products from "./components/Products";
import Users from "./pages/Users";
import ProductsId from "./components/ProductsPages/ProductsID";  // Added import

function App() {
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchProducts({ skip: 0 }));  // Load products when the app starts
    }, [dispatch]);

    // Добавление товара в корзину с учётом количества
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingIndex = prevItems.findIndex(item => item.id === product.id);
            if (existingIndex >= 0) {
                // Если товар есть, увеличиваем количество
                const updatedItems = [...prevItems];
                updatedItems[existingIndex].quantity += product.quantity;
                return updatedItems;
            } else {
                // Добавляем новый товар с количеством
                return [...prevItems, { ...product }];
            }
        });
    };

    // Удаление товара по id
    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Обновление количества товара в корзине
    const updateQuantity = (id, newQuantity) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    return (
        <>
            <Navbar />
            <Routes>

                <Route path="/" element={<Products />} />
                <Route
                    path="/productpage/:id"   // Changed path for clarity
                    element={<ProductsId addToCart={addToCart} />}
                />
                <Route
                    path="/cart"
                    element={
                        <Users
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
