<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bit102_assignment"; // Ensure this database exists or create it

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO user_payment (name, phone, address, country, city, total_quantity, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssid", $name, $phone, $address, $country, $city, $total_quantity, $total_price);

// Set parameters and execute
$name = $_POST['name'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$country = $_POST['country'];
$city = $_POST['city'];
$total_quantity = intval($_POST['total_quantity']);
$total_price = floatval($_POST['total_price']);

if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
