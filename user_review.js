//Review Update

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('Submit');
    const reviewsContainer = document.getElementById('reviews');
    let selectedRating = 0;

    const stars = document.querySelectorAll('.feedback_rating span');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));

            // Toggle the star selection
            if (selectedRating === rating) {
                selectedRating = 0; // Unselect all stars if the same star is clicked again
            } else {
                selectedRating = rating;
            }
            updateStarColors(selectedRating);
        });
    });

    function updateStarColors(rating) {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-rating')) <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }
});


//textbox limit
var textType = document.getElementById("type_text");
var total = document.getElementById("text_total");
var text_limit = 500;

total.textContent = 0 + "/" + text_limit;

textType.addEventListener("input", function() {
  var text = textType.value;
  var textLength = text.length;

  if (textLength > text_limit){

    textType.value = text.slice(0, text_limit);
    textLength = text_limit;
  }

  total.textContent = textLength + "/" + text_limit;

  // Update styles based on text length
  if (textLength >= text_limit) {
    textType.style.borderColor = "#FF0000";
    total.style.color = "#FF0000";
  } 
  else if(textLength > 0){
    textType.style.borderColor = "#028A0F";
    total.style.color = "#028A0F";
  }

  else{
    textType.style.borderColor = "#000000";
    total.style.color = "#000000";
  }

});
