<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bit102assignment";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST["login"])) {                //check if the form was submitted
    $username = $_POST["username"];          //retrieve username and password from form 
    $password = $_POST["password"];
    
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = mysqli_stmt_init($conn);
    
    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $user = mysqli_fetch_array($result, MYSQLI_ASSOC);               //fetch user data
        
        if ($user) {
            if (password_verify($password, $user["password"])) {         //verify the password
                $_SESSION['user_id'] = $user['id'];                      // Set session variable
                $_SESSION['username'] = $user['username'];               // Set session username
                echo "<script>alert('Login successfully.'); window.location.href = 'BIT102 Assignment 1.php';</script>";
            } else {
                echo "<script>alert('Invalid email or password.'); window.location.href = 'BIT102 Assignment 1.html';</script>";
            }
        } else {
            echo "<script>alert('No account found with the username.'); window.location.href = 'BIT102 Assignment 1.html';</script>";
        }
    }
}

$conn->close();
?>
