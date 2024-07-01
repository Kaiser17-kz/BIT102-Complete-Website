let products = [
    { id: 1, name: 'Colorful Button Shirt', price: 59.00, image: 'pic.store/color-shirt.jpg' },
    { id: 2, name: 'Blue "Actual" Jacket', price: 79.00, image: 'pic.store/Jacket.avif' },
    { id: 3, name: 'Chess Pattern Shirt', price: 49.90, image: 'pic.store/cartoon.jpeg' },
    { id: 4, name: 'Light Blue Pants', price: 59.00, image: 'pic.store/pants.jpg' },
    { id: 5, name: 'Floral Green Dress', price: 39.00, image: 'pic.store/kids.webp' },
    { id: 6, name: 'Blue Angle Dress', price: 39.00, image: 'pic.store/Cartoon dress.webp' },
    { id: 7, name: 'Gradient Green Shirt', price: 99.00, image: 'pic.store/child.webp' },
    { id: 8, name: 'KEIKO Long-sleeved Shirt', price: 79.00, image: 'pic.store/keiko-tshirt.webp' },
    { id: 9, name: 'Graffiti Button Shirt', price: 59.90, image: 'pic.store/nice.jpeg' },
    { id: 10, name: 'Gray Hoodie', price: 129.90, image: 'pic.store/tracksuit.avif' },
    { id: 11, name: 'Colorful Bear Bear', price: 59.90, image: 'pic.store/color-bear.webp' },
    { id: 12, name: 'Cute Fairy Dress', price: 79.90, image: 'pic.store/green.avif' },
    { id: 13, name: 'SunFlower Dress', price: 69.00, image: 'pic.store/elder.webp' },
    { id: 14, name: 'Open Front Outerwear & Crew Neck Tank Dress', price: 95.00, image: 'pic.store/older people.webp' },
    { id: 15, name: 'Black Elegant Dress', price: 80.00, image: 'pic.store/elder1.webp' },
];

let cartItems = [];

export function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    updateCart();
}

export function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    let cartTotal = 0;

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" height="50"></td>
            <td>${item.name}</td>
            <td>RM ${item.price.toFixed(2)}</td>
            <td>
                <div class="quantity-container">
                    <button class="counter-btn" data-id="${item.id}" data-action="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="counter-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
            </td>
            <td>RM ${itemTotal.toFixed(2)}</td>
            <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
        `;

        cartItemsContainer.appendChild(row);
    });

    cartTotalContainer.textContent = `RM ${cartTotal.toFixed(2)}`;

    // Save the cart to a cookie
    document.cookie = `listCart=${JSON.stringify(cartItems)};path=/`;

    // Attach event listeners for quantity and remove buttons
    attachCartEventListeners();
}


function attachCartEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.counter-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.getAttribute('data-id'), 10);
            const action = event.target.getAttribute('data-action');
            changeQuantity(productId, action);
        });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.getAttribute('data-id'), 10);
            removeFromCart(productId);
        });
    });
}

export function changeQuantity(productId, action) {
    const item = cartItems.find(item => item.id === productId);

    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
    } else if (action === 'decrease' && item.quantity === 1) {
        removeFromCart(productId);
    }

    updateCart();
}

export function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
}

export function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('open');
}

export function checkout() {
    if (cartItems.length > 0) {
        alert('Proceeding to payment');
    } else {
        alert('Your cart is empty!');
    }
}

// Ensure that the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Call functions to check the cart and populate HTML
    checkCart();
    addCartToHTML();
});
