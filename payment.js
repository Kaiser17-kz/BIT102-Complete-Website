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

        document.getElementById('paymentButton').addEventListener('click', () => {
            const totalQuantity = document.querySelector('.totalQuantity').innerText;
            const totalPrice = document.querySelector('.totalPrice').innerText.replace('RM ', '');

            document.getElementById('total_quantity').value = totalQuantity;
            document.getElementById('total_price').value = totalPrice;

            const form = document.getElementById('paymentForm');
            const formData = new FormData(form);

            // Send form data to PHP
            fetch('user_information.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log('Success:', data);
                // After successful data submission, initiate Razorpay payment
                var options = {
                    "key": "rzp_test_Fa2Zd592wbGFAT", // Enter the API key here
                    "amount": totalPrice * 100, // Amount is in currency subunits. Multiply by 100 to convert to paise if INR
                    "currency": "INR",
                    "name": "DOPAMINE",
                    "description": "Please pay for your shirt",
                    "image": "PIC/dopamine-high-resolution-logo-transparent.png",
                    "handler": function (response){
                        alert('Payment successful. Razorpay Payment ID: ' + response.razorpay_payment_id);
                        // You can now redirect the user to a success page
                        window.location.href = 'success.html';
                    },
                    "prefill": {
                        "name": document.getElementById('name').value,
                        "email": "user@example.com",
                        "contact": document.getElementById('phone').value
                    },
                    "notes": {
                        "address": document.getElementById('address').value
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new Razorpay(options);
                rzp1.open();
            })
            .catch(error => console.error('Error:', error));
        });

        document.addEventListener('DOMContentLoaded', () => {
            // Fetch countries
            fetch('https://restcountries.com/v3.1/all')
                .then(response => response.json())
                .then(data => {
                    const countrySelect = document.getElementById('country');
                    data.forEach(country => {
                        const option = document.createElement('option');
                        option.value = country.cca2;
                        option.text = country.name.common;
                        countrySelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching country data:', error));

            // Initialize phone number input with intl-tel-input
            const phoneInput = document.getElementById('phone');
            window.intlTelInput(phoneInput, {
                initialCountry: 'auto',
                geoIpLookup: function(callback) {
                    fetch('https://ipapi.co/json')
                        .then(response => response.json())
                        .then(data => callback(data.country))
                        .catch(() => callback('us'));
                },
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
            });
        });

        // Call functions to initialize cart
        checkCart();
        addCartToHTML();