<?php                                              //Check the login status of user
session_start();
$response = array('loggedin' => false, 'username' => '');

if (isset($_SESSION['user_id'])) {
    $response['loggedin'] = true;
    $response['username'] = $_SESSION['username']; // Add username to response
}

echo json_encode($response);                       //send back a JSON response
?>