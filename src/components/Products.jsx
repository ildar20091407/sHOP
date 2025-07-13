import React, { useEffect, useState } from 'react';
import Product from '../pages/Product';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProducts,
    selectLoading,
    selectTotal,
    selectLimit,
    fetchProducts,
} from '../store/weather/weatherSlice';
import s from "./ProductsList.module.scss"

function ProductsList() {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const total = useSelector(selectTotal);
    const limit = useSelector(selectLimit);

    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = Math.ceil(total / limit);

    useEffect(() => {
        dispatch(fetchProducts({ skip: (currentPage - 1) * limit }));
    }, [dispatch, currentPage, limit]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading && products.length === 0) {
        return <p>Loading products...</p>;
    }

    return (
        <div>
            <Product />
            <div>
                <div className="container">

                <div className={s.box}>
                <button 
                    className={s.box__button}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    >
                    Previous
                </button>
                <span className={s.box__text}>Page {currentPage} of {lastPage}</span>
                <button
                className={s.box__button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= lastPage || loading}
                >
                    Next
                </button>
                    </div>
                        </div>
                    
            </div>
        </div>
    );
}

export default ProductsList;


