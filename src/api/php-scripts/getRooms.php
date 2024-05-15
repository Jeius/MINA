<?php
include "db.php";
$db = pg_connect($connection);

if (!$db) {
    die("Error: Unable to connect to the database.");
}

$query = "SELECT r.name AS room_name, 
r.floor, 
f.name AS facility_name, 
COALESCE(c.name, null) AS category,
r.x_coord, 
r.y_coord 
FROM rooms r
JOIN facilities f ON f.id = r.building_id
LEFT JOIN categories c ON c.id = r.category_id";

$result = pg_query($db, $query);

if (!$result) {
    die("Error in SQL query: " . pg_last_error($db));
}

$rooms = array();

while ($row = pg_fetch_assoc($result)) {
    // Assign names for the values in the $rooms array
    $room = array(
        'room_name' => $row['room_name'],
        'floor' => $row['floor'],
        'facility_name' => $row['facility_name'],
        'category' => $row['category'],
        'x' => $row['x_coord'],
        'y' => $row['y_coord']
    );
    $rooms[] = $room;
}

// Free result set
pg_free_result($result);

// Close the connection
pg_close($db);

// Convert the rooms array to JSON format
$json_data= json_encode($rooms);

// Output the JSON data
echo $json_data;
?>
