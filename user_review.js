$(document).ready(function() {
    var rating_data = 0; //Initialize the rating data

    //This is to update the color appearance of the star after user pick a star rating
    function updateStarColors(rating) {
        $('.feedback_rating span').each(function() {
            if (parseInt($(this).attr('data-rating')) <= rating) {
                $(this).addClass('selected');
            } else {
                $(this).removeClass('selected');
            }
        });
    }

    //This is when user click on the star rating in the feedback form
    $('.feedback_rating span').click(function() {
        var rating = parseInt($(this).attr('data-rating')); //Get the rating that user click 
                                                            //and converts it into integer

        if (rating_data === rating) { //If data rating user click is similar 
                                      //to the initialize rating in the beginning

            rating_data = 0; //This means that it essentially deselect 
                             //the rating chose by the user which is 0
        } else {    
            rating_data = rating; //Else, this means that the rating chose by 
                                  //the user is updated into the rating data
        }
        updateStarColors(rating_data); //It will intialize the update rating color function 
                                        //and then update the star color based on the rating chosen by the user.
    });


    //When user press the submit button
    $('#Submit').click(function(event) {
        event.preventDefault(); //Prevent the form from the default submission

        //Trim of all the whitespaces on the name and review commented
        var user_name = $('#name_text').val().trim(); 
        var user_review = $('#type_text').val().trim();

        //Initialize AJAX response
        $.ajax({
            url: "user_review.rating.php", 
            method: "POST",
            data: {
                rating_data: rating_data,
                user_name: user_name,
                user_review: user_review
            },
            success: function(data) {
                $('#name_text').val('');
                $('#type_text').val('');
                rating_data = 0;
                load_rating_data();
                updateStarColors(rating_data);
                alert(data.message ? data.message : data.error);
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                alert('Error: ' + error);
            }
        });

    });

    load_rating_data();

    function load_rating_data(){
        $.ajax({
            url: "user_review.rating.php",
            method: "POST",
            data: { action: 'load_data' },
            dataType: "JSON",
            success: function(data) {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Update ratings and reviews
                    document.getElementById('average_rating').innerHTML = data.average_rating;
                    document.getElementById('total_review').innerHTML = data.total_review;

                    // Update star ratings
                    $('.main_star').each(function(index) {
                        if (index < Math.ceil(data.average_rating)) {
                            $(this).addClass('text-warning').removeClass('star-light');
                        } else {
                            $(this).removeClass('text-warning').addClass('star-light');
                        }
                    });

                    // Update total star reviews
                    document.getElementById('total_five_star_review').innerHTML = data.five_star_review;
                    document.getElementById('total_four_star_review').innerHTML = data.four_star_review;
                    document.getElementById('total_three_star_review').innerHTML = data.three_star_review;
                    document.getElementById('total_two_star_review').innerHTML = data.two_star_review;
                    document.getElementById('total_one_star_review').innerHTML = data.one_star_review;

                    // Update star progress bars
                    $('#five_star_progress').css('width', (data.five_star_review / data.total_review * 100) + '%');
                    $('#four_star_progress').css('width', (data.four_star_review / data.total_review * 100) + '%');
                    $('#three_star_progress').css('width', (data.three_star_review / data.total_review * 100) + '%');
                    $('#two_star_progress').css('width', (data.two_star_review / data.total_review * 100) + '%');
                    $('#one_star_progress').css('width', (data.one_star_review / data.total_review * 100) + '%');

                    // Update reviews content
                    if (data.review_data.length > 0) {
                        var html = '';
                        data.review_data.forEach(function(review) {
                            html += '<div class="reviews_box">';
                            html += '<div class="box_top">';
                            html += '<div class="profile">';
                            html += '<div class="profile_pic">';
                            html += '<img src="pic.store/Henry_Cavill.webp' + review.user_ProfilePic + '" />';
                            html += '</div>';
                            html += '<div class="name_user">';
                            html += '<strong>' + review.user_Name + '</strong>';
                            html += '<span>@' + review.user_Name + '</span>';
                            html += '</div>';
                            html += '</div>';
                            html += '<div class="rating">';
                            
                            // Adding star icons based on rating
                            for (var star = 1; star <= 5; star++) {
                                var class_name = (review.rating >= star) ? 'ri-star-fill' : 'ri-star-line';
                                html += '<i class="ri ' + class_name + '"></i>';
                            }
                            
                            html += '</div>'; // End of rating div
                            html += '</div>'; // End of box_top div
                            html += '<div class="client_comment">';
                            html += '<p>' + review.user_Review + '</p>';
                            html += '<div class="text-right">On '+ review.date_Time +'</div>';
                            html += '</div>'; // End of client_comment div
                            html += '</div>'; // End of reviews_box div
                        });

                        $('#review_content').html(html); // Update the html and creates the review bar submitted by user.
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                alert('Error: ' + error);
                }
            });
    };


});

