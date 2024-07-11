<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bit102assignment"; // Ensure this database exists or create it

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to insert clothing data
function insertClothingData($conn) {
    $clothing_data = [
        ['pic.store/color-shirt.jpg', 'Colorful Button Shirt', 59.00],
        ['pic.store/Jacket.avif', 'Blue "Actual" Jacket', 79.00],
        ['pic.store/cartoon.jpeg', 'Chess Pattern Shirt', 49.90],
        ['pic.store/pants.jpg', 'Light Blue Pants', 59.00],
        ['pic.store/kids.webp', 'Floral Green Dress', 39.00],
        ['pic.store/Cartoon dress.webp', 'Blue Angle Dress', 39.00],
        ['pic.store/child.webp', 'Gradient Green Shirt', 99.00],
        ['pic.store/keiko-tshirt.webp', 'KEIKO Long-sleeved Shirt', 79.00],
        ['pic.store/nice.jpeg', 'Graffiti Button Shirt', 59.90],
        ['pic.store/tracksuit.avif', 'Gray Hoodie', 129.90],
        ['pic.store/color-bear.webp', 'Colorful Bear Bear', 59.90],
        ['pic.store/green.avif', 'Cute Fairy Dress', 79.90],
        ['pic.store/elder.webp', 'SunFlower Dress', 69.00],
        ['pic.store/older people.webp', 'Open Front Outerwear & Crew Neck Tank Dress', 95.00],
        ['pic.store/elder1.webp', 'Black Elegent Dress', 80.00]
    ];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO product_listing (img, product_name, price) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $img, $name, $price);

    // Loop through the data and execute the prepared statement
    foreach ($clothing_data as $item) {
        $img = $item[0];
        $name = $item[1];
        $price = $item[2];
        $stmt->execute();
    }

    // Close statement
    $stmt->close();
}

// Call the function to insert clothing data
insertClothingData($conn);

// Handle live search functionality
if (isset($_POST['search'])) {
    // Search box value assigning to $name variable.
    $name = $_POST['search'];
    // Search query.
    $query = "SELECT product_name FROM product_listing WHERE product_name LIKE '%$name%' LIMIT 5";
    // Query execution
    $execQuery = $conn->query($query);
    
    // Creating unordered list to display result.
    echo '<ul>';
    // Fetching result from database.
    while ($result = $execQuery->fetch_assoc()) {
        ?>
        <!-- Creating unordered list items.
             Calling JavaScript function named "fill" found in "search_bar.js" file.
             By passing fetched result as parameter. -->
        <li onclick='fill("<?php echo $result['product_name']; ?>")'>
            <a>
                <!-- Assigning searched result in "Search box" -->
                <?php echo $result['product_name']; ?>
            </a>
        </li>
        <?php
    }
    echo '</ul>';
}

// Close connection
$conn->close();
?>
