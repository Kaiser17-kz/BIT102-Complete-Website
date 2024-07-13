<?php
// Start the session
session_start();

// Unset all session variables
$_SESSION = array();

// Destroy the session
session_destroy();

// Display an alert message and redirect to the homepage or login page
echo '<script type="text/javascript">
        alert("You have successfully logged out.");
        window.location.href = "BIT102 Assignment 1.html";
      </script>';
exit;
?>
