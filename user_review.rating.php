<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bit102assignment";

// Database connection
$connect = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$connect -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = array();
$data['error'] = false;
$data['message'] = array();
date_default_timezone_set('Asia/Kuala_Lumpur');

$sql = "CREATE TABLE IF NOT EXISTS reviews_db (
    review_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_Name varchar(200) NOT NULL,
    user_Rating int(1) NOT NULL,
    user_Review text NOT NULL,
    date_Time int(11) NOT NULL
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

try{
    $connect -> exec($sql);
} catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
    }


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST["rating_data"])) {
        // Handle new review submission
        $user_name = $_POST["user_name"];
        $rating_data = $_POST["rating_data"];
        $user_review = $_POST["user_review"];
        $date_time = time();

        if (!isset($_POST['user_name']) || empty($_POST['user_name'])) {
            $data['error'] = true;
            $data['message'][] = 'You have to key in a name!';
        }

        if (!isset($_POST['user_review']) || empty($_POST['user_review'])) {
            $data['error'] = true;
            $data['message'][] = 'You have to key some reviews!';
        }

        if (!$data['error']) {
            $query = "
            INSERT INTO reviews_db 
            (user_Name, user_Rating, user_Review, date_Time) 
            VALUES (:user_Name, :user_Rating, :user_Review, :date_Time)
            ";

            $statement = $connect->prepare($query);

            $statement->bindParam(":user_Name", $user_name);
            $statement->bindParam(":user_Rating", $rating_data);
            $statement->bindParam(":user_Review", $user_review);
            $statement->bindParam(":date_Time", $date_time);

            if ($statement->execute()) {
                $data['message'] = "Your Review & Rating Successfully Submitted";
            } else {
                $data['error'] = true;
                $data['message'][] = "Error: Failed to submit review and rating";
            }
        }

    } elseif (isset($_POST["action"])) {
        // Handle fetching all reviews
        $average_rating = 0;
        $total_review = 0;
        $five_star_review = 0;
        $four_star_review = 0;
        $three_star_review = 0;
        $two_star_review = 0;
        $one_star_review = 0;
        $total_user_rating = 0;
        $review_content = array();

        $query = "
        SELECT * FROM reviews_db 
        ORDER BY review_id DESC
        ";

        $result = $connect->query($query);

        foreach ($result as $row) {
            $review_content[] = array(
                'user_Name'    => $row["user_Name"],
                'user_Review'  => $row["user_Review"],
                'rating'       => $row["user_Rating"],
                'date_Time'    => date('d/M/Y H:i:s', $row["date_Time"])
            );

            switch ($row["user_Rating"]) {
                case '5':
                    $five_star_review++;
                    break;
                case '4':
                    $four_star_review++;
                    break;
                case '3':
                    $three_star_review++;
                    break;
                case '2':
                    $two_star_review++;
                    break;
                case '1':
                    $one_star_review++;
                    break;
            }

            $total_review++;
            $total_user_rating += $row["user_Rating"];
        }

        if ($total_review > 0) {
            $average_rating = $total_user_rating / $total_review;
        }

        $data = array(
            'average_rating'    => number_format($average_rating, 1),
            'total_review'      => $total_review,
            'five_star_review'  => $five_star_review,
            'four_star_review'  => $four_star_review,
            'three_star_review' => $three_star_review,
            'two_star_review'   => $two_star_review,
            'one_star_review'   => $one_star_review,
            'review_data'       => $review_content
        );
    } else {
        $data['error'] = true;
        $data['message'][] = "Invalid request";
    }

    header('Content-Type: application/json');
    echo json_encode($data);
}

$connect = null;
?>
