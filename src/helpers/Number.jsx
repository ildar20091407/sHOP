import React, { useEffect, useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import {

        selectLoading,
        selectTotal,
        selectLimit,
        fetchProducts,
        num
    } from '../store/weather/weatherSlice';
    import  './Number.scss'
    import img from "../assets/images/png-transparent-arrow-arrows-direction-universal-blue-line-filled-icon.png"
    

    const Numberlist = () => {
        const numbers = []; // Объявляем пустой массив
  for (let i = 1; i <= num; i++) { // Начинаем с 1 и идем до 17 включительно
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
                                               {currentPage > 1 ? (
                                                   <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={loading} // Упрощаем условие disabled
                                                >
                                                    <img src={img} alt="" className='buttons__box-target-previous'/>
                                                    
                                                </button>
                                            ) : null}

                        {numbers.map((number) => ( // Используем "number" вместо "i" для понятности
                            <button 
                            className={`buttons__box-number ${currentPage === number ? 'buttons__box-number-active' : ''}`}
                            onClick={() => handlePageChange(number)}
                            
                            key={number}>
                                {number}
                                </button>            
                        ))}
                        {currentPage < 17 ? (
                        <button
                        className="buttons__box-target-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= lastPage || loading}
                        >
                                <img src={img} alt="" className='buttons__box-target-next'/>
                        </button>
                        
                    ) : null}
                        </div>
 

                    </div>
                </div>              
                </div>              


        );
};  

export default Numberlist;