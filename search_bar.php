<?php
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

// Function to insert clothing data
function insertClothingData($conn) {
    $clothing_data = [
        ['Colorful Button Shirt', 59.00],
        ['Blue "Actual" Jacket', 79.00],
        ['Chess Pattern Shirt', 49.90],
        ['Light Blue Pants', 59.00],
        ['Floral Green Dress', 39.00],
        ['Blue Angle Dress', 39.00],
        ['Gradient Green Shirt', 99.00],
        ['KEIKO Long-sleeved Shirt', 79.00],
        ['Graffiti Button Shirt', 59.90],
        ['Gray Hoodie', 129.90],
        ['Colorful Bear Bear', 59.90],
        ['Cute Fairy Dress', 79.90],
        ['SunFlower Dress', 69.00],
        ['Open Front Outerwear & Crew Neck Tank Dress', 95.00],
        ['Black Elegent Dress', 80.00]
    ];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO product_listing (product_name, price) VALUES (?, ?)");
    $stmt->bind_param("sd", $name, $price);

    // Loop through the data and execute the prepared statement
    foreach ($clothing_data as $item) {
        $name = $item[0];
        $price = $item[1];
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
