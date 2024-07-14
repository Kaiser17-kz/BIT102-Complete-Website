<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bit102assignment";

$conn = new mysqli($servername, $username, $password, $dbname);

$loggedIn = isset($_SESSION["username"]);

if($loggedIn) {
    $username = $_SESSION["username"];

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $res = mysqli_query($conn, $sql);

    if($res) {
        while($data = mysqli_fetch_assoc($res)) {
            $email = $data['email'];
            $dob = $data['dob'];
            $phoneNumber = $data['phoneNumber'];
            $Address = $data['Address'];
        }
    }

    // Handle form submission
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $new_dob = $_POST['dob'];
        $new_phoneNumber = $_POST['phoneNumber'];
        $new_Address = $_POST['Address'];
    
        $update_sql = "UPDATE users SET dob = ?, phoneNumber = ?, Address = ? WHERE username = ?";
        $stmt = $conn->prepare($update_sql);
        $stmt->bind_param("ssss", $new_dob, $new_phoneNumber, $new_Address, $username);
    
        if ($stmt->execute()) {
            echo "<script>alert('User information updated successfully!');</script>";
        } else {
            echo "<script>alert('Error updating information.');</script>";
        }
    
        $stmt->close();
    }
} else {
    echo "<script>alert('You are not logged in.');</script>";
    header("Location: login.php");
    exit();
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="styles_userprofile.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <script src="https://smtpjs.com/v3/smtp.js"></script>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="userprofile.php">USER PROFILE</a></li>
                <li><a href="BIT102 Assignment 1.php">SHOPPING CART</a></li>
                <li><a href="faq.html">FAQ</a></li>
            </ul>
        </nav>
    </header>

    <div class="wrapper">
        <a href="BIT102 Assignment 1.php"><img src="pic.store/dopamine-logo.png" alt="logo" class="logo-edit"></a>
        <h1>User Profile</h1>
    </div>

    <div class="row">
        <div class="sidebar">
            <div class="card sidebar-card">
                <img id="sidebar-img" src="pic.store/userimage.jpeg" class="rounded-circle sidebar-img" width="150" alt="User Image">
                <input type="file" id="edit-image" class="edit-input" style="display:none;" accept="image/*">
                <div class="sidebar-content">
                    <h3 id="sidebar-username"><?php echo htmlspecialchars($username); ?></h3>
                        <button class="sidebar-button" id="logout-button"><a href="logout.php">Log Out</a></button>
                </div>
            </div>
        </div>
        <div class="col-md-8 mt-1">
            <div class="card main-content">
                <h1 class="content-title">User Information</h1>
                <div class="card-body">
                    <form method="POST" action="userprofile.php">
                        <div class="content-row">
                            <div class="content-label">Full Name</div>
                            <div class="content-text" id="username"><?php echo htmlspecialchars($username); ?></div>
                            <input type="text" id="edit-fullname" class="edit-input" style="display:none;" name="username" value="<?php echo htmlspecialchars($username); ?>">
                        </div>
                        <div class="content-row">
                            <div class="content-label">Date Of Birth</div>
                            <div class="content-text" id="dob"><?php echo htmlspecialchars($dob); ?></div>
                            <input type="text" id="edit-dob" class="edit-input" style="display:none;" name="dob" value="<?php echo htmlspecialchars($dob); ?>">
                        </div>
                        <div class="content-row">
                            <div class="content-label">Email</div>
                            <div class="content-text" id="email"><?php echo htmlspecialchars($email); ?></div>
                            <input type="email" id="edit-email" class="edit-input" style="display:none;" name="email" value="<?php echo htmlspecialchars($email); ?>">
                        </div>
                        <hr>
                        <div class="content-row">
                            <div class="content-label">Phone Number</div>
                            <div class="content-text" id="phoneNumber"><?php echo htmlspecialchars($phoneNumber); ?></div>
                            <input type="text" id="edit-phone" class="edit-input" style="display:none;" name="phoneNumber" value="<?php echo htmlspecialchars($phoneNumber); ?>">
                        </div>
                        <div class="content-row">
                            <div class="content-label">Address</div>
                            <div class="content-text" id="Address"><?php echo htmlspecialchars($Address); ?></div>
                            <input type="text" id="edit-address" class="edit-input" style="display:none;" name="Address" value="<?php echo htmlspecialchars($Address); ?>">
                        </div>
                        <button type="button" id="edit-button">Edit</button>
                        <button type="submit" id="save-button" style="display:none;">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="script_userprofile.js"></script>

    <hr>
    
    <footer class="section__container footer__container">
        <div class="footer__col">
            <h4 class="footer__heading">CONTACT INFO</h4>
            <p><i class="ri-map-pin-line" aria-label="Address"></i> 1 Utama Shopping Centre, S210, 1 Lebuh Bandar Utama, 47800 Petaling Jaya, Selangor</p>
            <p><i class="ri-mail-send-line" aria-label="Email"></i>dopaminehelpcenter@gmail.com</p>
            <p><i class="ri-phone-line" aria-label="Phone"></i>(+60)11-2345 678</p>
            <p><i class="ri-question-line"></i><a href="faq.html">FAQ</a></li>

        </div>

        <div class="contact_container">
            <h4 class="footer__heading">CONTACT US</h4>
            <div class="contact-wrapper">
                <div class="contact-form">
                    <h4>Send us a message</h4>
                    <form class="contact_us">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="Your Name">
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" placeholder="Your Email">
                        </div>
                        <div class="form-group">
                            <textarea name="message" placeholder="Your Message"></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="footer__col">
            <h4 class="footer__heading">ABOUT US</h4>
            <a href="About_Us.html" class="footer__link">Learn more</a>
            <a href="user_review.rating.html" class="footer__link">Customer Reviews</a>
        </div>
        
        <div class="social_media">
            <h4 class="footer__heading">SOCIAL MEDIA LINK</h4>
            <div class="social_cont">
                <div class="social_button">
                    <div class="social_icon">
                     <a href="https://www.instagram.com/DoPaMineFashion/"><i class="ri-instagram-line"></i></a>
                    </div>
                    <a href="https://www.instagram.com/DoPaMineFashion/"><span>Instagram</span></a>
                 </div>
                <div class="social_button">
                   <div class="social_icon">
                    <a href="https://x.com/dopamine?lang=en"><i class="ri-twitter-x-line"></i></a>
                   </div>
                   <a href="https://x.com/dopamine?lang=en"><span>Twitter</span></a>
                </div>
                <div class="social_button">
                    <div class="social_icon">
                     <a href="https://www.facebook.com/DoPaMineFashion/"><i class="ri-facebook-box-fill"></i></a>
                    </div>
                    <a href="https://www.facebook.com/DoPaMineFashion/"><span>Facebook</span></a>
                </div>
                <div class="social_button">
                   <div class="social_icon">
                    <a href="https://www.youtube.com/@Dharansantho"><i class="ri-youtube-fill"></i></a>
                   </div>
                   <a href="https://www.youtube.com/@Dharansantho"><span>YouTube</span></a>
                </div>
             </div>
        </div>

    </footer>
</body>
</html>
