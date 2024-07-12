<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bit102assignment";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if (isset($_POST["login"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // Prepare statement to prevent SQL injection
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = mysqli_stmt_init($conn);
    
    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
        
        if ($user) {
            if (password_verify($password, $user["password"])) {
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