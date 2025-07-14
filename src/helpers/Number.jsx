import React, { useEffect, useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import {

        selectLoading,
        selectTotal,
        selectLimit,
        fetchProducts,
    } from '../store/weather/weatherSlice';
    import  './Number.scss'

const Numberlist = () => {
  const numbers = []; // Объявляем пустой массив
  for (let i = 1; i <= 17; i++) { // Начинаем с 1 и идем до 17 включительно
    numbers.push(i); // Добавляем значение в массив
  }
  
  
      
      const dispatch = useDispatch();
      const loading = useSelector(selectLoading);
      const total = useSelector(selectTotal);
      const limit = useSelector(selectLimit);
  
      const [currentPage, setCurrentPage] = useState(1);
      const lastPage = Math.ceil(total / limit);
  
      useEffect(() => {
          dispatch(fetchProducts({ skip: (currentPage - 1) * limit }));
      }, [dispatch, currentPage, limit]);

      useEffect(() => {
          dispatch(fetchProducts({ skip: (numbers.number-1) * limit }));
      }, [dispatch, numbers.number, limit]);
  
      const handlePageChange = (newPage) => {
          setCurrentPage(newPage);
      };
  
  

  return (
        <div className="container">

            <div className="buttons">
                <div className="buttons__box">
                    <div className="buttons__box-numbers">

                        {numbers.map((number) => ( // Используем "number" вместо "i" для понятности
                            <button 
                            className="buttons__box-number"
                            onClick={() => handlePageChange(number)}
                            
                            key={number}>
                                {number}
                                </button>            
                        ))}

                    </div>
                    <div className="buttons__box-target">

                        <button 
                            className="buttons__box-target-btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || loading}    
                            >
                            Previous
                        </button>
                        <span className="buttons__box-target-text">Page {currentPage} of {lastPage}</span>
                        <button
                        className="buttons__box-target-btn"
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
};  

export default Numberlist;



