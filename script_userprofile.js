document.getElementById('edit-button').addEventListener('click', function() {
    console.log('Edit button clicked');

    // Show input fields and hide text
    const editInputs = document.querySelectorAll('.edit-input');
    editInputs.forEach(input => input.style.display = 'inline');
    
    document.getElementById('edit-fullname').value = document.getElementById('fullname').innerText;
    document.getElementById('edit-dob').value = document.getElementById('dob').innerText;
    document.getElementById('edit-email').value = document.getElementById('email').innerText;
    document.getElementById('edit-phone').value = document.getElementById('phone').innerText;
    document.getElementById('edit-address').value = document.getElementById('address').innerText;

    const contentTexts = document.querySelectorAll('.content-text');
    contentTexts.forEach(text => text.style.display = 'none');

    // Show the save button and hide the edit button
    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'inline';
});

document.getElementById('save-button').addEventListener('click', function() {
    console.log('Save button clicked');

    // Update the main content with the new values
    document.getElementById('fullname').innerText = document.getElementById('edit-fullname').value;
    document.getElementById('dob').innerText = document.getElementById('edit-dob').value;
    document.getElementById('email').innerText = document.getElementById('edit-email').value;
    document.getElementById('phone').innerText = document.getElementById('edit-phone').value;
    document.getElementById('address').innerText = document.getElementById('edit-address').value;

    // Update the sidebar with the new username
    document.getElementById('sidebar-username').innerText = document.getElementById('edit-fullname').value;

    // Handle profile image update
    const fileInput = document.getElementById('edit-image');
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('sidebar-img').src = e.target.result;
        }
        reader.readAsDataURL(fileInput.files[0]);
    }

    // Hide input fields and show text
    const editInputs = document.querySelectorAll('.edit-input');
    editInputs.forEach(input => input.style.display = 'none');

    const contentTexts = document.querySelectorAll('.content-text');
    contentTexts.forEach(text => text.style.display = 'inline');

    // Hide the save button and show the edit button
    document.getElementById('edit-button').style.display = 'inline';
    document.getElementById('save-button').style.display = 'none';
});