<?php
include "db.php";
$db = pg_connect($connection);

if (!$db) {
    die("Error: Unable to connect to the database.");
}

$query = "SELECT c.name as category, e.start_id, e.end_id
            FROM public.edges e
            LEFT JOIN public.categories c ON c.id = e.category_id";

$result = pg_query($db, $query);

if (!$result) {
    die("Error in SQL query: " . pg_last_error($db));
}

$edges = array();

while ($row = pg_fetch_assoc($result)) {

    // Assign names for the values in the $edges array
    $edge = array(
        'category' => $row['category'],
        'nodeA' => $row['start_id'],
        'nodeB' => $row['end_id']
    );
    $edges[] = $edge;
    
}


// Free result set
pg_free_result($result);

// Close the connection
pg_close($db);

// Convert the edges array to JSON format
$json_data= json_encode($edges);

// Output the JSON data
echo $json_data;
?>