
import { addToCart, toggleCart, checkout } from './cart1.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'), 10);
            addToCart(productId);
        });
    });

    document.querySelector('.open-cart-btn').addEventListener('click', toggleCart);
    document.querySelector('.close-cart-btn').addEventListener('click', toggleCart);
    document.querySelector('.payment-btn').addEventListener('click', checkout);
});
