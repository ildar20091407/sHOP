import React, { useRef } from 'react';
import s from './Users.module.scss';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom'; // Import Link

const Users = ({ cartItems, removeFromCart, updateQuantity }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const form = useRef();

    const handleQuantityChange = (id, e) => {
        const value = Number(e.target.value);
        if (value >= 1) {
            updateQuantity(id, value);
        }
    };

    const generateCartText = () => {
        let cartText = '';
        if (cartItems.length === 0) {
            cartText = 'Корзина пуста';
        } else {
            cartText = cartItems.map(item => `Товар: ${item.title},
                
                Цена: ${item.price}, 
                
                Кол-во: ${item.quantity},
                
                Сумма: ${item.price * item.quantity}.\n`).join('');

                
            cartText += `\nИтого: ${total} руб.`;
        }
        return cartText;
    };

    const handleSendClick = (e) => {
        e.preventDefault();

        if (form.current) {
            const cartText = generateCartText();
            form.current.message.value = cartText; // Assign cartText to message field

            emailjs.sendForm('service_qpatmgp', 'template_lc1e2ax', form.current, 'JWaSpnmlhnunZpzHr')
                .then((result) => {
                    console.log(result.text);
                    alert('Message sent!');
                }, (error) => {
                    console.log(error.text);
                    alert('An error occurred, please try again.');
                });
        } else {
            console.error("Form reference is not correctly attached.");
            alert("Error: Form is not initialized correctly. Please try again.");
        }
    };

    return (
        <div>
            <div className="border p-2 w-64">
                <h2 className="text-xl font-semibold mb-2">Корзина</h2>
                        <Link to="/products">Go to Products</Link> {/* Add the Link here */}
                {cartItems.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    <div className={s.tableWrapper}>
                        <table className={s.cartTable}>
                            <thead>
                                <tr>
                                    <th className={s.title}>Товар</th>
                                    <th className={s.title}>Цена, руб.</th>
                                    <th className={s.title}>Количество</th>
                                    <th className={s.title}>Сумма, руб.</th>
                                    <th className={s.title}>Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((data) => (
                                    <tr key={data.id}>
                                        <td className={s.text}>{data.title}</td>
                                        <td className={s.text}>{data.price}</td>
                                        <td  className={s.text}>
                                            <input
                                                type="number"
                                                min="1"
                                                value={data.quantity}
                                                onChange={(e) => handleQuantityChange(data.id, e)}
                                            />
                                        </td>
                                        <td  className={s.text}>{data.price * data.quantity}</td>
                                        <td  className={s.text}>
                                            <button
                                                onClick={() => removeFromCart(data.id)}
                                                title="Удалить товар"
                                            >
                                                ❌
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <p className={s.total}>Итого: {total} руб.</p>
            </div>

            {/* Contact Form */}
            <form ref={form}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <textarea name="message" style={{ display: 'none' }} />

                <button onClick={handleSendClick}>Send</button>
            </form>
        </div>
    );
};

export default Users;
