<?php
include "db.php";
$db = pg_connect($connection);


if (!$db) {
    die("Error: Unable to connect to the database.");
}

$query = "SELECT f.name as name, f.node_id as node_id, c.name as category
            FROM facilities f
            LEFT JOIN public.categories c ON c.id = f.category_id";

$result = pg_query($db, $query);

if (!$result) {
    die("Error in SQL query: " . pg_last_error($db));
}

$facilities = array();

while ($row = pg_fetch_assoc($result)) {
    // Assign names for the values in the $facilities array
    $facility = array(
        'name' => $row['name'],
        'node_id' => $row['node_id'],
        'category' => $row['category']
    );
    $facilities[] = $facility;
}

// Free result set
pg_free_result($result);

// Close the connection
pg_close($db);

// Convert the facilities array to JSON format
$json_data= json_encode($facilities);

// Output the JSON data
echo $json_data;
?>
