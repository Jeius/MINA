<?php
header('Access-Control-Allow-Origin: *');   
header("Access-Control-Allow-Credentials: true");  
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS'); 
header('Access-Control-Max-Age: 1000');  
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

$host = "aws-0-ap-southeast-1.pooler.supabase.com";
$dbusername = "postgres.xzlqrntqpaqfxnhhaqsz";
$dbpassword = "6SGuNKUudjHVnP94";
$dbname = "micang_new_schema";
$port = 5432;

$connection = "host={$host} port={$port} dbname={$dbname} user={$dbusername} password={$dbpassword}";
?>
