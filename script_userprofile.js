document.getElementById('edit-button').addEventListener('click', function() {
    console.log('Edit button clicked');

    // Show input fields and hide text
    const editInputs = document.querySelectorAll('.edit-input');
    editInputs.forEach(input => input.style.display = 'inline');
    
    document.getElementById('edit-dob').value = document.getElementById('dob').innerText;
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
    document.getElementById('dob').innerText = document.getElementById('edit-dob').value;
    document.getElementById('phone').innerText = document.getElementById('edit-phone').value;
    document.getElementById('address').innerText = document.getElementById('edit-address').value;

    // Update the sidebar with the new username
    document.getElementById('sidebar-username').innerText = document.getElementById('edit-fullname').value;

    // Hide input fields and show text
    const editInputs = document.querySelectorAll('.edit-input');
    editInputs.forEach(input => input.style.display = 'none');

    const contentTexts = document.querySelectorAll('.content-text');
    contentTexts.forEach(text => text.style.display = 'inline');

    // Hide the save button and show the edit button
    document.getElementById('edit-button').style.display = 'inline';
    document.getElementById('save-button').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const inputs = document.querySelectorAll('.edit-input');

    editButton.addEventListener('click', function() {
        inputs.forEach(input => input.style.display = 'block');
        saveButton.style.display = 'block';
        editButton.style.display = 'none';
    });

    saveButton.addEventListener('click', function() {
        document.querySelector('form').submit();
    });
});