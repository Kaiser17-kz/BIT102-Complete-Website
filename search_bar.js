document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search');
    const resultsCont = document.getElementById('search_results');

    if (query) {
        const clothing_info = [
            { img: 'pic.store/color-shirt.jpg', name: 'Colorful Button Shirt', price: 'RM 59.00' },
            { img: 'pic.store/Jacket.avif', name: 'Blue "Actual" Jacket', price: 'RM 79.00' },
            { img: 'pic.store/cartoon.jpeg', name: 'Chess Pattern Shirt', price: 'RM 49.90' },
            { img: 'pic.store/pants.jpg', name: 'Light Blue Pants', price: 'RM 59.00' },
            { img: 'pic.store/kids.webp', name: 'Floral Green Dress', price: 'RM 39.00' },
            { img: 'pic.store/Cartoon dress.webp', name: 'Blue Angle Dress', price: 'RM 39.00' },
            { img: 'pic.store/child.webp', name: 'Gradient Green Shirt', price: 'RM 99.00' },
            { img: 'pic.store/keiko-tshirt.webp', name: 'KEIKO Long-sleeved Shirt', price: 'RM 79.00' },
            { img: 'pic.store/nice.jpeg', name: 'Graffiti Button Shirt', price: 'RM 59.90' },
            { img: 'pic.store/tracksuit.avif', name: 'Gray Hoodie', price: 'RM 129.90' },
            { img: 'pic.store/color-bear.webp', name: 'Colorful Bear Bear', price: 'RM 59.90' },
            { img: 'pic.store/green.avif', name: 'Cute Fairy Dress', price: 'RM 79.90' },
            { img: 'pic.store/elder.webp', name: 'SunFlower Dress', price: 'RM 69.00' },
            { img: 'pic.store/older people.webp', name: 'Open Front Outerwear & Crew Neck Tank Dress', price: 'RM 95.00' },
            { img: 'pic.store/elder1.webp', name: 'Black Elegent Dress', price: 'RM 80.00' }
        ];

        const filters = clothing_info.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

        if (filters.length > 0) {
            filters.forEach(item => {
                const clothing_card = document.createElement('div');
                clothing_card.classList.add('musthave__card');
                clothing_card.innerHTML = 
                    `<img src="${item.img}" alt="${item.name}" height="280">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>`;
                resultsCont.appendChild(clothing_card);
            });
        } else {
            resultsCont.innerHTML = '<h2>No results found.</h2>';
        }
    }

    // Live search functionality
    $("#search").keyup(function() {
        var name = $('#search').val();
        if (name == "") {
            $("#display").html("").hide();
        } else {
            $.ajax({
                type: "POST",
                url: "search_bar.php",
                data: { search: name },
                success: function(html) {
                    $("#display").html(html).show();
                }
            });
        }
    });
});

function fill(Value) {
    $('#search').val(Value);
    $('#display').hide();
}
