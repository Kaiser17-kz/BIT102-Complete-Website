const selection = document.getElementById('sorting');
const field = document.querySelector('.musthave__grid');
const cards = Array.from(document.querySelectorAll('.musthave__card'));
const filterItems = document.querySelectorAll('.musthave__nav li');
const sortingSelect = document.getElementById('sorting');
const musthaveGrid = document.querySelector('.musthave__grid');

selection.onchange = sortingValue;          //set the onchange event for the sorting selection

function sortingValue() {
let sortLi;
if (this.value === 'Default') {
sortLi = cards.sort((a, b) => {
return a.textContent.localeCompare(b.textContent);
});
} else if (this.value === 'LowToHigh') {
sortLi = cards.sort((a, b) => { 
let priceA = parseFloat(a.querySelector('p').textContent.replace(/[^\d.]/g, ''));
let priceB = parseFloat(b.querySelector('p').textContent.replace(/[^\d.]/g, ''));
return priceA - priceB;
});
} else if (this.value === 'HighToLow') {
sortLi = cards.sort((a, b) => {
let priceA = parseFloat(a.querySelector('p').textContent.replace(/[^\d.]/g, ''));
let priceB = parseFloat(b.querySelector('p').textContent.replace(/[^\d.]/g, ''));
return priceB - priceA;
});
}
field.innerHTML = '';                    //clear the grid and append the sorted cards
sortLi.forEach(card => {
field.appendChild(card);
});
}

filterItems.forEach(item => {                                          //show/hide cards based on the selected category
    item.addEventListener('click', function() {
        filterItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const category = this.getAttribute('data-category');

        cards.forEach(card => {
            if (category === 'ALL' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});