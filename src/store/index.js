    import { configureStore } from '@reduxjs/toolkit';
    import selectProducts  from './weather/weatherSlice'; // ИМЯ МОЖЕТ ОТЛИЧАТЬСЯ

    const store = configureStore({
      reducer: {
        productSlice: selectProducts , // <-- КЛЮЧЕВОЕ ИМЯ ЗДЕСЬ
        // ... другие reducers
      },
    });

    export default store;
    
