<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

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

// Create the registration table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255)
)";

if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error . "<br>";
}

if (isset($_POST["submit_register"])) {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $passwordhash = password_hash($password, PASSWORD_DEFAULT);
    $errors = array();

    if (empty($username) || empty($email) || empty($password)) {
        array_push($errors, "All fields are required");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        array_push($errors, "Email is not valid");
    }
    if (strlen($password) < 8) {
        array_push($errors, "Password must be at least 8 characters");
    }

    $sql = "SELECT * FROM users WHERE email = ? OR username = ?";
    $stmt = mysqli_stmt_init($conn);

    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "ss", $email, $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $rowCount = mysqli_num_rows($result);

        if ($rowCount > 0) {
            array_push($errors, "Email or Username already exists!");
        }
    } else {
        array_push($errors, "Database error. Please try again later.");
    }

    if (count($errors) > 0) {
        foreach ($errors as $error) {
            echo "<script>alert('$error'); window.location.href = 'BIT102 Assignment 1.html';</script>";
        }
    } else {
        $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        $stmt = mysqli_stmt_init($conn);

        if (mysqli_stmt_prepare($stmt, $sql)) {
            mysqli_stmt_bind_param($stmt, "sss", $username, $email, $passwordhash);
            if (mysqli_stmt_execute($stmt)) {

                // Send a confirmation email
                $mail = new PHPMailer(true);

                try {
                    // Server settings
                    $mail->SMTPDebug = 0;                      // Disable verbose debug output
                    $mail->isSMTP();                           // Set mailer to use SMTP
                    $mail->Host       = 'smtp.gmail.com';      // Specify main and backup SMTP servers
                    $mail->SMTPAuth   = true;                  // Enable SMTP authentication
                    $mail->Username   = 'dopaminehelpcenter@gmail.com'; // SMTP username
                    $mail->Password   = 'itvr cisd cxnk laio'; // SMTP password (or app password if 2FA is enabled)
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption, `ssl` also accepted
                    $mail->Port       = 587;                   // TCP port to connect to

                    // Recipients
                    $mail->setFrom('dopaminehelpcenter@gmail.com', 'Dopamine');
                    $mail->addAddress($email, $username); // Add a recipient

                    // Content
                    $mail->isHTML(true);                       // Set email format to HTML
                    $mail->Subject = 'Registration Confirmation';
                    $mail->Body    = 'Dear ' . $username . ',<br><br>Thank you for registering on our website.<br><br>Best Regards,<br>Your Website Name';
                    $mail->AltBody = 'Dear ' . $username . ',\n\nThank you for registering on our website.\n\nBest Regards,\nYour Website Name';

                    $mail->send();
                    echo "<script>alert('Registration successful. A confirmation email has been sent.'); window.location.href = 'BIT102 Assignment 1.html';</script>";
                } catch (Exception $e) {
                    echo "<script>alert('Registration successful, but the email could not be sent.'); window.location.href = 'BIT102 Assignment 1.html';</script>";
                }
            } else {
                echo "<script>alert('Something went wrong. Please try again later.'); window.location.href = 'BIT102 Assignment 1.html';</script>";
            }
        } else {
            echo "<script>alert('Something went wrong. Please try again later.'); window.location.href = 'BIT102 Assignment 1.html';</script>";
        }
    }
}

$conn->close();
?>
