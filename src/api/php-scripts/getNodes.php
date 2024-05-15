<?php
include "db.php";
$db = pg_connect($connection);

if (!$db) {
    die("Error: Unable to connect to the database.");
}

$query = "SELECT id, x_coord, y_coord
            FROM public.nodes";

$result = pg_query($db, $query);

if (!$result) {
    die("Error in SQL query: " . pg_last_error($db));
}

$nodes = array();

while ($row = pg_fetch_assoc($result)) {
    // Assign names for the values in the $nodes array
    $node = array(
        'id' => $row['id'],
        'x' => $row['x_coord'],
        'y' => $row['y_coord']
    );
    $nodes[] = $node;
}


// Free result set
pg_free_result($result);

// Close the connection
pg_close($db);

// Convert the nodes array to JSON format
$json_data= json_encode($nodes);

// Output the JSON data
echo $json_data;

?>