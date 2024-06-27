let listCart = [];

function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        try {
            listCart = JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
        } catch (e) {
            console.error('Error parsing cart cookie:', e);
            listCart = [];
        }
    }
}


function addCartToHTML() {
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    
    // if has product in Cart
    if (listCart && listCart.length > 0) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">RM ${product.price.toFixed(2)}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">RM ${(product.price * product.quantity).toFixed(2)}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
                totalPrice += (product.price * product.quantity);
            }
        });
    } else {
        // Optionally, display a message if the cart is empty
        listCartHTML.innerHTML = '<p>No items in the cart</p>';
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'RM ' + totalPrice.toFixed(2);
}

// Call functions to initialize cart
checkCart();
addCartToHTML();