import React, { useState, useMemo, useRef} from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import s from './ProductPage.module.scss';
import { selectProducts } from '../../store/weather/weatherSlice';

SwiperCore;


function ProductDetailsPage({ addToCart }) {
    const { id } = useParams();
    const productId = parseInt(id, 10);

    const products = useSelector(selectProducts);
    const product = products.find(item => item.id === productId);
    const swiperRef = useRef(null);

    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <p>Товар не найден</p>;
    }

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        alert("Вы добавили " + product.title + " в количестве " + quantity);
    };

    const imageURLs = useMemo(() => {
        return product.images || [product.thumbnail];
    }, [product]);

    const swiperParams = {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: false,
        onSwiper: (swiper) => {
            swiperRef.current = swiper;
        }
    };

    const goToPrevious = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const goToNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const discountedPrice = Math.floor(product.price - ((product.price / 100) * Math.floor(product.discountPercentage)));

    return (
        <div className="container">
            <div className={s.box}>
                <Link to="/">
                    <button className={s.btn}>
                        Go back
                    </button>
                </Link>
                <Link to="/cart">
                    <button className={s.btn}>
                        Go to cart
                    </button>
                </Link>
            </div>

            <div className={s.productDetailContainer}>
                <div className={s.productCard}>
                    <h2 className={s.productTitle}>{product.title}</h2>
                    <Swiper {...swiperParams} className={s.swiperContainer}>
                        {imageURLs.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img} alt={`Product ${index + 1}`} className={s.productImage} />
                            </SwiperSlide>
                        ))}
                        <div className="swiper-pagination"></div>
                    </Swiper>

    {product.images && product.images.length > 1 && (
            <div className={s.swiperButtons}>
                <button onClick={goToPrevious} className={`${s.swiperButton} swiper-button-prev`}></button>
                <button onClick={goToNext} className={`${s.swiperButton} swiper-button-next`}></button>
            </div>
        )}
                    <div className={s.box1}>
                        <p className={s.productDescription}>{product.description}</p>
                    </div>
                    <p className={s.productStock}>Stock: {product.stock}</p>
                    <p className={s.productPrice}>Price: ${product.price}</p>
                    <p className={s.productStockWithDiscount}>Discounted Price: ${discountedPrice}</p>
                    <p className={s.producDiscount}>Discount: {Math.floor(product.discountPercentage)}%</p>
                </div>
            </div>
            <div className={s.box}>

            <label>
                            Количество:
                            <input
                                className={s.input}
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                />
                        </label>

                        <button onClick={handleAddToCart} className={s.btn}
                        >
                            Добавить в корзину
                        </button>
                            </div>
                    </div>

    );
}

export default ProductDetailsPage;
